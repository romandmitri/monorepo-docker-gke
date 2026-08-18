import { Context } from "@/src/entry/_/Context.js";
import { ContextLocation } from "@/src/entry/_/ContextLocation.js";
import { AuditContext } from "@/src/modules/audit/type/AuditContext.js";

// REMINDER
// This works more predictably than getCallSites() (stack trace) approach
// because stack lacks context in async functions (posts as "processTicksAndRejections")

export class ContextTracer {
	ctx: Context;
	location: ContextLocation;

	constructor(
		ctx: Context,
		p: {
			//
			location: ContextLocation;
		},
	) {
		this.ctx = ctx;
		this.location = p.location;
	}

	toAuditContext = (): AuditContext => {
		const ctx = this.ctx.toAuditContext();
		ctx.location = this.location;
		return ctx;
	};
}
