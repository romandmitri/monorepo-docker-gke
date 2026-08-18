import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import {defineConfig, type Plugin} from "vite";
import version from "vite-plugin-package-version";
import vitePluginSvgr from "vite-plugin-svgr";

/**
 * Prevents flash-of-white when navigating from the dark reppo-website to the
 * dashboard's demo pages (/dashboard/demo/*).
 *
 * The background value must match `--background` in `.demo-theme` (theme.css).
 */
const DEMO_THEME_BG = "oklch(0.18 0.04 163)";

function demoThemePreload(): Plugin {
	return {
		name: "demo-theme-preload",
		transformIndexHtml() {
			return [
				{
					tag: "script",
					injectTo: "body",
					attrs: {"data-demo-preload": ""},
					children: [
						`if(/^\\/dashboard\\/demo\\//.test(location.pathname)){`,
						`document.body.style.backgroundColor='${DEMO_THEME_BG}';`,
						`document.documentElement.style.colorScheme='dark'`,
						`}`,
					].join(""),
				},
			];
		},
	};
}

// https://vite.dev/config/
export default defineConfig((env) => {
	return {
		base: "/dashboard",
		envPrefix: "REPPO_DASHBOARD_",
		plugins: [
			react(),
			vitePluginSvgr({
				include: "**/*.svg?react",
			}),
			tailwindcss(),
			demoThemePreload(),
			// tsconfigPaths(),
			version(),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./"),
			},
		},
		server: {
			allowedHosts: true,
			cors: true,
			host: "0.0.0.0",
			port: 80,
			// https://vite.dev/config/server-options.html#server-hmr
			hmr: {
				clientPort: 2000, // proxy
				// clientPort: 2020, // direct
				// host: "0.0.0.0",
				overlay: true,
				path: "/hmr",
				port: 80,
			},
			strictPort: true,
		},
	};
});
