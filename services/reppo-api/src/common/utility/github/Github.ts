import { GitHubSha } from "@/src/common/utility/github/GitHubSha.js";
import dotenv from "dotenv";
import * as fs from "node:fs";

const parseFile = () => {
	const path = "/src/.env.github";
	if (!fs.existsSync(path)) return {};
	return dotenv.parse(fs.readFileSync(path));
};

const envs = parseFile();

export const GitHub = {
	Sha: envs["GITHUB_SHA"] as GitHubSha,
};
