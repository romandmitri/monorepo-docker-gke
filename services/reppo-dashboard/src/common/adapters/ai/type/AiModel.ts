import {badgeVariants} from "@/src/common/components/shadcn/badge.tsx";
import {GatewayModelId} from "@ai-sdk/gateway";
import {VariantProps} from "class-variance-authority";

// Check the latest list here!
// https://openrouter.ai/models
// https://vercel.com/ai-gateway/models

export type AiModel = GatewayModelId;

export type AiModelInfo = {
	model: AiModel;
	badgeVariant?: VariantProps<typeof badgeVariants>["variant"];
};

const infoMap = new Map<AiModel, AiModelInfo>();
const register = (info: AiModelInfo) => infoMap.set(info.model, info);

// TODO: reidenzon - Register models we want to appear in the dropdown...
const models: GatewayModelId[] = [
	//
	"anthropic/claude-opus-4.7",
	"anthropic/claude-sonnet-4.6",
	"google/gemini-3.5-flash",
	"openai/gpt-5.5",
];

const generateInfo = (model: AiModel): AiModelInfo => {
	return {
		model: model,
		// TODO: reidenzon - Derive properties, ie: icon, variant, etc...
	};
};

models.map((mo) => register(generateInfo(mo)!));

export const getAiModels = (): AiModel[] => {
	return [...infoMap.keys()];
};

export const getAiModelInfo = (model: AiModel | undefined): AiModelInfo => {
	return infoMap.get(model!) ?? generateInfo(model ?? "unknown");
};

export const getAiModelInfos = (): AiModelInfo[] => {
	return [...infoMap.values()];
};
