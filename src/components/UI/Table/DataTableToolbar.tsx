"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./DataTableViewOptions";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../Button";
import { Input } from "../Input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnKey?: string;
  placeholder?: string;
}

export function DataTableToolbar<TData>({
  table,
  columnKey = "name",
  placeholder = "Search names...",
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(columnKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}