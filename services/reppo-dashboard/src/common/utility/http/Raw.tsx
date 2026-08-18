import DOMPurify from "dompurify";

/** @deprecated TODO: reidenzon - This will be replaced by internalization/localization package. */
export const withHtml = (dirty?: string) => {
	if (!dirty) return null;
	const clean = DOMPurify.sanitize(dirty);
	return <span dangerouslySetInnerHTML={{ __html: clean }} />;
};
