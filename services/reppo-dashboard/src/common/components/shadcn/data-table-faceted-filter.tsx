import { cn } from "@/src/common/components/shadcn/_/cn.ts";
import { Badge } from "@/src/common/components/shadcn/badge.tsx";
import { Button } from "@/src/common/components/shadcn/button.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/src/common/components/shadcn/command.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/common/components/shadcn/popover.tsx";
import { Separator } from "@/src/common/components/shadcn/separator.tsx";
import { consoleLog } from "@/src/common/utility/log/Log.ts";
import { SelectOption, SelectOptionValue } from "@/src/common/utility/option/SelectOption.tsx";
import { Check, PlusCircle } from "lucide-react";
import * as React from "react";

/**
 * TODO: reidenzon - REMEMBER
 * This has been reworked from original example to exclude [column]
 * dependency and expect other relevant properties instead.
 *
 * Original:
 * https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(app)/examples/tasks/components/data-table-faceted-filter.tsx
 */

interface Props<Value extends SelectOptionValue> {
	onSelected: (values: Value[]) => void;
	options: SelectOption<Value>[];
	title: string;
}

/** @deprecated TODO: reidenzon - Use multi-select.tsx instead! */
export function DataTableFacetedFilter<Value extends SelectOptionValue>(p: Props<Value>) {
	consoleLog("DataTableFacetedFilter", p.title, p.options);

	const title = p.title;
	const options = p.options;
	const optionsSelected = p.options.filter((o) => o.isSelected);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<PlusCircle />
					{title}
					{optionsSelected.length > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
								{optionsSelected.length}
							</Badge>
							<div className="hidden gap-1 lg:flex">
								{optionsSelected.length > 2 ? (
									<Badge variant="secondary" className="rounded-sm px-1 font-normal">
										{optionsSelected.length} selected
									</Badge>
								) : (
									optionsSelected.map((option) => (
										<Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
											{option.content}
										</Badge>
									))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = option.isSelected;
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											// consoleLog("DataTableFacetedFilter.CommandItem.onSelect", isSelected, option)
											const values = new Set(optionsSelected.map((o) => o.value));
											if (isSelected) values.delete(option.value);
											if (!isSelected) values.add(option.value);
											// consoleLog("DataTableFacetedFilter.CommandItem.onSelect.VALUES", values, [...values.values()])
											p.onSelected([...values.values()]);
										}}
									>
										<div
											className={cn(
												"flex size-4 items-center justify-center rounded-[4px] border",
												isSelected ? "bg-primary border-primary text-primary-foreground" : "border-input [&_svg]:invisible",
											)}
										>
											<Check className="text-primary-foreground size-3.5" />
										</div>
										{option.icon && <option.icon className="text-muted-foreground size-4" />}
										<span>{option.content}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{optionsSelected.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem onSelect={() => p.onSelected([])} className="justify-center text-center">
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
