import {Config} from "@/src/common/config/Config.js";
import {WorkOS} from "@workos-inc/node";

export const workos = new WorkOS(Config.WorkOS_ApiKey, {
	clientId: Config.WorkOS_ClientId,
})
