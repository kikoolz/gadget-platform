"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TableCategory } from "@/types/categories.schema";
import { convertIsoToDateString } from "@/lib/IsoDateToString";
export const columns: ColumnDef<TableCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "productsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Count
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("productsCount")}</div>,
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const displayDate = convertIsoToDateString(date);

      return <div className="text-right font-medium">{displayDate}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: () => {
      // const categoryId = row.getValue("id") as string; // Will be used for edit/delete actions
      return (
        <div className="flex items-center justify-end gap-4">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Pencil />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
