import {type Config} from "prettier";

// https://prettier.io/docs/configuration

const config: Config = {
	plugins: ["prettier-plugin-tailwindcss"],
	printWidth: 160,
	tabWidth: 4,
	useTabs: true,
};

export default config;
