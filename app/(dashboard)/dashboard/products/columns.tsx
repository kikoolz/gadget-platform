"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { convertIsoToDateString } from "@/lib/IsoDateToString";
import { TableProduct } from "@/types/products.schema";
import Image from "next/image";

export const columns: ColumnDef<TableProduct>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">
        <Image
          src={row.getValue("image")}
          alt=""
          width={200}
          height={200}
          className="w-24 h-24 rounded-2xl"
        />
      </div>
    ),
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("category")}</div>,
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const date = new Date().toISOString();
      const displayDate = convertIsoToDateString(date);

      return <div className="text-right font-medium">{displayDate}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
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
