import { AiModelIndicator } from "@/src/common/adapters/ai/components/AiModelIndicator.tsx";
import { AiModel, getAiModels } from "@/src/common/adapters/ai/type/AiModel.ts";
import { RetellModel } from "@/src/common/adapters/retell/generic/type/RetellModel.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/src/common/components/shadcn/select.tsx";

interface Props {
	isDisabled?: boolean;
	value?: AiModel;
	onChange?: (v: AiModel) => void;
}

export const AiModelSelect = (p: Props) => {
	const model = p.value;
	const models = getAiModels();
	return (
		<Select
			//
			value={model}
			onValueChange={(v: RetellModel) => p.onChange?.(v)}
		>
			<SelectTrigger disabled={p.isDisabled}>
				<AiModelIndicator model={model} />
				<div></div>
			</SelectTrigger>
			<SelectContent>
				{models.map((model) => {
					return (
						<SelectItem value={model} key={model}>
							<AiModelIndicator model={model} />
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};
