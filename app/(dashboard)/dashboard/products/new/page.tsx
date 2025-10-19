import React from "react";
import ProductForm from "./ProductForm";
import { getCategories } from "@/queries/categories";

export default async function page() {

    const categories = await  getCategories();

  return (
    <div>
      <ProductForm categories={categories} />
    </div>
  );
}
