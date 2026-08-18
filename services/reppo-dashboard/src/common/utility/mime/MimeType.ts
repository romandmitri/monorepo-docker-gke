import mime from "mime";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types

// Avoid collision with build-in "MimeType" type (which is deprecated).
export enum MimeType2 {
	ApplicationJson = "application/json",
	ApplicationPdf = "application/pdf",
	TextCsv = "text/csv",
	TextPlain = "text/plain",
}

export const getMimeTypeExtension = (m?: MimeType2): string | undefined => {
	if (!m) return;
	return mime.getExtension(m) ?? undefined;
};
