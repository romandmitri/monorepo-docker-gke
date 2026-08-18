const fs = require("fs");

const cheerio = require("cheerio");
const express = require("express");

const server = express();

const envMake = () => {
	const envs = {};

	Object.keys(process.env)
		.filter((key) => key.startsWith("REPPO_DASHBOARD_"))
		.forEach((key) => (envs[key] = process.env[key]));

	const pathGitHub = "/src/.env.github";
	if (fs.existsSync(pathGitHub)) {
		String(fs.readFileSync(pathGitHub))
			.split("\n")
			.forEach((line) => {
				const [key, value] = line.split("=");
				if (["GITHUB_SHA"].includes(key)) {
					envs[key] = value;
				}
			});
	}

	const pathPackage = "/src/package.json";
	if (fs.existsSync(pathPackage)) {
		const pkg = require(pathPackage);
		envs["REPPO_DASHBOARD_VERSION"] = pkg.version;
	}

	return envs;
};

const envs = envMake();

const index = (req, res) => {
	const html = fs.readFileSync("/src/dist/index.html");
	const $ = cheerio.load(html);

	const script = `<script>window['_envs'] = ${JSON.stringify(envs)};</script>`;
	$("head").append(script);

	return res.send($.html());
};

server.use("/dashboard/$", index);
server.use("/dashboard", express.static("dist"));
server.use("/", index);

server.listen(80);
