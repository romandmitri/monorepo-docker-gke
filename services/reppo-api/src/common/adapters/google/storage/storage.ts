import { Config } from "@/src/common/config/Config.js";
import { Storage } from "@google-cloud/storage";

export const googleStorage = () =>
	new Storage({
		keyFilename: Config.GoogleCredentialsFile,
	});

export const googleStoragePrivate = () => googleStorage().bucket(Config.Google_StoragePrivate);
export const googleStoragePublic = () => googleStorage().bucket(Config.Google_StoragePublic);
