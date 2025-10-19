import ShopHeader from "@/components/shop/ShopHeader";
import { getNavCategories } from "@/queries/categories";
import React from "react";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = (await getNavCategories()) || [];
  return (
    <div>
      <ShopHeader categories={categories} />
      {children}
    </div>
  );
}
