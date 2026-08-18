export enum TimeMillisecond {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
}

export const timeDelay = async (duration: TimeMillisecond): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, duration));
};
