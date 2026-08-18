// Inline simplified variant of https://elements.ai-sdk.dev/components/voice-selector
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/src/common/components/shadcn/command.tsx";
import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import {
	CircleSmallIcon,
	LucideLoader2,
	MarsIcon,
	MarsStrokeIcon,
	NonBinaryIcon,
	PauseIcon,
	PlayIcon,
	TransgenderIcon,
	VenusAndMarsIcon,
	VenusIcon,
	type LucideIcon,
} from "lucide-react";
import type { ComponentProps, MouseEvent } from "react";

export { Command as VoiceSelectorRoot, CommandList as VoiceSelectorList, CommandEmpty as VoiceSelectorEmpty };

export const VoiceSelectorInput = ({ className, ...props }: ComponentProps<typeof CommandInput>) => (
	<CommandInput className={cn("h-auto py-3.5", className)} {...props} />
);

export const VoiceSelectorItem = ({ className, ...props }: ComponentProps<typeof CommandItem>) => (
	<CommandItem className={cn("px-4 py-2", className)} {...props} />
);

const GENDER_VALUES = ["male", "female", "transgender", "androgyne", "non-binary", "intersex"];
export type VoiceSelectorGenderValue = (typeof GENDER_VALUES)[number];

export const isVoiceSelectorGenderValue = (value: string): value is VoiceSelectorGenderValue => (GENDER_VALUES as readonly string[]).includes(value);

const GENDER_ICONS: Record<VoiceSelectorGenderValue, LucideIcon> = {
	male: MarsIcon,
	female: VenusIcon,
	transgender: TransgenderIcon,
	androgyne: MarsStrokeIcon,
	"non-binary": NonBinaryIcon,
	intersex: VenusAndMarsIcon,
};

export const VoiceSelectorGender = ({ className, value, children, ...props }: ComponentProps<"span"> & { value?: VoiceSelectorGenderValue }) => {
	const Icon = value ? GENDER_ICONS[value] : CircleSmallIcon;
	return (
		<span className={cn("text-muted-foreground text-xs", className)} {...props}>
			{children ?? <Icon className="size-4" />}
		</span>
	);
};

const ACCENT_EMOJI = {
	american: "🇺🇸",
	british: "🇬🇧",
	australian: "🇦🇺",
	canadian: "🇨🇦",
	irish: "🇮🇪",
	scottish: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	indian: "🇮🇳",
	"south-african": "🇿🇦",
	"new-zealand": "🇳🇿",
	spanish: "🇪🇸",
	french: "🇫🇷",
	german: "🇩🇪",
	italian: "🇮🇹",
	portuguese: "🇵🇹",
	brazilian: "🇧🇷",
	mexican: "🇲🇽",
	argentinian: "🇦🇷",
	japanese: "🇯🇵",
	chinese: "🇨🇳",
	korean: "🇰🇷",
	russian: "🇷🇺",
	arabic: "🇸🇦",
	dutch: "🇳🇱",
	swedish: "🇸🇪",
	norwegian: "🇳🇴",
	danish: "🇩🇰",
	finnish: "🇫🇮",
	polish: "🇵🇱",
	turkish: "🇹🇷",
	greek: "🇬🇷",
} as const satisfies Record<string, string>;

export type VoiceSelectorAccentValue = keyof typeof ACCENT_EMOJI;

export const isVoiceSelectorAccentValue = (value: string): value is VoiceSelectorAccentValue => value in ACCENT_EMOJI;

export const VoiceSelectorAccent = ({ className, value, children, ...props }: ComponentProps<"span"> & { value?: VoiceSelectorAccentValue }) => (
	<span className={cn("text-muted-foreground text-xs", className)} {...props}>
		{children ?? (value ? ACCENT_EMOJI[value] : undefined)}
	</span>
);

export const VoiceSelectorName = ({ className, ...props }: ComponentProps<"span">) => (
	<span className={cn("min-w-0 flex-1 truncate text-left font-medium", className)} {...props} />
);

export const VoiceSelectorAttributes = ({ className, ...props }: ComponentProps<"div">) => (
	<div className={cn("flex items-center gap-1 text-xs", className)} {...props} />
);

export const VoiceSelectorBullet = ({ className, ...props }: ComponentProps<"span">) => (
	<span aria-hidden="true" className={cn("text-border select-none", className)} {...props}>
		&bull;
	</span>
);

export type VoiceSelectorPreviewProps = Omit<ComponentProps<"button">, "children"> & {
	playing?: boolean;
	loading?: boolean;
	onPlay?: () => void;
};

export const VoiceSelectorPreview = ({ className, playing, loading, onPlay, onClick, ...props }: VoiceSelectorPreviewProps) => {
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onClick?.(event);
		onPlay?.();
	};

	const Icon = loading ? LucideLoader2 : playing ? PauseIcon : PlayIcon;

	return (
		<Button
			aria-label={playing ? "Pause preview" : "Play preview"}
			className={cn("size-6 shrink-0", className)}
			disabled={loading}
			onClick={handleClick}
			size="icon-sm"
			type="button"
			variant="outline"
			{...props}
		>
			<Icon className={cn("size-3", loading && "animate-spin")} />
		</Button>
	);
};
