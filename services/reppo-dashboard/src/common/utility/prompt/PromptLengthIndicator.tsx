import { Badge, BadgeVariant } from "@/src/common/components/shadcn/badge.tsx";
import { Prompt } from "@/src/common/utility/prompt/Prompt.ts";
import { getPromptLength, PromptLengthLimits } from "@/src/common/utility/prompt/PromptLength.ts";

const format = new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format;

interface Props {
	prompt: Prompt | undefined;
	isCharacter?: boolean;
	isToken?: boolean;
	limits?: PromptLengthLimits;
}

export const PromptLengthIndicator = (p: Props) => {
	const isCharacter = p.isCharacter ?? false;
	const isToken = p.isToken ?? true;

	const charLength = p.prompt?.length ?? 0;
	const tokenLength = getPromptLength(charLength);

	const data: string[] = [];
	if (isCharacter) data.push(`${format(charLength)} ch`);
	if (isToken) data.push(`~${format(tokenLength)}`);

	let tooltip = `This prompt has <b>${format(charLength)}</b> characters (<b>~${format(tokenLength)}</b> tokens).`;
	let variant: BadgeVariant = "outline-positive";
	if (p.limits) {
		if (tokenLength >= p.limits.error) {
			variant = "outline-destructive";
			tooltip += ".. which is expensive and unpredictable!";
		} else if (tokenLength >= p.limits.warning) {
			variant = "outline-warning";
			tooltip += ".. and that is a bit long!";
		} else {
			tooltip += ".. and that is ok!";
		}
	}

	if (data.length === 0) return null;

	return (
		<Badge tooltipHtml={tooltip} variant={variant}>
			{data.join(" ")}
		</Badge>
	);
};
