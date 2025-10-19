import * as React from "react";

import ContentLayout from "@/components/dashboard/ContentLayout";
import { columns } from "./columns";
import { DataTable } from "@/components/re-usable/data-table";
import PageHeader from "@/components/re-usable/page-header";
import { getCategories } from "@/queries/categories";
import { TableLoader } from "@/components/re-usable/TableLoader";

export async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <ContentLayout title="Categories">
      <div className="container max-w-5xl mx-auto ">
        <PageHeader
          title="Categories"
          subtitle="Manage all your categories"
          linkTitle="Add New Category"
          link="/dashboard/categories/new"
        />
        <DataTable columns={columns} data={categories} />
      </div>
    </ContentLayout>
  );
}

export default function page() {
  return (
    <React.Suspense fallback={<TableLoader title="Categories" />}>
      <CategoriesPage />
    </React.Suspense>
  );
}
