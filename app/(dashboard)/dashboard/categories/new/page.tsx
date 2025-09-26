import ContentLayout from "@/components/dashboard/ContentLayout";
import React from "react";
import CategoryForm from "./category-form";

export default function page() {
  return (
    <ContentLayout title="New Category">
      <div className="container max-w-2xl mx-auto">
        <CategoryForm />
      </div>
    </ContentLayout>
  );
}
