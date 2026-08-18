type Key = string;
type KeyValue = string;
type Subject = object | string;
type Accessor<T extends Subject, KV extends KeyValue = KeyValue> = (s: T) => KV;
type Result<T extends Subject, KV extends KeyValue = KeyValue> = {
	keyValue: KV;
	subjects: Array<T | undefined>;
};

export class ListHelper {
	/**
	 * Combines multiple lists into a single list
	 * for side-by-side comparison based on accessor.
	 */
	static combine = <
		//
		T extends Subject = Subject,
		KV extends KeyValue = KeyValue,
	>(
		accessor: Accessor<T, KV>,
		...lists: (T[] | undefined)[]
	): Result<T, KV>[] => {
		const valueSet = new Set<KV>();
		for (const list of lists) {
			if (list) {
				for (const item of list) {
					valueSet.add(accessor(item));
				}
			}
		}
		const results: Result<T, KV>[] = [];
		for (const value of [...valueSet.keys()]) {
			results.push({
				keyValue: value,
				subjects: lists.map((list) => list?.find((it) => accessor(it) == value)),
			});
		}
		return results;
	};
}
