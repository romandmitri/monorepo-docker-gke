import { ApiResponse, ApiResponseServerError } from "@/src/common/adapters/axios/type/ApiResponse.ts";
import { ApiResponseMessage, ApiResponseMessageDisplay, ApiResponseMessageStatus } from "@/src/common/adapters/axios/type/ApiResponseMessage.ts";
import { LocalStorage } from "@/src/common/adapters/local-storage/LocalStorage.ts";
import { Config } from "@/src/common/config/Config.ts";
import { getSessionTraceId, reportError } from "@/src/common/error/ErrorService.ts";
import { Email } from "@/src/common/utility/email/Email.ts";
import { Header } from "@/src/common/utility/http/Header.ts";
import { withHtml } from "@/src/common/utility/http/Raw.tsx";
import { consoleLog } from "@/src/common/utility/log/Log.ts";
import { MimeType2 } from "@/src/common/utility/mime/MimeType.ts";
import { getQueryString } from "@/src/common/utility/param/Param.tsx";
import { AgentVersionId } from "@/src/modules/agent-version/type/AgentVersionId.ts";
import { AgentId } from "@/src/modules/agent/type/AgentId.ts";
import { BrainEventId } from "@/src/modules/brain/type/event/BrainEventId.ts";
import { CronName } from "@/src/modules/cron/type/CronName.ts";
import { DemoId } from "@/src/modules/demo/type/DemoId.ts";
import { GroupId } from "@/src/modules/group/type/GroupId.ts";
import { GroupSlug } from "@/src/modules/group/type/GroupSlug.ts";
import { JobId } from "@/src/modules/job/type/JobId.ts";
import { PhoneNumberRouteId } from "@/src/modules/phone-number/route/PhoneNumberRouteId.ts";
import { PhoneNumberId } from "@/src/modules/phone-number/type/PhoneNumberId.ts";
import { SessionMessageId } from "@/src/modules/session/type/message/SessionMessageId.ts";
import { SessionId } from "@/src/modules/session/type/SessionId.ts";
import { SimulationRunId } from "@/src/modules/simulation/type/run/SimulationRunId.ts";
import { SimulationSpecId } from "@/src/modules/simulation/type/spec/SimulationSpecId.ts";
import { UserId } from "@/src/modules/user/type/UserId.ts";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const ApiRoute = {
	// Account.
	GET_account_phone_numbers: "/api/account/phone-numbers",
	GET_account_workspaces: "/api/account/workspaces",
	GET_account_workspaces_dropdown: "/api/account/workspaces-dropdown",

	// Agent.
	DELETE_agent: (a: AgentId) => `/api/agent/${a}`,
	DELETE_agent_version: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}`,
	GET_agent_current: (a: AgentId) => `/api/agent/${a}/current`,
	GET_agent_jobs: (a: AgentId) => `/api/agent/${a}/jobs`,
	GET_agent_sessions: (a: AgentId) => `/api/agent/${a}/sessions`,
	GET_agent_simulation_specs: (a: AgentId) => `/api/agent/${a}/simulation-specs`,
	GET_agent_version_audits: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/audits`,
	GET_agent_version_current: (a: AgentId) => `/api/agent/${a}/version/current`,
	GET_agent_version_details: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/details`,
	GET_agent_version_jobs: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/jobs`,
	GET_agent_version_simulation_runs: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-runs`,
	GET_agent_version_simulation_runs_summary: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-runs/summary`,
	GET_agent_version_simulation_specs: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-specs`,
	GET_agent_version_simulation_versions: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-versions`,
	GET_agent_version_types: (a: AgentId) => `/api/agent/${a}/version-types`,
	GET_agent_versions: (a: AgentId) => `/api/agent/${a}/versions`,
	PATCH_agent: (a: AgentId) => `/api/agent/${a}`,
	PATCH_agent_version: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}`,
	PATCH_agent_version_publish: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/publish`,
	POST_agent_session_sync: (a: AgentId) => `/api/agent/${a}/session/sync`,
	POST_agent_version: (a: AgentId) => `/api/agent/${a}/version`,
	POST_agent_version_clone: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/clone`,
	POST_agent_version_conform: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/conform`,
	POST_agent_version_notifications: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/notifications`,
	POST_agent_version_release_notes: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/release-notes`,
	POST_agent_version_simulation_runs: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-runs`,
	POST_agent_version_simulation_specs_build: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-specs/build`,
	POST_agent_version_voice_preview: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/voice-preview`,

	// Audit.
	GET_audit_types: () => "/api/audit/types",

	// Auth.
	GET_auth_login: "/api/auth/login",
	GET_auth_login_fast: (email: Email) => getQueryString("/api/auth/login-fast", { email: email }),

	// Brain.
	DELETE_brain_event: (e: BrainEventId) => `/api/brain/event/${e}`,
	GET_brain_lock: (g: GroupId) => `/api/brain/lock/${g}`,
	POST_brain_event: (g: GroupId) => `/api/brain/event/${g}`,
	POST_brain_event_resume: (e: BrainEventId) => `/api/brain/event/${e}/resume`,

	// Cron.
	POST_cron_trigger: (n: CronName) => `/api/cron/${n}/trigger`,

	// Demo.
	DELETE_demo: (id: DemoId) => `/api/demo/${id}`,
	DELETE_demo_calendar_book: (id: DemoId) => `/api/demo/${id}/calendar/book`,
	GET_demo: (id: DemoId) => `/api/demo/${id}`,
	GET_demo_calendar_options: (id: DemoId) => `/api/demo/${id}/calendar/options`,
	GET_demo_calendar_slots: (id: DemoId) => `/api/demo/${id}/calendar/slots`,
	PATCH_demo_status: (id: DemoId) => `/api/demo/${id}/status`,
	POST_demo: () => `/api/demo`,
	POST_demo_calendar_book: (id: DemoId) => `/api/demo/${id}/calendar/book`,
	POST_demo_checkout: (id: DemoId) => `/api/demo/${id}/checkout`,
	POST_demo_checkout_complete: (id: DemoId) => `/api/demo/${id}/checkout/complete`,

	// File.
	POST_file_insert: () => `/api/file/insert`,
	POST_file_url: () => `/api/file/url`,

	// Group.
	DELETE_group: (g: GroupId) => `/api/group/${g}`,
	DELETE_group_user: (g: GroupId, u: UserId) => `/api/group/${g}/user/${u}`,
	GET_group_agents: (g: GroupId) => `/api/group/${g}/agents`,
	GET_group_agent_types: (g: GroupId) => `/api/group/${g}/agent-types`,
	GET_group_audits: (g: GroupId) => `/api/group/${g}/audits`,
	GET_group_brain_events: (g: GroupId) => `/api/group/${g}/brain-events`,
	GET_group_current: (g: GroupSlug) => `/api/group/${g}/current`,
	GET_group_insert_roles: (g: GroupId) => `/api/group/${g}/insert-roles`,
	GET_group_jobs: (g: GroupId) => `/api/group/${g}/jobs`,
	GET_group_phone_numbers: (g: GroupId) => `/api/group/${g}/phone-numbers`,
	GET_group_root: "/api/group/root",
	GET_group_sessions: (g: GroupId) => `/api/group/${g}/sessions`,
	GET_group_simulation_specs: (g: GroupId) => `/api/group/${g}/simulation-specs`,
	GET_group_users: (g: GroupId) => `/api/group/${g}/users`,
	PATCH_group: (g: GroupId) => `/api/group/${g}`,
	POST_group: "/api/group",
	POST_group_agent: (g: GroupId) => `/api/group/${g}/agent`,
	POST_group_phone_number: (g: GroupId) => `/api/group/${g}/phone-number`,
	POST_group_phone_number_sync: (g: GroupId) => `/api/group/${g}/phone-number/sync`,
	POST_group_user: (g: GroupId) => `/api/group/${g}/user`,

	// Job.
	GET_job_audits: (g: GroupId) => `/api/job/${g}/audits`,
	GET_job_current: (j: JobId) => `/api/job/${j}/current`,
	PATCH_job_status: (j: JobId) => `/api/job/${j}/status`,
	POST_job_run: (j: JobId) => `/api/job/${j}/run`,

	// Log.
	POST_log_error: "/api/log/error",

	// PhoneNumber.
	DELETE_phone_number: (pn: PhoneNumberId) => `/api/phone-number/${pn}`,
	DELETE_phone_number_route: (pn: PhoneNumberId, pnr: PhoneNumberRouteId) => `/api/phone-number/${pn}/route/${pnr}`,
	GET_phone_number_route: (pn: PhoneNumberId, pnr: PhoneNumberRouteId) => `/api/phone-number/${pn}/route/${pnr}`,
	GET_phone_numbers: "/api/phone-numbers",
	POST_phone_number_route: (pn: PhoneNumberId) => `/api/phone-number/${pn}/route`,

	// Root.
	GET_root_agents: "/api/root/agents",
	GET_root_audits: "/api/root/audits",
	GET_root_crons: "/api/root/crons",
	GET_root_demos: "/api/root/demos",
	GET_root_gateway_credits: "/api/root/gateway/credits",
	GET_root_github: "/api/root/github",
	GET_root_groups: "/api/root/groups",
	GET_root_jobs: "/api/root/jobs",
	GET_root_phone_numbers: "/api/root/phone-numbers",
	GET_root_retell_concurrency: "/api/root/retell/concurrency",
	GET_root_sessions: "/api/root/sessions",
	GET_root_users: "/api/root/users",

	// Session.
	DELETE_session_message: (s: SessionId, m: SessionMessageId) => `/api/session/${s}/message/${m}`,
	GET_session_audits: (s: SessionId) => `/api/session/${s}/audits`,
	GET_session_current: (s: SessionId) => `/api/session/${s}/current`,
	GET_session_messages: (s: SessionId) => `/api/session/${s}/messages`,
	GET_session_lock: (s: SessionId) => `/api/session/${s}/lock`,
	GET_session_jobs: (s: SessionId) => `/api/session/${s}/jobs`,
	PATCH_session_end: (s: SessionId) => `/api/session/${s}/end`,
	PATCH_session_sync: (s: SessionId) => `/api/session/${s}/sync`,
	PATCH_session_translate: (s: SessionId) => `/api/session/${s}/translate`,
	POST_session_chat: () => `/api/session/chat`,
	POST_session_message: (s: SessionId) => `/api/session/${s}/message`,
	POST_session_response: (s: SessionId) => `/api/session/${s}/response`,
	POST_session_sms: () => `/api/session/sms`,
	POST_session_web_call: () => `/api/session/web-call`,

	// Simulation.
	GET_simulation_run_audits: (s: SimulationRunId) => `/api/simulation-run/${s}/audits`,
	GET_simulation_run_current: (s: SimulationRunId) => `/api/simulation-run/${s}/current`,
	GET_simulation_spec_audits: (s: SimulationSpecId) => `/api/simulation-spec/${s}/audits`,
	GET_simulation_spec_current: (s: SimulationSpecId) => `/api/simulation-spec/${s}/current`,
	GET_simulation_spec_runs_count: (s: SimulationSpecId) => `/api/simulation-spec/${s}/runs-count`,
	PATCH_simulation_spec: (s: SimulationSpecId) => `/api/simulation-spec/${s}`,
	POST_simulation_spec: () => "/api/simulation-spec",
	POST_simulation_spec_clone: (s: SimulationSpecId) => `/api/simulation-spec/${s}/clone`,

	// Socket.
	GET_socket_list: "/api/socket/list",

	// TimeWindow.
	POST_time_window_rules: () => `/api/time-window/rules`,

	// User.
	GET_user_audits: (u: UserId) => `/api/user/${u}/audits`,
	GET_user_current: "/api/user/current",
	PATCH_user: (u: UserId) => `/api/user/${u}`,
};

export const api = axios.create({
	baseURL: `${Config.UrlBase}`,
	headers: {
		[Header.ContentType]: MimeType2.ApplicationJson,
	},
});

api.interceptors.request.use((config) => {
	// consoleLog("api.interceptors.request");
	config.headers.set(Header.Version, Config.Version);
	config.headers.set(Header.TraceId, getSessionTraceId());
	const token = localStorage.getItem(LocalStorage.UserToken);
	if (token) config.headers.set(Header.Authorization, `Token ${token}`);
	// TODO: reidenzon - Set language.
	// if (language) headers.set(Header.AcceptLanguage, language);
	return config;
});

api.interceptors.response.use((response) => {
	// TODO: reidenzon - Get/send token in response header instead?!
	const data = response.data as ApiResponse<any>;
	const token = data.session?.token;
	if (token) {
		// consoleLog("api.interceptors.response.token");
		localStorage.setItem(LocalStorage.UserToken, token);
	}
	return response;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError) {
			consoleLog("api.interceptors.response.use.ERROR", error);
			const data = error.response?.data as ApiResponseServerError | undefined;
			const msg = data?.message ?? data?.error;
			if (msg) toast.error(msg);

			const url = error.config?.url ?? "";
			if (!url.includes(ApiRoute.POST_log_error)) {
				const reqId = error.response?.data?.reqId;
				reportError(error, {
					source: "API",
					endpoint: url,
					status: error.response?.status,
					reqId,
					metadata: {
						method: error.config?.method,
						responseData: data,
					},
				});
			}
		}
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		const data = response.data as ApiResponse<any>;
		handleMessages(data?.messages);
		return response;
	},
	(error) => {
		if (error instanceof AxiosError) {
			const request = error.request as XMLHttpRequest | undefined;
			const data = error.response?.data as ApiResponse<any> | undefined;
			handleMessages(data?.messages);
		}
		return Promise.reject(error);
	},
);

const handleMessages = (messages?: ApiResponseMessage[]) => {
	messages?.forEach((m) => {
		consoleLog("handleMessages", m);
		if (m.display == ApiResponseMessageDisplay.Console) {
		}
		if (m.display == ApiResponseMessageDisplay.Toast) {
			let toaster = toast.info;
			if (m.status == ApiResponseMessageStatus.Error) toaster = toast.error;
			if (m.status == ApiResponseMessageStatus.Success) toaster = toast.success;
			if (m.status == ApiResponseMessageStatus.Warning) toaster = toast.warning;
			toaster(withHtml(m.content));
		}
	});
};
