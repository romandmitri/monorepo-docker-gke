// Key/path in bucket, typically generated with "YYYY/MM/DD" prefix
// Example: "2025/10/23/abc123.txt"
import {getMimeTypeExtension, MimeType2} from "@/src/common/utility/mime/MimeType2.js";
import {newUuid} from "@/src/common/utility/uuid/Uuid.js";
import {Context} from "@/src/entry/_/Context.js";
import {Agent} from "@/src/modules/agent/type/Agent.js";
import {Group} from "@/src/modules/group/type/Group.js";
import {User} from "@/src/modules/user/type/User.js";

export type ObjectName = string;

const generate = (ctx: Context, mimeType: MimeType2, parts: string[]): string => {
	let objectName = [...parts, newUuid()].join("/");
	const extension = getMimeTypeExtension(mimeType);
	if (extension) objectName += "." + extension;
	ctx.log.debug({ msg: "generate.objectName", parts, objectName });
	return objectName;
};

export class ObjectNameGenerator {
	static forGroup = (ctx: Context, mimeType: MimeType2, group: Group): ObjectName => {
		return generate(ctx, mimeType, ["group", group.id]);
	};

	static forGroupAgent = (ctx: Context, mimeType: MimeType2, agent: Agent): ObjectName => {
		return generate(ctx, mimeType, ["group", agent.groupId, "agent", agent.id]);
	};

	/** @deprecated TODO: reidenzon - Use specific generator function! */
	static forMisc = (ctx: Context, mimeType: MimeType2): ObjectName => {
		const date = new Date();
		const year = String(date.getFullYear());
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return generate(ctx, mimeType, ["misc", year, month, day]);
	};

	static forUser = (ctx: Context, mimeType: MimeType2, user: User): ObjectName => {
		return generate(ctx, mimeType, ["user", user.id]);
	};
}
