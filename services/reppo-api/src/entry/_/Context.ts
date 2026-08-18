import { Database } from "@/src/common/adapters/kysely/Database.js";
import { Config } from "@/src/common/config/Config.js";
import { TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.js";
import { newUuid } from "@/src/common/utility/uuid/Uuid.js";
import { ContextId } from "@/src/entry/_/ContextId.js";
import { ContextLocation } from "@/src/entry/_/ContextLocation.js";
import { ContextMode } from "@/src/entry/_/ContextMode.js";
import { ContextTracer } from "@/src/entry/_/ContextTracer.js";
import { AuditContext } from "@/src/modules/audit/type/AuditContext.js";
import { User } from "@/src/modules/user/type/User.js";
import { UserId } from "@/src/modules/user/type/UserId.js";
import { UserTabler } from "@/src/modules/user/type/UserTable.js";
import { ControlledTransaction, Kysely } from "kysely";
import pino from "pino";
import prettyMilliseconds from "pretty-ms";

export interface ContextConstructor {
	db: Kysely<Database>;
	log: pino.BaseLogger;
	isAwait?: boolean;
}

export abstract class Context {
	id: ContextId;
	abstract mode: ContextMode;

	log: pino.BaseLogger;
	isAwait: boolean;
	createdAt: Date;

	protected db_: Kysely<Database>;
	protected trx_?: ControlledTransaction<Database>;

	protected currentUserId?: UserId;
	protected currentUser?: User; // CurrentUser;

	/** @deprecated TODO: reidenzon - Use asyncManager instead. */
	protected promises: Promise<any>[] = [];

	protected constructor(p: ContextConstructor) {
		this.id = newUuid();
		this.db_ = p.db;
		this.log = p.log;
		this.isAwait = p.isAwait ?? true;
		this.createdAt = new Date();
	}

	get db(): ControlledTransaction<Database> | Kysely<Database> {
		return this.trx_ ?? this.db_;
	}

	toAuditContext(): AuditContext {
		return new AuditContext({
			id: this.id,
			mode: this.mode,
			version: Config.Version,
		});
	}

	catch = (err: Error) => {
		this.log.error(err);
	};

	/**
	 * This is a wrapper to execute transaction.
	 * If transaction already present, then will use existing transaction.
	 */
	dbTransaction = async <Result = any>(
		callback: () => Promise<[Result | undefined, Error | undefined]>,
	): Promise<[Result | undefined, Error | undefined]> => {
		if (this.trx_) {
			const [result, err] = await callback();
			if (err) {
				this.log.error({ msg: "Context.dbTransaction.trx_.ROLLBACK", err });
				await this.trx_.rollback().execute();
				return [undefined, err];
			}
			return [result, err];
		}
		if (!this.trx_) {
			this.trx_ = await this.withTransaction();
			try {
				const [result, err] = await callback();
				if (err) {
					this.log.error({ msg: "Context.dbTransaction.trx.try.ROLLBACK", err });
					await this.trx_.rollback().execute();
					this.trx_ = undefined;
					return [undefined, err];
				}
				await this.trx_.commit().execute();
				this.trx_ = undefined;
				return [result, undefined];
			} catch (err) {
				this.log.error({ msg: "Context.dbTransaction.trx.catch.ROLLBACK", err });
				await this.trx_?.rollback().execute();
				this.trx_ = undefined;
				if (err instanceof Error) return [undefined, err];
			}
		}
		return [undefined, new Error()];
	};

	setCurrentUserId = (userId?: UserId) => (this.currentUserId = userId);
	getCurrentUserId = () => this.currentUserId;

	getCurrentUser = async (): Promise<User> => {
		if (!this.currentUser) {
			// TODO: reidenzon - Cache the current user somewhere, ie: Redis?!
			this.currentUser = await UserTabler.select(this, { id: this.currentUserId });
			if (!this.currentUser) {
				throw new Error(`Do NOT have [${this.currentUserId}] user!`);
			}
		}
		return this.currentUser;
	};

	/**
	 * This is a sugar wrapper (for TypeScript) and error-free missing user.
	 * Mostly relevant for {@link ApiAuthorization.Public} routes.
	 */
	getCurrentUserMaybe = async (): Promise<User | undefined> => {
		try {
			return await this.getCurrentUser();
		} catch (err) {}
		return undefined;
	};

	getTimeElapsed = (): TimeMillisecond => {
		return Date.now() - this.createdAt.getTime();
	};

	getTimeElapsedPretty = (): string => {
		return prettyMilliseconds(this.getTimeElapsed());
	};

	toJSON = () => {
		return {
			id: this.id,
			mode: this.mode,
			createdAt: this.createdAt,
			isAwait: this.isAwait,
		};
	};

	trace = (location: ContextLocation): ContextTracer => {
		return new ContextTracer(this, {
			location: location,
		});
	};

	/**
	 * Wait for these promises before final shutdown.
	 * Helpful to let audit logs, db explain analysis, etc...
	 * @deprecated TODO: reidenzon - Use asyncManager instead.
	 */
	withPromise = (promise: Promise<any>) => {
		this.promises.push(promise);
	};

	withTransaction = async (ctx?: Context): Promise<ControlledTransaction<Database>> => {
		this.trx_ = ctx?.trx_ ?? (await this.db_.startTransaction().execute());
		return this.trx_;
	};
}
