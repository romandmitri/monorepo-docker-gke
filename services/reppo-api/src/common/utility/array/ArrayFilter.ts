export class ArrayFilter {
	static isAny = <Type>(array: Type[] | undefined, values: Array<Type | undefined>): boolean => {
		if (!array || array.length === 0) return true;
		return values.filter((v) => v !== undefined).some((v) => array.includes(v));
	};
}
