import { ItemGroup, ItemSeparator } from "@/src/common/components/shadcn/item.tsx";
import { Fragment, ReactNode } from "react";

interface Props {
	children?: ReactNode[];
}

export const ItemSimpleList = (p: Props) => {
	const items = p.children ?? [];
	return (
		<ItemGroup>
			{items.map((item, index) => {
				return (
					<Fragment key={index}>
						{item}
						{index !== items.length - 1 && <ItemSeparator />}
					</Fragment>
				);
			})}
		</ItemGroup>
	);
};
