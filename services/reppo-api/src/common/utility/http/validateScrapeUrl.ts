import { TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.js";
import axios from "axios";
import { parse } from "tldts";

export class ScrapeUrlError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ScrapeUrlError";
	}
}

const BLOCKED_DOMAINS = new Set([
	// Social / Messaging
	"facebook",
	"instagram",
	"twitter",
	"linkedin",
	"tiktok",
	"pinterest",
	"snapchat",
	"discord",
	"telegram",
	"threads",
	"whatsapp",
	"reddit",

	// Video / Streaming
	"youtube",
	"netflix",
	"spotify",

	// Search / Portals
	"google",
	"bing",
	"yahoo",
	"duckduckgo",
	"msn",
	"aol",

	// Major Tech
	"apple",
	"microsoft",
	"github",
	"amazon",
	"wikipedia",

	// Website Builders (users should enter their own site, not the platform)
	"shopify",
	"wordpress",
	"wix",
	"squarespace",
	"godaddy",
	"weebly",

	// Retail / Big Box
	"walmart",
	"target",
	"costco",
	"homedepot",
	"lowes",
	"bestbuy",
	"ebay",
	"etsy",

	// Canadian
	"canadiantire",
	"cbc",
	"ctv",
	"globalnews",
	"theglobeandmail",
	"timhortons",
	"loblaws",
	"shoppers",
	"kijiji",
	"rona",
	"indigo",

	// Reviews / Directories / Classifieds
	"yelp",
	"tripadvisor",
	"craigslist",
	"indeed",
	"airbnb",
	"realtor",

	// Government / Institutional
	"gc",
	"gov",
]);

export const validateScrapeUrl = (raw: string): [string | undefined, ScrapeUrlError | undefined] => {
	let input = raw.trim();

	if (!input) {
		return [undefined, new ScrapeUrlError("Please enter a website URL.")];
	}

	if (input.includes("@")) {
		return [undefined, new ScrapeUrlError("That looks like an email address. Please enter your website URL.")];
	}

	if (input.length > 50) {
		return [undefined, new ScrapeUrlError("URL is too long. Please enter your main website URL.")];
	}

	if (!/^https?:\/\//i.test(input)) {
		input = `https://${input}`;
	}

	let url: URL;
	try {
		url = new URL(input);
	} catch {
		return [undefined, new ScrapeUrlError("Invalid URL. Please enter a valid website URL (e.g. example.com).")];
	}

	if (url.protocol !== "http:" && url.protocol !== "https:") {
		return [undefined, new ScrapeUrlError("Only HTTP and HTTPS URLs are supported.")];
	}

	const host = url.hostname;
	const isIp = /^[\d.]+$/.test(host) || host.startsWith("[");
	if (isIp || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
		return [undefined, new ScrapeUrlError("Please enter a domain name, not an IP address.")];
	}

	if (!host.includes(".")) {
		return [undefined, new ScrapeUrlError("URL must have a valid domain (e.g. example.com).")];
	}

	const parsed = parse(url.href);
	if (parsed.domainWithoutSuffix && BLOCKED_DOMAINS.has(parsed.domainWithoutSuffix)) {
		return [undefined, new ScrapeUrlError("This looks like a major platform, not a business website. Please enter your own business website URL.")];
	}

	return [url.toString(), undefined];
};

const PROBE_TIMEOUT = 3 * TimeMillisecond.Second;

export const probeScrapeUrl = async (url: string): Promise<[undefined, ScrapeUrlError | undefined]> => {
	try {
		const response = await axios.head(url, {
			timeout: PROBE_TIMEOUT,
			maxRedirects: 5,
			validateStatus: () => true,
			headers: { "User-Agent": "Mozilla/5.0 (compatible; MeshBot/1.0)" },
		});

		if (response.status === 404) {
			return [undefined, new ScrapeUrlError("That website returned a 'not found' page. Please check the URL for typos.")];
		}
	} catch (err) {
		if (err instanceof ScrapeUrlError) return [undefined, err];

		if (!axios.isAxiosError(err)) {
			return [undefined, new ScrapeUrlError("We couldn't reach that website. Please check the URL and try again.")];
		}

		const code = err.code;

		if (code === "ENOTFOUND") {
			return [undefined, new ScrapeUrlError("We couldn't find that website. Please check the URL for typos.")];
		}
		if (code === "ECONNREFUSED" || code === "ECONNRESET") {
			return [undefined, new ScrapeUrlError("That website isn't responding. Please verify the URL.")];
		}
		if (code === "ECONNABORTED") {
			return [undefined, new ScrapeUrlError("That website took too long to respond. Please verify the URL.")];
		}

		return [undefined, new ScrapeUrlError("We couldn't reach that website. Please check the URL and try again.")];
	}

	return [undefined, undefined];
};
