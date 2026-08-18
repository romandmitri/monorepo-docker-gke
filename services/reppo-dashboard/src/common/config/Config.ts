import {BooleanHelper} from "@/src/common/utility/boolean/BooleanHelper.ts";
import {GitHubSha} from "@/src/common/utility/github/GitHubSha.ts";

const initBoolean = (key: string, defaultValue: boolean): boolean => {
	return BooleanHelper.parse(initString(key, ""), defaultValue);
};

const initString = (key: String, defaultValue: string): string => {
	// @ts-ignore
	const v = (import.meta.env[key] ?? window["_envs"]?.[key] ?? "").trim();
	if (v == "") return defaultValue;
	return v;
};

export const Config = {
	DebugIsLog: initBoolean("REPPO_DASHBOARD_DEVELOPER_ACCESS", false),
	DeveloperAccess: initBoolean("REPPO_DASHBOARD_DEVELOPER_ACCESS", false),
	GitHubSha: initString("GITHUB_SHA", "") as GitHubSha,
	PostHogKey: initString("REPPO_DASHBOARD_POSTHOG_KEY", ""),
	StripePublishableKey: initString("REPPO_DASHBOARD_STRIPE_PUBLISHABLE_KEY", ""),
	Title: "Reppo", // "Dashboard"
	UrlBase: initString("REPPO_DASHBOARD_URL_BASE", ""),
	Version: import.meta.env.PACKAGE_VERSION,
	WorkOSClientId: initString("REPPO_DASHBOARD_WORKOS_CLIENT_ID", ""),
};
