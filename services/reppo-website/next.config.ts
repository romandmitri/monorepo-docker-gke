import type {NextConfig} from "next";

const {version} = require("./package.json");

const nextConfig: NextConfig = {
	/* config options here */
	env: {
		APP_VERSION: version
	}
};

export default nextConfig;
