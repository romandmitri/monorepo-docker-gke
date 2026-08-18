import { GoogleChatMessageText } from "@/src/common/adapters/google/chat/type/GoogleChatMessageText.js";

// https://developers.google.com/workspace/chat/format-messages

class GoogleChatFormatter {
	block = (c: string | undefined): string => "```\n" + (c ?? "") + "\n```";
	bold = (c: string): string => "*" + c + "*";
	bullet = (c: string): string => "↳ " + c;
	code = (c: string | undefined): string => "`" + (c ?? "") + "`";
	italic = (c: string): string => "_" + c + "_";
	strike = (c: string): string => "~" + c + "~";
	title = (c: string): string => f.bold(c);
	link = (c: string, url: string): string => `<${url}|${c}>`;
	lines = (c: string[]): GoogleChatMessageText => c.join("\n");
}

const f = new GoogleChatFormatter();

export const getGoogleChatFormatter = () => f;
