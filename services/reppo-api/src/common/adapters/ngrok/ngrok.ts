import { Config } from "@/src/common/config/Config.js";
import ngrok from "@ngrok/ngrok";
import pino from "pino";

// https://ngrok.com/download/node-js

export type NgrokHost = string;

const isNgrok = (): boolean => {
	if (Config.Ngrok_AuthToken == "") return false;
	if (!Config.Ngrok_Domain.includes("ngrok")) return false;
	return true;
};

export const getNgrokHost = (): NgrokHost | undefined => {
	if (!isNgrok()) return;
	return "https://" + Config.Ngrok_Domain;
};

export const ngrokConnect = async (log: pino.BaseLogger) => {
	if (!isNgrok()) return;
	const listener = await ngrok.connect({
		// addr: Config.UrlBase,
		port: 80,
		host: "0.0.0.0",
		authtoken: Config.Ngrok_AuthToken,
		domain: Config.Ngrok_Domain,
	});
	log.info({ msg: "ngrokConnect", url: listener.url(), forwardsTo: listener.forwardsTo() });
};
