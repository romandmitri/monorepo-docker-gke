// Prompt length, in tokens.
export type PromptLength = number;

// Approx. characters per token for English text (GPT-style tokenization).
const CHARS_PER_TOKEN = 4;

export const getPromptLength = (chars: number | undefined): PromptLength => {
	if (!chars) return 0;
	return Math.ceil(chars / CHARS_PER_TOKEN);
};

export type PromptLengthLimits = {
	warning: PromptLength;
	error: PromptLength;
};
