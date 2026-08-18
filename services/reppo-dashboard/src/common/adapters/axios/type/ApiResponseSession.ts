import {UserJwtString} from "@/src/modules/user/type/jwt/UserJwt.ts";

export interface ApiResponseSession {
	token: UserJwtString;
}
