import { ApiResponseMessage } from "@/src/entry/api/ApiResponseMessage.js";
import { ApiResponseSession } from "@/src/entry/api/ApiResponseSession.js";

export interface ApiResponse<Data = ApiResponseData> {
	data: Data;
	messages: ApiResponseMessage[];
	reqId?: string;
	session?: ApiResponseSession;
}
export interface ApiResponseData {}

export const newApiResponse = (reqId?: string): ApiResponse<any> => {
	return {
		data: {},
		messages: [],
		reqId,
	};
};
