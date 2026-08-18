export class BooleanHelper {
	static parse = (v: any, def: boolean): boolean => {
		if ([true, "true"].includes(v)) {
			return true;
		}
		if ([false, "false", 0].includes(v)) {
			return false;
		}
		return def;
	};
}
