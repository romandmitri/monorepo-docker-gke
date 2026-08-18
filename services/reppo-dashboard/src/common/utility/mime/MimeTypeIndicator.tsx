import {Badge} from "@/src/common/components/shadcn/badge.tsx";
import { getMimeTypeExtension, MimeType2 } from "@/src/common/utility/mime/MimeType.ts";

interface Props {
	mimeType?: MimeType2;
}

export const MimeTypeIndicator = (p: Props) => {
	// TODO: reidenzon - Roll this!
	// const mimeTypeInfo = getMimeTypeInfo(mimeType);
	const mimeExtension = getMimeTypeExtension(p.mimeType);

	return <Badge variant={"outline"}>{mimeExtension ?? p.mimeType}</Badge>
}
