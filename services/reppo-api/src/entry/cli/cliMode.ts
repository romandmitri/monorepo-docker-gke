import { cli_agent_version_import } from "@/src/modules/agent-version/cli/cli-agent-version-import.js";
import { cli_agent_import } from "@/src/modules/agent/cli/cli-agent-import.js";
import { cli_agent_retell_export_all } from "@/src/modules/agent/cli/cli-agent-retell-export-all.js";
import { cli_brain_dev } from "@/src/modules/brain/cli/cli-brain-dev.js";
import { cli_group_import } from "@/src/modules/group/cli/cli-group-import.js";
import { cli_group_parents_refresh } from "@/src/modules/group/cli/cli-group-parents-refresh.js";
import { cli_group_tree } from "@/src/modules/group/cli/cli-group-tree.js";
import { cli_job_dev } from "@/src/modules/job/cli/cli-job-dev.js";
import { cli_job_run } from "@/src/modules/job/cli/cli-job-run.js";
import { cli_notification_gchat } from "@/src/modules/notification/cli/cli-notification-gchat.js";
import { cli_perm_actions } from "@/src/modules/perm/cli/cli-perm-actions.js";
import { cli_perm_roles } from "@/src/modules/perm/cli/cli-perm-roles.js";
import { cli_phone_number_import } from "@/src/modules/phone-number/cli/cli-phone-number-import.js";
import { cli_seed_all } from "@/src/modules/seed/cli/cli-seed-all.js";
import { cli_session_trigger_job } from "@/src/modules/session/cli/cli-session-trigger-jobs.js";
import { cli_simulation_run } from "@/src/modules/simulation/cli/cli-simulation-run.js";
import { cli_simulation_spec_import } from "@/src/modules/simulation/cli/cli-simulation-spec-import.js";
import { cli_user_dev } from "@/src/modules/user/cli/cli-user-dev.js";
import { cli_user_import } from "@/src/modules/user/cli/cli-user-import.js";
import { LevelWithSilentOrString } from "pino";
import { Argv } from "yargs";

export interface CliOptions {
	level?: LevelWithSilentOrString;
}

export const cliMode = async (yargs: Argv) => {
	// TODO: reidenzon - Figure out bash completion!
	// yargs.completion()

	yargs.demandCommand(1, "Need sub!");
	yargs.option("level", {
		type: "string",
		choices: ["debug", "info", "warn", "error", "fatal"],
		default: "info",
		describe: "Log verbosity level",
	});

	cli_agent_import(yargs);
	cli_agent_retell_export_all(yargs);

	cli_simulation_run(yargs);

	cli_agent_version_import(yargs);

	cli_brain_dev(yargs);

	cli_group_import(yargs);
	cli_group_parents_refresh(yargs);
	cli_group_tree(yargs);

	cli_job_dev(yargs);
	cli_job_run(yargs);

	cli_notification_gchat(yargs);

	cli_perm_actions(yargs);
	cli_perm_roles(yargs);

	cli_phone_number_import(yargs);

	cli_seed_all(yargs);

	cli_session_trigger_job(yargs);

	cli_simulation_spec_import(yargs);

	cli_user_dev(yargs);
	cli_user_import(yargs);

	return yargs;
};
