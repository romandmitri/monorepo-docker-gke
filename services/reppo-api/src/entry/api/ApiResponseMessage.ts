export type ApiResponseMessageContent = string;

export interface ApiResponseMessage {
	content: ApiResponseMessageContent;
	display: ApiResponseMessageDisplay;
	status: ApiResponseMessageStatus;
}

export enum ApiResponseMessageDisplay {
	Console = "console",
	Toast = "toast",
}

export enum ApiResponseMessageStatus {
	Error = "error",
	Info = "info",
	Success = "success",
	Warning = "warning",
}
