import { ContextMode } from "@/src/entry/_/ContextMode.js";
import { apiMode } from "@/src/entry/api/apiMode.js";
import { cliMode } from "@/src/entry/cli/cliMode.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
	// TODO: reidenzon - Figure out bash completion!
	// .completion()
	.scriptName("")
	// .wrap(yargs().terminalWidth())
	.wrap(120)
	// .wrap(null)
	.command(ContextMode.Api, "Run in API mode.", apiMode)
	.command(ContextMode.Cli, "Run in CLI mode.", cliMode)
	.demandCommand(1, "Specify [api] or [cli] command.")
	.example([
		//
		["$0 api"],
		["$0 cli [command]"],
	])
	.help()
	.parse();
