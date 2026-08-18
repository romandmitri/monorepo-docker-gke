import { AsyncId } from "@/src/common/utility/async/AsyncId.js";
import { AsyncName } from "@/src/common/utility/async/AsyncName.js";

export interface AsyncProcess {
	id: AsyncId;
	name: AsyncName;
	startedAt: Date;
	release: () => void;
}
