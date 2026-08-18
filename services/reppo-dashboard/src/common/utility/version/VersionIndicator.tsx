import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { Version } from "@/src/common/utility/version/Version.ts";

interface Props {
	version: Version | undefined;
}

export const VersionIndicator = (p: Props) => {
	if (!p.version) return null;
	return <Badge variant={"outline"}>{`v${p.version}`}</Badge>;
};
