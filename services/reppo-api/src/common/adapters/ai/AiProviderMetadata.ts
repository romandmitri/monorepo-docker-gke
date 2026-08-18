import { AiCostAmount } from "@/src/common/adapters/ai/cost/AiCostAmount.js";

export interface AiProviderMetadata {
	gateway: AiProviderMetadata_Gateway;
}

export interface AiProviderMetadata_Gateway {
	cost: AiCostAmount;
	inputInferenceCost: AiCostAmount;
	outputInferenceCost: AiCostAmount;
}
