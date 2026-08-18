import { UseChatHelpers } from "@ai-sdk/react"; // TODO: reidenzon - Where is the list?!!

// TODO: reidenzon - Where is the list?!!
type ChatStatus_ = UseChatHelpers<any>["status"];

export enum ChatStatus {
	Error = "error",
	Ready = "ready",
	Submitted = "submitted",
	Streaming = "streaming",
}
