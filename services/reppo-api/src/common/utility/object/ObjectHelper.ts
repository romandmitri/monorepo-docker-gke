export class ObjectHelper {
	static isEmpty = (obj: Object | undefined): boolean => {
		if (!obj) return true;
		return Object.values(obj).filter((v) => v !== undefined).length === 0;
	};

	static isNotEmpty = (obj: Object | undefined): boolean => {
		return !ObjectHelper.isEmpty(obj);
	};
}
