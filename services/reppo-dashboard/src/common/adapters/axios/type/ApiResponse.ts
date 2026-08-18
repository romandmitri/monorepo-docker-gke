import { ApiResponseMessage } from "@/src/common/adapters/axios/type/ApiResponseMessage.ts";
import { ApiResponseSession } from "@/src/common/adapters/axios/type/ApiResponseSession.ts";

export interface ApiResponse<Data> {
	data: Data;
	messages?: ApiResponseMessage[];
	reqId?: string;
	session?: ApiResponseSession;
}

export interface ApiResponseServerError {
	statusCode: string; // HtmlStatus
	code: string;
	error: string;
	message: string;
}
