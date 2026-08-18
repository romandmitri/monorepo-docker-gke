export const getDateAsDate = (d: Date): string => {
	return d.toLocaleDateString(navigator.language, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
};

export const getDateAsTime = (d: Date): string => {
	return d.toLocaleTimeString(navigator.language, {
		hour: "2-digit",
		minute: "2-digit",
		// timeZoneName: "short",
	});
};
