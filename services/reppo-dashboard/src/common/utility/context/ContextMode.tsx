import { badgeVariants } from "@/src/common/components/shadcn/badge.tsx";
import { SelectOption } from "@/src/common/utility/option/SelectOption.tsx";
import type { VariantProps } from "class-variance-authority";

export enum ContextMode {
	Api = "api",
	Cli = "cli",
	Cron = "cron",
	Sub = "sub",
	Test = "test",

	Unknown = "unknown",
}

export type ContextModeInfo = {
	type: ContextMode;
	name: string;
	badgeVariant?: VariantProps<typeof badgeVariants>["variant"];
};

const infoMap = new Map<ContextMode, ContextModeInfo>();
const register = (info: ContextModeInfo) => infoMap.set(info.type, info);

register({ type: ContextMode.Api, name: "API", badgeVariant: "secondary" });
register({ type: ContextMode.Cli, name: "CLI", badgeVariant: "developer" });
register({ type: ContextMode.Cron, name: "cron", badgeVariant: "outline-developer" });
register({ type: ContextMode.Sub, name: "sub", badgeVariant: "outline-developer" });
register({ type: ContextMode.Test, name: "Test", badgeVariant: "outline-warning" });
register({ type: ContextMode.Unknown, name: "Unknown", badgeVariant: "destructive" });

export const getContextModeInfo = (mode: ContextMode): ContextModeInfo => infoMap.get(mode) ?? infoMap.get(ContextMode.Unknown)!;

export const useContextModeSelectOptions = (selected: ContextMode[]): SelectOption<ContextMode>[] => {
	return [...infoMap.values()].map((info): SelectOption<ContextMode> => {
		return {
			content: info.name,
			value: info.type,
			// icon: info.icon,
			isSelected: selected.includes(info.type),
		};
	});
};
