import packageJson from "@/package.json" with {type: "json"};
import {PostmarkServerToken} from "@/src/common/adapters/postmark/type/PostmarkServerToken.js";
import {LoggerFormat} from "@/src/common/config/Logger.js";
import {BooleanHelper} from "@/src/common/utility/boolean/BooleanHelper.js";
import {HttpHostname} from "@/src/common/utility/http/HttpHostname.js";
import {StringValue} from "ms";
import {LevelWithSilentOrString} from "pino";

const initBoolean = (key: string, defaultValue: boolean): boolean => {
	return BooleanHelper.parse(initString(key, ""), defaultValue);
};

const initString = (key: string, defaultValue: string): string => {
	// @ts-ignore
	const v = (process.env[key] ?? "").trim();
	if (v == "") return defaultValue;
	if (v == "initial") return defaultValue;
	return v;
};

// See terraform/modules/_/secrets/secrets.tf for examples!
export const Config = {
	Database_Analyze: initBoolean("REPPO_API_DATABASE_ANALYZE", false),
	Database_Url: initString("REPPO_API_DATABASE_URL", ""),
	DeveloperAccess: initBoolean("REPPO_API_DEVELOPER_ACCESS", false),
	GoogleChatAgentUpdates: initString("REPPO_API_GOOGLE_CHAT_AGENT_UPDATES", ""),
	GoogleCredentialsFile: "/src/.env.REPPO_API_GOOGLE_CREDENTIALS.json",
	Google_BigQuery_DatasetId: "dataset",
	Google_StoragePrivate: initString("REPPO_API_GOOGLE_STORAGE_PRIVATE", ""),
	Google_StoragePublic: initString("REPPO_API_GOOGLE_STORAGE_PUBLIC", "cheese-reppo-common-01-public"),
	Hostname: initString("HOSTNAME", "") as HttpHostname,
	JwtDuration: initString("REPPO_API_JWT_DURATION", "10m") as StringValue,
	JwtSecret: initString("REPPO_API_JWT_SECRET", "secret"),
	Logger_Format: initString("REPPO_API_LOGGER_FORMAT", "") as LoggerFormat,
	Logger_Level: initString("REPPO_API_LOGGER_LEVEL", "") as LevelWithSilentOrString,
	Ngrok_AuthToken: initString("REPPO_API_NGROK_AUTH_TOKEN", ""),
	Ngrok_Domain: initString("REPPO_API_NGROK_DOMAIN", ""),
	Nickname: initString("REPPO_API_NICKNAME", ""),
	PathRoot: "/src",
	PostHog_ApiKey: initString("REPPO_API_POSTHOG_API_KEY", ""),
	Postmark_ServerToken: initString("REPPO_API_POSTMARK_SERVER_TOKEN", "") as PostmarkServerToken,
	Short_Domain: initString("REPPO_API_SHORT_DOMAIN", ""),
	Short_Key: initString("REPPO_API_SHORT_KEY", ""),
	Stripe_ApiVersion: "2025-08-27.basil" as const,
	Stripe_SecretKey: initString("REPPO_API_STRIPE_SECRET_KEY", ""),
	Stripe_WebhookSecret: initString("REPPO_API_STRIPE_WEBHOOK_SECRET", ""),
	Twilio_AccountSid: initString("REPPO_API_TWILIO_ACCOUNT_SID", ""),
	Twilio_AuthToken: initString("REPPO_API_TWILIO_AUTH_TOKEN", ""),
	Twilio_FromNumber: initString("REPPO_API_TWILIO_FROM_NUMBER", ""),
	UrlBase: initString("REPPO_API_URL_BASE", ""),
	Vercel_AiGateway_Key: initString("REPPO_API_VERCEL_AI_GATEWAY_KEY", ""),
	Version: initString("REPPO_API_VERSION", packageJson.version),
	WorkOS_ApiKey: initString("REPPO_API_WORKOS_API_KEY", ""),
	WorkOS_ClientId: initString("REPPO_API_WORKOS_CLIENT_ID", ""),
	WorkOS_CookiePassword: initString("REPPO_API_WORKOS_COOKIE_PASSWORD", ""),
};

// https://drive.google.com/drive/folders/1KPwk458tX_thLLlwYUGRTBYM4lWbjxUu
export enum GoogleSheetId {
	Agents = "1EscYDiMWkEQK7XxAZ3J7OIgG3hzZfA_19SX7lBHY2t8", // v0.21.0
	AgentVersions = "1FFTn2DbsdFkH-fwE_x3Sw2Oc9J7nBUf9tPU5PUGN2L0", // v0.21.0
	Groups = "1QmZQFjbaBkrhkPz5XhsgH7Grv9TwUJzp9L31XkpvEE0", // v0.7.0
	PhoneNumbers = "1Do91p666oRGcg48ozRQLxtlZPTJhd7IPw6BOrVjaX5w", // v0.7.0
	SimulationSpecs = "1BKbnWApNvDVdr8DS0wCj257IJveYle9SUSeGOP0C1gw", // v0.21.0
	Users = "1NUhLFNvgOWIfY2SBob8GQD7LYK-VtNKurYo49dWkt5k", // v0.5.0
}
