import { Config } from "@/src/common/config/Config.js";
import { PubSub } from "@google-cloud/pubsub";

export const pubsub = new PubSub({
	keyFilename: Config.GoogleCredentialsFile,
});

enum Topic {
	Global = "global",
}

export const pubsubGlobal = pubsub.topic(Topic.Global);
