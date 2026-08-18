import { useMicrophone } from "@/src/common/components/mic/MicrophoneContext.ts";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
import { RootBox } from "@/src/modules/root/components/RootBox.tsx";
import { LucideMic, LucideMicOff } from "lucide-react";
import { Fragment } from "react";

interface Props {}

export const MicrophoneIndicator = (p: Props) => {
	const microphone = useMicrophone();
	const isGranted = microphone.IsGranted;
	return (
		<RootBox>
			<Button
				//
				onClick={() => microphone.Request()}
				size={"icon"}
				tooltip={{
					children: (
						<Fragment>
							{isGranted && withHtml(`Mic is granted.`)}
							{!isGranted && withHtml(`Mic is <b>not</b> granted. Click to request permissions.`)}
						</Fragment>
					),
				}}
				variant={"ghost"}
			>
				{isGranted && <LucideMic className={"text-positive"} />}
				{!isGranted && <LucideMicOff className={"text-destructive"} />}
			</Button>
		</RootBox>
	);
};
