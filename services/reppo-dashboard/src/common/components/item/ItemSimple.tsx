import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/src/common/components/shadcn/item.tsx";
import { ReactNode } from "react";

interface Props {
	title?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
}

export const ItemSimple = (p: Props) => {
	return (
		<Item>
			<ItemContent>
				<ItemTitle>{p.title}</ItemTitle>
				<ItemDescription>{p.description}</ItemDescription>
			</ItemContent>
			<ItemActions>{p.actions}</ItemActions>
		</Item>
	);
};
