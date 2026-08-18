import { AgentVersionId } from "@/src/modules/agent-version/type/AgentVersionId.js";
import { AgentId } from "@/src/modules/agent/type/AgentId.js";
import { BrainEventId } from "@/src/modules/brain/type/event/BrainEventId.js";
import { CronName } from "@/src/modules/cron/type/CronName.js";
import { DemoId } from "@/src/modules/demo/type/DemoId.js";
import { GroupId } from "@/src/modules/group/type/GroupId.js";
import { GroupSlug } from "@/src/modules/group/type/GroupSlug.js";
import { JobId } from "@/src/modules/job/type/JobId.js";
import { PhoneNumberRouteId } from "@/src/modules/phone-number/route/PhoneNumberRouteId.js";
import { PhoneNumberId } from "@/src/modules/phone-number/type/PhoneNumberId.js";
import { SessionMessageId } from "@/src/modules/session/type/message/SessionMessageId.js";
import { SessionId } from "@/src/modules/session/type/SessionId.js";
import { SimulationRunId } from "@/src/modules/simulation/type/run/SimulationRunId.js";
import { SimulationSpecId } from "@/src/modules/simulation/type/spec/SimulationSpecId.js";
import { UserId } from "@/src/modules/user/type/UserId.js";

export const ApiRoute = {
	// Account.
	GET_account_workspaces: () => "/api/account/workspaces",
	GET_account_workspaces_dropdown: () => "/api/account/workspaces-dropdown",

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
	GET_agent_version_types: (a: AgentId) => `/api/agent/${a}/version-types`,
	GET_agent_version_simulation_versions: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-versions`,
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
	POST_agent_version_voice_preview: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/voice-preview`,
	POST_agent_version_simulation_runs: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-runs`,
	POST_agent_version_simulation_specs_build: (a: AgentId, v: AgentVersionId) => `/api/agent/${a}/version/${v}/simulation-specs/build`,
	// REMINDER: Do NOT rename/remove webhook route, it is used by Retell.
	POST_agent_version_tool_webhook: () => `/api/agent/version/tool/webhook`,

	// Audit.
	GET_audit_types: () => "/api/audit/types",

	// Auth.
	GET_auth_callback: () => "/api/auth-callback",
	GET_auth_login: () => "/api/auth/login",
	GET_auth_login_fast: () => "/api/auth/login-fast",
	GET_auth_logout: () => "/api/auth/logout",

	// Brain: Event.
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

	// Firecrawl.
	// REMINDER: Do NOT rename/remove webhook route, it is used by GoHighLevel.
	POST_firecrawl_webhook: () => `/api/firecrawl/webhook`,

	// GoHighLevel.
	// REMINDER: Do NOT rename/remove webhook route, it is used by GoHighLevel.
	POST_ghl_webhook: () => `/api/ghl/webhook`,

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
	GET_group_root: () => "/api/group/root",
	GET_group_sessions: (g: GroupId) => `/api/group/${g}/sessions`,
	GET_group_simulation_specs: (g: GroupId) => `/api/group/${g}/simulation-specs`,
	GET_group_users: (g: GroupId) => `/api/group/${g}/users`,
	PATCH_group: (g: GroupId) => `/api/group/${g}`,
	POST_group: () => "/api/group",
	POST_group_agent: (g: GroupId) => `/api/group/${g}/agent`,
	POST_group_phone_number: (g: GroupId) => `/api/group/${g}/phone-number`,
	POST_group_phone_number_sync: (g: GroupId) => `/api/group/${g}/phone-number/sync`,
	POST_group_user: (g: GroupId) => `/api/group/${g}/user`,

	// Job.
	GET_job_audits: (g: JobId) => `/api/job/${g}/audits`,
	GET_job_current: (j: JobId) => `/api/job/${j}/current`,
	PATCH_job_status: (j: JobId) => `/api/job/${j}/status`,
	POST_job_run: (j: JobId) => `/api/job/${j}/run`,

	// Lead.
	POST_lead_chief_of_staff: () => "/api/lead/chief-of-staff",

	// Log.
	POST_log_error: () => "/api/log/error",

	// PhoneNumber.
	DELETE_phone_number: (pn: PhoneNumberId) => `/api/phone-number/${pn}`,
	DELETE_phone_number_route: (pn: PhoneNumberId, pnr: PhoneNumberRouteId) => `/api/phone-number/${pn}/route/${pnr}`,
	GET_phone_number_route: (pn: PhoneNumberId, pnr: PhoneNumberRouteId) => `/api/phone-number/${pn}/route/${pnr}`,
	GET_phone_numbers: () => `/api/phone-numbers`,
	POST_phone_number_route: (pn: PhoneNumberId) => `/api/phone-number/${pn}/route`,

	// Probe.
	GET_probe_deep: () => "/api",
	GET_probe_error: () => "/api/error",
	GET_probe_root: () => "/",

	// REMINDER: Do NOT rename/remove webhook route, it is used by Retell.
	POST_retell_inbound_call_webhook: () => `/api/retell/inbound-call-webhook`,

	// Root.
	GET_root_agents: () => "/api/root/agents",
	GET_root_audits: () => "/api/root/audits",
	GET_root_crons: () => "/api/root/crons",
	GET_root_demos: () => "/api/root/demos",
	GET_root_gateway_credits: () => "/api/root/gateway/credits",
	GET_root_github: () => "/api/root/github",
	GET_root_groups: () => "/api/root/groups",
	GET_root_jobs: () => "/api/root/jobs",
	GET_root_phone_numbers: () => "/api/root/phone-numbers",
	GET_root_retell_concurrency: () => "/api/root/retell/concurrency",
	GET_root_sessions: () => "/api/root/sessions",
	GET_root_users: () => "/api/root/users",

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
	// REMINDER: Do NOT rename/remove webhook route, it is used by Retell. (deprecated)
	POST_session_inbound_call_webhook: () => `/api/session/inbound-call-webhook`,
	POST_session_message: (s: SessionId) => `/api/session/${s}/message`,
	POST_session_response: (s: SessionId) => `/api/session/${s}/response`,
	POST_session_sms: () => `/api/session/sms`,
	POST_session_web_call: () => `/api/session/web-call`,
	POST_session_webhook: () => `/api/session/webhook`,

	// Simulation.
	GET_simulation_run_audits: (s: SimulationRunId) => `/api/simulation-run/${s}/audits`,
	GET_simulation_run_current: (s: SimulationRunId) => `/api/simulation-run/${s}/current`,
	GET_simulation_spec_audits: (s: SimulationSpecId) => `/api/simulation-spec/${s}/audits`,
	GET_simulation_spec_current: (s: SimulationSpecId) => `/api/simulation-spec/${s}/current`,
	PATCH_simulation_spec: (s: SimulationSpecId) => `/api/simulation-spec/${s}`,
	POST_simulation_spec: () => "/api/simulation-spec",
	POST_simulation_spec_clone: (s: SimulationSpecId) => `/api/simulation-spec/${s}/clone`,

	// Socket.
	GET_socket: () => "/api/socket",
	GET_socket_list: () => "/api/socket/list",
	GET_socket_list_internal: () => "/api/socket/list-internal",

	// Stripe.
	// REMINDER: Do NOT rename/remove webhook route, it is used by Stripe.
	POST_stripe_webhook: () => `/api/stripe/webhook`,

	// TimeWindow.
	POST_time_window_rules: () => `/api/time-window/rules`,

	// User.
	GET_user_audits: (u: UserId) => `/api/user/${u}/audits`,
	GET_user_current: () => "/api/user/current",
	PATCH_user: (u: UserId) => `/api/user/${u}`,
};
