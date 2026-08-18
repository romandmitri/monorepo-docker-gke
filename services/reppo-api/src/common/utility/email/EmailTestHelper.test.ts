import { newHumanId } from "@/src/common/utility/human-id/HumanId.js";
import { Email } from "@/src/common/utility/email/Email.js";

export class EmailTestHelperTest {
	static newEmail = (): Email => {
		return newHumanId() + "@test.ca";
	};
}
