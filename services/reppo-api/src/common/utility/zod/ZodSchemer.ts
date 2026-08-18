import { z, ZodNumber, ZodString } from "zod";

export class ZodSchemer {
	static number = (p: { min?: number; max?: number }): ZodNumber => {
		let schema = z.number();
		if (p.min !== undefined) schema = schema.min(p.min);
		if (p.max !== undefined) schema = schema.max(p.max);
		return schema;
	};

	static phoneNumber = (): ZodString => {
		// REMINDER: Do NOT uze z.e164() because OpenAI doesn't support it... yet :(
		// return z.e164();
		return z.string().regex(/^\+[1-9]\d{6,14}$/);
	};

	static string = (p?: { min?: number; max?: number }): ZodString => {
		const min = p?.min ?? 1;
		const max = p?.max;

		let schema = z.string();

		if (min !== undefined) {
			if (min == 1) schema = schema.min(min, "Required.");
			if (min >= 2) schema = schema.min(min, `Must be ${min} or more characters.`);
		}
		if (max !== undefined) {
			schema = schema.max(max, `Must be ${max} or less characters.`);
		}

		return schema;
	};

	static uuid = (): ZodString => {
		// TODO: reidenzon - Get this to work, but AI is struggling to create correct pattern.
		// return z.uuidv7();
		return z.string();
	};
}
