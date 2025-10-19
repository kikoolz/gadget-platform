import React from "react";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/queries/products";
import { getCategoryBySlug } from "@/queries/categories";
import { ProductCard } from "@/components/shop/ProductCard";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Get category info and products
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {category.name}
          </h1>
          <p className="text-slate-600">
            Browse all products in the {category.name} category
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-600">
              There are currently no products in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
