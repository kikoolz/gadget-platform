"use client";

import * as React from "react";

import ContentLayout from "@/components/dashboard/ContentLayout";
import { TableCategory } from "@/types/categories.schema";
import { columns } from "./columns";
import { DataTable } from "@/components/re-usable/data-table";
import PageHeader from "@/components/re-usable/page-header";

const data: TableCategory[] = [
  {
    id: "m5gr84i9",
    name: "Electronics",
    slug: "electronics",
    productsCount: 10,
    createdAt: "2023-10-01",
  },
  {
    id: "3u1reuv4",
    name: "Fashion",
    slug: "fashion",
    productsCount: 5,
    createdAt: "2023-09-15",
  },
];

export default function CategoriesPage() {
  return (
    <ContentLayout title="Categories">
      <div className="container max-w-5xl mx-auto ">
        <PageHeader
          title="Categories"
          subtitle="Manage all your categories"
          linkTitle="Add New Category"
          link="dashboard/categories/new"
        />
        <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  );
}
