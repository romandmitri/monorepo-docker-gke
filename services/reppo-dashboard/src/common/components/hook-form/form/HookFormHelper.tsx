import { FieldValues, Path, PathValue, SetValueConfig, UseFormReturn } from "react-hook-form";

export class HookFormHelper {
	static setValueConfig: SetValueConfig = {
		shouldDirty: true,
		shouldTouch: true,
		shouldValidate: true,
	};

	static setValueNested = <V extends FieldValues>(p: {
		//
		methods: UseFormReturn<V>;
		path: Path<V>;
		value: PathValue<V, Path<V>>;
		config: SetValueConfig;
	}) => {
		// console.log("HookFormHelper.setValueNested", { path: p.path, value: p.value });

		if (HookFormHelper.isValue(p.value)) {
			// console.log("HookFormHelper.setValueNested.setValue", { path: p.path, value: p.value });
			p.methods.setValue(p.path, p.value, p.config);
			return;
		}

		for (const [key, value] of Object.entries(p.value)) {
			// console.log("HookFormHelper.setValueNested.for", { key, value });
			HookFormHelper.setValueNested<V>({
				methods: p.methods,
				path: `${p.path}.${key}` as Path<V>,
				value: value as PathValue<V, Path<V>>,
				config: p.config,
			});
		}
	};

	// TODO: reidenzon - Rename to [isPrimitive] and just check [typeof value == "string" | "number"] instead?!
	protected static isValue = (value: unknown): boolean => {
		const isNested = typeof value == "object" && value !== null && value !== undefined && !Array.isArray(value);
		return !isNested;
	};
}

export const setValueConfig = HookFormHelper.setValueConfig;
