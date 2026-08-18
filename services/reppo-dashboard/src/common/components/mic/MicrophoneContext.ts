import { createContext, useContext } from "react";

export interface MicrophoneContextInterface {
	IsGranted: boolean;
	Request: () => Promise<MediaStream | undefined>;
	Status?: PermissionState;
}

export const MicrophoneContext = createContext<MicrophoneContextInterface | undefined>(undefined);

export const useMicrophone = (): MicrophoneContextInterface => {
	const ctx = useContext(MicrophoneContext);
	if (!ctx) throw new Error("useMicrophone() is NOT in <MicrophoneProvider />");
	return ctx;
};
