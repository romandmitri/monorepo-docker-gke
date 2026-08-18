import { humanId } from "human-id";

export type HumanId = string;

export const newHumanId = (): HumanId => {
	return humanId({
		addAdverb: false,
		adjectiveCount: 0,
		capitalize: false,
		separator: "-",
	});
};
