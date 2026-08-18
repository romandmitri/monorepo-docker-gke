import {KubernetesPhase} from "@/src/common/adapters/kubernetes/KubernetesPhase.js";
import {Config} from "@/src/common/config/Config.js";
import {HttpHostname} from "@/src/common/utility/http/HttpHostname.js";
import {HttpIp} from "@/src/common/utility/http/HttpIp.js";
import {Context} from "@/src/entry/_/Context.js";
import {CoreV1Api, KubeConfig} from "@kubernetes/client-node";

const config = new KubeConfig()
config.loadFromCluster();

export type KubernetesPod = {
	ip: HttpIp;
	hostname: HttpHostname;
	status: KubernetesPhase;
}

export const getKubernetesPods = async (ctx: Context): Promise<KubernetesPod[]> => {
	if (Config.Nickname.includes("local")) return [];
	try {
		const kubernetes = config.makeApiClient(CoreV1Api);
		const response = await kubernetes.listNamespacedPod({
			namespace: "default",
			labelSelector: "app=reppo-api",
			fieldSelector: "status.phase=Running" // works?!
		});
		// REMINDER: For DEBUG only because response is massive.
		// ctx.log.debug({ msg: "getKubernetesPods.response", response });
		// ctx.log.debug({ msg: "getKubernetesPods.items", items: response.items });
		const pods = response.items.map<KubernetesPod>((pod) => {
			const meta = pod.metadata!;
			const status = pod.status!;
			return {
				ip: status.podIP as HttpIp,
				hostname: meta.name as HttpHostname,
				status: status.phase as KubernetesPhase,
			}
		});
		ctx.log.debug({msg: "getKubernetesPods.pods", pods});
		return pods;
	} catch (err) {
		ctx.log.error({msg: "getKubernetesPods.error", err});
		return [];
	}
}
