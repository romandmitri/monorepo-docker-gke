import { TimeString } from "@/src/common/utility/time/TimeString.js";

export const dateClone = <D extends Date | undefined>(d: D): Date | D => {
	if (!d) return undefined as D;
	return new Date(d);
};

export const dateFromTimeString = (time: TimeString | undefined): Date | undefined => {
	if (!time) return;
	return new Date(time);
};

export const isDateEqual = (d1: Date | undefined | null, d2: Date | undefined | null): boolean => {
	try {
		if (!d1 && !d2) return true;
		if (!d1 || !d2) return false;
		return d1.getTime() == d2.getTime();
	} catch (err) {
		// TODO: reidenzon - Figure out d1/d2 type that is causing errors here!
		console.error("isDateEqual.ERROR", d1, d2, err);
		return false;
	}
};
