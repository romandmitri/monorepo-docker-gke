import { Label } from "@/src/common/components/shadcn/label.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/common/components/shadcn/table.tsx";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, HeaderContext, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useState } from "react"; // https://ui.shadcn.com/docs/components/data-table

// https://ui.shadcn.com/docs/components/data-table
// https://ui.shadcn.com/examples/tasks
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(app)/examples/tasks/components/data-table.tsx

interface Props<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
}

export function DataTable<TData, TValue>(p: Props<TData, TValue>) {
	const [] = useState<VisibilityState>();
	const [] = useState<ColumnFiltersState>();
	const [] = useState<SortingState>();

	const table = useReactTable({
		columns: p.columns,
		data: p.data,
		getCoreRowModel: getCoreRowModel(),
	});

	const rows = table.getRowModel().rows;

	const isLoading = p.isLoading ?? false;
	const isRows = Boolean(rows?.length);
	const isEmpty = !isRows && !isLoading;

	return (
		<div className="overflow-hidden rounded-md border">
			<Table className={"block table-auto md:table"}>
				<TableHeader className={"hidden md:table-header-group"}>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className={"block md:table-row"}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className={"block md:table-cell"}
										style={
											{
												// TODO: reidenzon - Implement when ready, but using [table-auto] for now!
												// maxWidth: `${header.getSize()}px`,
												// minWidth: `${header.getSize()}px`,
												// width: `${header.getSize()}px`,
											}
										}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className={"block md:table-row-group"}>
					{isRows &&
						rows.map((row) => (
							<TableRow key={row.id} className={"block md:table-row"} data-state={row.getIsSelected() && "selected"}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={"block align-top md:table-cell"}
										// data-label={cell.column.columnDef.header}
										style={
											{
												// TODO: reidenzon - Implement when ready, but using [table-auto] for now!
												// maxWidth: `${cell.column.getSize()}px`,
												// minWidth: `${cell.column.getSize()}px`,
												// width: `${cell.column.getSize()}px`,
											}
										}
									>
										<Label className={"mb-2 block md:hidden"}>
											{flexRender(cell.column.columnDef.header, {} as HeaderContext<any, any>)}
										</Label>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					{(isLoading || isEmpty) && (
						<TableRow>
							<TableCell colSpan={p.columns.length} className="h-24 text-center">
								{isLoading && "Loading..."}
								{isEmpty && "No results."}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
