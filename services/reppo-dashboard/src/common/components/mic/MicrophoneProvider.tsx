import { MicrophoneContext, MicrophoneContextInterface } from "@/src/common/components/mic/MicrophoneContext.ts";
import { consoleCatch } from "@/src/common/utility/log/Log";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
	children?: ReactNode;
}

export const MicrophoneProvider = (p: Props) => {
	const [status, setStatus] = useState<PermissionState>();

	const getStatus = async () => {
		try {
			// console.log("MicrophoneProvider.getStatus TRY");
			const s = await navigator.permissions.query({ name: "microphone" });
			// console.log("MicrophoneProvider.getStatus STATE", s);
			setStatus(s.state);
		} catch (err) {
			console.error("MicrophoneProvider.getStatus ERROR", err);
		}
	};

	const handleRequest = async (): Promise<MediaStream | undefined> => {
		try {
			// console.log("MicrophoneProvider.handleRequest TRY");
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
			// console.log("MicrophoneProvider.handleRequest STREAM", stream);
			await getStatus();
			return stream;
		} catch (err) {
			console.error("MicrophoneProvider.handleRequest ERROR", err);
			toast.error("Microphone");
		}
	};

	const context: MicrophoneContextInterface = {
		IsGranted: status === "granted",
		// IsGranted: status !== "denied",
		Request: handleRequest,
		Status: status,
	};

	useEffect(() => {
		getStatus().catch(consoleCatch);
	}, []);

	return <MicrophoneContext.Provider value={context}>{p.children}</MicrophoneContext.Provider>;
};
