/**
 * This is a helper to track of current and previous
 * state of a any given object. The idea is to avoid
 * constants for object1, object2, object3, etc... and
 * use reference instead.
 *
 * Similar to useRef in React, but this has `.prev` helper
 * for audit deltas, etc...
 *
 * Has ability to track which reference has been written
 * to the database for simplified audit tracking.
 *
 * Example:
 *
 * const versionRef = ObjectRef.from(version);
 * versionRef.stage.details = value;
 * await AgentVersionTabler.update(ctx, jobRef.prev, jobRef.last)
 * versionRef.written();
 */

type ObjectInterface<Type> = {
	clone: () => Type;
};

type Ref<Type> = {
	isDatabase: boolean; // is written to database
	object: Type;
};

export class ObjectRef<Type extends ObjectInterface<any>> {
	private refs: Ref<Type>[] = [];

	private constructor(p: {}) {}

	get first(): Type {
		return this.refs[0].object;
	}

	get prev(): Type | undefined {
		const maxIndex = this.refs.length - 2;
		return this.refs.findLast((v, index) => index <= maxIndex && v.isDatabase)?.object;
	}

	get isWritten(): boolean {
		return this.lastRef.isDatabase;
	}

	/**
	 * Get current/latest version of the relevant object.
	 * Use this for reading values.
	 */
	get last(): Type {
		return this.lastRef.object;
	}

	/**
	 * Similar to {@link last()} getter, but ensures
	 * the latest version has NOT been written to the database.
	 * Use this for writes.
	 */
	get stage(): Type {
		if (this.lastRef.isDatabase) this.clone();
		return this.lastRef.object;
	}

	protected get lastRef(): Ref<Type> {
		return this.refs[this.refs.length - 1];
	}

	static from = <T extends ObjectInterface<any>>(object: T): ObjectRef<T> => {
		const k = new ObjectRef<T>({});
		k.push(object, true);
		return k;
	};

	push = (object: Type, isDatabase: boolean): ObjectRef<Type> => {
		this.refs.push({
			object: object,
			isDatabase: isDatabase,
		});
		return this;
	};

	written = () => {
		this.lastRef.isDatabase = true;
	};

	protected clone = (): Type => {
		const cloned = this.last.clone();
		this.push(cloned, false);
		return cloned;
	};
}
