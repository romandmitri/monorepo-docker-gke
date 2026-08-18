import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { MimeType2 } from "@/src/common/utility/mime/MimeType.ts";
import { LucideFile } from "lucide-react";

interface Props {
	mimeType?: MimeType2;
}

export const MimeTypeIcon = (p: Props) => {
	// TODO: reidenzon - Roll this!
	// const mimeTypeInfo = getMimeTypeInfo(mimeType);
	// const mimeIcon = mimeTypeInfo.icon;
	const mimeIcon = undefined;

	return <Badge variant={"blank"}>{mimeIcon ?? <LucideFile />}</Badge>;
};
