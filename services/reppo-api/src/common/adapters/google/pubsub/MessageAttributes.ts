import { QueueMessageType } from "@/src/modules/queue/type/QueueMessageType.js";
import { MessageOptions } from "@google-cloud/pubsub/build/src/topic.js";

export type MessageAttributes = MessageOptions["attributes"] & {
	audience: string;
	type: QueueMessageType;
};
