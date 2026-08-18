import {userJwtNew, UserJwtString, UserJwtStruct} from "@/src/modules/user/type/UserJwt.js";

export interface ApiResponseSession {
	token: UserJwtString;
}

export const apiResponseSessionFromToken = (tokenStruct: UserJwtStruct): ApiResponseSession => {
	const token = userJwtNew({
		userId: tokenStruct.userId,
	})
	return {
		token: token,
	}
}
