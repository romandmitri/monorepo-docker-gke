import { getMimeTypeExtension, MimeType2 } from "@/src/common/utility/mime/MimeType.ts";
import { FileReference } from "@/src/modules/file/type/FileReference.ts";
import { FileSchema } from "@/src/modules/file/type/FileSchema.ts";
import prettyBytes from "pretty-bytes";
import { z, ZodNumber, ZodString, ZodUnion } from "zod";

export class ZodSchemer {
	static areaCode = () => {
		return z.union([
			//
			z.string().optional(),
			z.string().length(3),
		]);
	};

	static file = (p: FileSchema): ZodUnion => {
		const sizeMax = p.sizeMax;
		const mimeTypes = p.mimeTypes;

		let fileSchema = z.instanceof(File).refine((file) => Boolean(file), "Required.");

		if (sizeMax) {
			fileSchema = fileSchema.refine((file) => file.size <= sizeMax, `Max size is ${prettyBytes(sizeMax)}.`);
		}

		if (mimeTypes && mimeTypes.length >= 0) {
			const types = mimeTypes.map((mt) => getMimeTypeExtension(mt)).filter(Boolean);
			fileSchema = fileSchema.refine((file) => mimeTypes.includes(file.type as MimeType2), `Only ${types.join(", ")} types are supported.`);
		}

		const fileReferenceSchema = z.instanceof(FileReference);

		return z.union([
			//
			fileReferenceSchema,
			fileSchema,
		]);
	};

	static number = (p: { min?: number; max?: number }): ZodNumber => {
		let schema = z.number();
		if (p.min !== undefined) schema = schema.min(p.min);
		if (p.max !== undefined) schema = schema.max(p.max);
		return schema;
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
		// TODO: reidenzon - Do something UUID-specific?!
		return ZodSchemer.string();
	};
}
