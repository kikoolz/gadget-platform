import React from "react";

import ContentLayout from "@/components/dashboard/ContentLayout";
import { DataTable } from "@/components/re-usable/data-table";
import PageHeader from "@/components/re-usable/page-header";
import { TableLoader } from "@/components/re-usable/TableLoader";
import { getProducts } from "@/queries/products";
import { columns } from "./columns";

async function ProductsPage() {
  const products = await getProducts();
  return (
    <ContentLayout title="Products">
      <div className="container max-w-5xl mx-auto ">
        <PageHeader
          title="Products"
          subtitle="Manage all your products"
          linkTitle="Add New Product"
          link="/dashboard/products/new"
        />
        <DataTable columns={columns} data={products} />
      </div>
    </ContentLayout>
  );
}

export default function page() {
  return (
    <React.Suspense fallback={<TableLoader title="Products" />}>
      <ProductsPage />
    </React.Suspense>
  );
}
