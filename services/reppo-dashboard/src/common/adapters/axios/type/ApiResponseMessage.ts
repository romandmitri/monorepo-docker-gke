export interface ApiResponseMessage {
	content: string;
	display: ApiResponseMessageDisplay;
	status: ApiResponseMessageStatus;
}

export enum ApiResponseMessageDisplay {
	Console = "console",
	Toast = "toast",
}

// TODO: reidenzon - User other build-in value set?! At least make alert-specific.
// export type ApiResponseMessageStatus = ToastTypes
export enum ApiResponseMessageStatus {
	Error = "error",
	Info = "info",
	Success = "success",
	Warning = "warning",
}
