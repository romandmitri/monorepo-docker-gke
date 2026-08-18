import { Hostname } from "@/src/common/utility/http/Hostname.ts";
import { UuidIndicator } from "@/src/common/utility/uuid/UuidIndicator.tsx";
import { useSocketContext } from "@/src/modules/socket/context/SocketContext.ts";
import { LucideContainer } from "lucide-react";

interface Props {
	hostname: Hostname;
}

export const HostnameIndicator = (p: Props) => {
	const s = useSocketContext();
	const isCurrent = s.hostname == p.hostname;
	return (
		<UuidIndicator
			//
			label={"Hostname"}
			icon={LucideContainer}
			id={p.hostname}
			variant={isCurrent ? "default" : "secondary"}
			left={0}
			right={9}
		/>
	);
};
