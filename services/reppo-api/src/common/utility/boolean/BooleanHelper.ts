export class BooleanHelper {
	static parse = <Default extends boolean | undefined>(v: any, def: Default): boolean | Default => {
		if ([true, "true"].includes(v)) {
			return true;
		}
		if ([false, "false", 0].includes(v)) {
			return false;
		}
		return def;
	};
}
