import mime from "mime";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types

// Avoid collision with build-in "MimeType" type (which is deprecated).

export enum MimeType2 {
	ApplicationJson = "application/json",
	TextCsv = "text/csv",
	TextMarkdown = "text/markdown",
	TextPlain = "text/plain",
}

export const getMimeTypeExtension = (m: MimeType2): string | undefined => {
	return mime.getExtension(m) ?? undefined;
};
