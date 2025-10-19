import type React from "react";

import ProductCard from "./ProductCard";
import Link from "next/link";
import Image from "next/image";

import { getNewArrivals } from "@/queries/products";

interface Product {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  link: string;
}

export default async function NewArrivals() {
  const products = await getNewArrivals();

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">
            New Arrivals
          </h2>
          <Link
            href={"/products"}
            className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium tracking-wide"
          >
            See more
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
