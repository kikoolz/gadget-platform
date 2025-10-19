"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { NewArrivalsProduct } from "@/types/products.schema";

interface TrendingProductsProps {
  products: NewArrivalsProduct[];
}

const categories = ["All", "Mobile", "Watch", "Camera", "Accessories", "Speaker"];

export default function TrendingProducts({ products }: TrendingProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter products by category if not "All"
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(() => {
        // You might need to add category information to your product data
        // For now, we'll show all products regardless of category
        return true;
      });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Trending Products
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-8 rounded p-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 text-sm font-medium transition-all ${
              activeCategory === category
                ? "border-b-2 border-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
   <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}