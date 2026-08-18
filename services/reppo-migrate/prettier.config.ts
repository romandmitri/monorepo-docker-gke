import { type Config } from "prettier";
import { PluginEmbedOptions } from "prettier-plugin-embed";

// TODO: reidenzon - Why is prettier NOT working on embed SQL formatting?!

// https://prettier.io/docs/configuration
// https://github.com/un-ts/prettier/tree/master/packages/sql

const configEmbed: PluginEmbedOptions = {
	embeddedSqlTags: ["sql"],
};

/** @type {import('prettier-plugin-sql').SqlOptions} */
const configSql = {
	database: "postgresql",
	language: "postgresql",
	keywordCase: "upper",
};

const config: Config & PluginEmbedOptions = {
	plugins: [
		//
		"prettier-plugin-embed",
		"prettier-plugin-sql",
	],
	printWidth: 160,
	tabWidth: 2,
	useTabs: true,

	...configEmbed,
	...configSql,
};

export default config;
