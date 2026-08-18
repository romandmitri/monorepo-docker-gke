export enum WeekDay {
	Monday = "monday",
	Tuesday = "tuesday",
	Wednesday = "wednesday",
	Thursday = "thursday",
	Friday = "friday",
	Saturday = "saturday",
	Sunday = "sunday",
}

export type WeekDayIndex = number; // 0-6

export type WeekDayInfo<Day extends WeekDay> = {
	day: Day;
	index: WeekDayIndex;
};

const infoMapByDay = new Map<WeekDay, WeekDayInfo<any>>();
const infoMapByIndex = new Map<WeekDayIndex, WeekDayInfo<any>>();

const register = (info: WeekDayInfo<any>) => {
	infoMapByDay.set(info.day, info);
	infoMapByIndex.set(info.index, info);
};

register({ index: 1, day: WeekDay.Monday });
register({ index: 2, day: WeekDay.Tuesday });
register({ index: 3, day: WeekDay.Wednesday });
register({ index: 4, day: WeekDay.Thursday });
register({ index: 5, day: WeekDay.Friday });
register({ index: 6, day: WeekDay.Saturday });
register({ index: 0, day: WeekDay.Sunday });

export const getWeekDayInfo = <Day extends WeekDay>(day: Day): WeekDayInfo<Day> => {
	return infoMapByDay.get(day)!;
};

export const getWeekDayInfoByIndex = (index: WeekDayIndex): WeekDayInfo<any> => {
	return infoMapByIndex.get(index)!;
};

export const getWeekDayInfos = (): WeekDayInfo<WeekDay>[] => {
	return [...infoMapByDay.values()];
};
