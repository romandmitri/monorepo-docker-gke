import { AsyncId } from "@/src/common/utility/async/AsyncId.js";
import { AsyncName } from "@/src/common/utility/async/AsyncName.js";
import { AsyncProcess } from "@/src/common/utility/async/AsyncProcess.js";
import { timeDelay, TimeMillisecond } from "@/src/common/utility/time/TimeMillisecond.js";
import { newUuid } from "@/src/common/utility/uuid/Uuid.js";
import pino from "pino";
import prettyMilliseconds from "pretty-ms";

class AsyncManager {
	protected log?: pino.BaseLogger;
	protected map = new Map<AsyncId, AsyncProcess>();

	constructor(p: {}) {}

	init = (p: { log: pino.BaseLogger }) => {
		this.log = p.log;
	};

	run = async (name: AsyncName, callback: () => Promise<void>) => {
		const asyncProcess = this.start(name);
		try {
			await callback();
		} catch (err) {
			this.log?.error({ msg: "AsyncManager.run.ERROR", err });
		} finally {
			asyncProcess.release();
		}
	};

	close = async (): Promise<void> => {
		while (!this.isDone()) {
			const timeNow = new Date().getTime();
			this.log?.info({
				msg: "AsyncManager.close.wait",
				waiting: this.getValues().map((ap) => {
					return {
						id: ap.id,
						name: ap.name,
						startedAt: ap.startedAt,
						timeElapsed: prettyMilliseconds(timeNow - ap.startedAt.getTime()),
					};
				}),
			});
			// TODO: reidenzon - Wait for promises instead?!
			// REMINDER
			// For local development [tsx watch] will KILL in 5s, so keeping this lower.
			// Do NOT wait longer than 1s because sample crons will overlap and keep pods alive.
			await timeDelay(TimeMillisecond.Second);
		}
	};

	protected start = (name: AsyncName): AsyncProcess => {
		this.log?.debug({ msg: "AsyncManager.start", asyncName: name });
		const asyncId = newUuid();
		const asyncProcess: AsyncProcess = {
			id: asyncId,
			name: name,
			startedAt: new Date(),
			release: () => {
				this.log?.debug({ msg: "AsyncManager.release", asyncName: name, asyncId });
				this.map.delete(asyncId);
			},
		};
		this.map.set(asyncId, asyncProcess);
		return asyncProcess;
	};

	protected isDone = (): boolean => {
		return this.getValues().length == 0;
	};

	protected getValues = (): AsyncProcess[] => {
		return [...this.map.values()];
	};
}

export const asyncManager = new AsyncManager({});
