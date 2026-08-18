import { googleStoragePrivate } from "@/src/common/adapters/google/storage/storage.js";
import { ObjectName, ObjectNameGenerator } from "@/src/common/adapters/google/storage/type/ObjectName.js";
import { ObjectUrlSigned } from "@/src/common/adapters/google/storage/type/ObjectUrl.js";
import { MimeType2 } from "@/src/common/utility/mime/MimeType2.js";
import { TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.js";
import { Context } from "@/src/entry/_/Context.js";
import { FileMetadata, SaveData } from "@google-cloud/storage";

export class GoogleStorage {
	static downloadAsString = async (ctx: Context, objectName: ObjectName): Promise<string> => {
		ctx.log.debug({ msg: "GoogleStorage.downloadAsString", objectName });
		const file = googleStoragePrivate().file(objectName);
		const [buffer] = await file.download();
		return buffer.toString();
	};

	static getMetadata = async (ctx: Context, objectName: ObjectName): Promise<FileMetadata> => {
		ctx.log.debug({ msg: "GoogleStorage.getMetadata", objectName });
		const file = googleStoragePrivate().file(objectName);
		const [metadata] = await file.getMetadata();
		return metadata;
	};

	static getSignedUrlRead = async (ctx: Context, objectName: ObjectName): Promise<ObjectUrlSigned> => {
		ctx.log.debug({ msg: "GoogleStorage.getSignedUrlRead", objectName });
		const file = googleStoragePrivate().file(objectName);
		const [url] = await file.getSignedUrl({
			action: "read",
			expires: Date.now() + TimeMillisecond.Hour * 24,
			version: "v4",
		});
		return url;
	};

	static getSignedUrlWrite = async (ctx: Context, mimeType: MimeType2): Promise<[ObjectName, ObjectUrlSigned]> => {
		const objectName = ObjectNameGenerator.forMisc(ctx, mimeType);
		ctx.log.debug({ msg: "GoogleStorage.getSignedUrlWrite", mimeType, objectName });
		const file = googleStoragePrivate().file(objectName);
		const [url] = await file.getSignedUrl({
			action: "write",
			contentType: mimeType,
			expires: Date.now() + TimeMillisecond.Minute * 5,
			version: "v4",
		});
		ctx.log.debug({ msg: "GoogleStorage.getSignedUrlWrite.url", url });
		return [objectName, url];
	};

	static upload = async (ctx: Context, mimeType: MimeType2, data: SaveData): Promise<[ObjectName, ObjectUrlSigned]> => {
		const objectName = ObjectNameGenerator.forMisc(ctx, mimeType);
		ctx.log.debug({ msg: "GoogleStorage.upload", mimeType, objectName });
		const file = googleStoragePrivate().file(objectName);
		await file.save(data);
		const url = await GoogleStorage.getSignedUrlRead(ctx, objectName);
		return [objectName, url];
	};
}
