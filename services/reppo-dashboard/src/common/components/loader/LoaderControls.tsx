import { Button } from "@/src/common/components/shadcn/button.tsx";
import { ThemeIcon } from "@/src/common/style/ThemeIcon.tsx";
import { timeDelay, TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.ts";
import { Fragment, ReactNode, useEffect, useState } from "react";

interface Props {
	actions?: ReactNode;
}

export const LoaderControls = (p: Props) => {
	const [isShow, setIsShow] = useState<boolean>(false);

	useEffect(() => {
		timeDelay(TimeMillisecond.Second).then(() => setIsShow(true));
	}, []);

	if (!isShow) return null;

	return (
		<Fragment>
			{isShow && (
				<Fragment>
					<Button
						//
						onClick={async () => window.location.reload()}
						variant={"ghost"}
					>
						<ThemeIcon.Common_Refresh />
						{"Reload"}
					</Button>
					{p.actions}
				</Fragment>
			)}
		</Fragment>
	);
};
