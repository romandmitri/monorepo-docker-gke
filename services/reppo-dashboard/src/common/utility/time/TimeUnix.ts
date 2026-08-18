export type TimeUnix = EpochTimeStamp;

export const useTimeUnixAsLocaleDate = (time?: TimeUnix): string | undefined => {
	if (!time) return;
	// const tc = useContext(TranslationContext);
	const language = "en-CA";
	const d = new Date(time * 1000);
	return d.toLocaleDateString(language, {
		month: "short", // "2-digit",
		day: "numeric", // "2-digit",
	});
};

export const useTimeUnixAsLocaleDateTime = (time?: TimeUnix): string | undefined => {
	if (!time) return;
	return useTimeUnixAsLocaleDate(time) + ", " + useTimeUnixAsLocaleTime(time);
};

export const useTimeUnixAsLocaleTime = (time?: TimeUnix): string | undefined => {
	if (!time) return;
	// const tc = useContext(TranslationContext);
	const language = "en-CA";
	const d = new Date(time * 1000);
	return d.toLocaleTimeString(language, {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		// timeZoneName: "short",
	});
};
