import { googleAuth } from "@/src/common/adapters/google/auth/client.js";
import { google } from "googleapis";

export const googleSheets = () => google.sheets({ auth: googleAuth, version: "v4" });
