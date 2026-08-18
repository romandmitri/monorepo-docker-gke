import { Config } from "@/src/common/config/Config.js";
import { google } from "googleapis";

export const googleAuth = new google.auth.GoogleAuth({
	keyFile: Config.GoogleCredentialsFile,
	scopes: [
		//
		// "https://www.googleapis.com/auth/devstorage.full_control",
		"https://www.googleapis.com/auth/spreadsheets.readonly",
	],
});
