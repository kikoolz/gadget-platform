import { getProducts } from "@/queries/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function FeaturedProducts() {
  const products = (await getProducts()) || [];
  console.log("SLICED PRODUCTS", products.slice(0, 3));
  return (
    <div className="container p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {products.slice(0, 3).map((product) => {
        return (
          <div
            key={product.id}
            className="p-3 rounded-2xl flex items-center justify-between border border-gray-100 shadow "
          >
            <div className="">
              <h2 className="text-xl md:text-2xl font-semibold">
                {product.name}
              </h2>
              <Link href={`/products/${product.slug}`}>Shop Now</Link>
            </div>
            <Image
              src={product.image}
              alt={product.name}
              className="w-36 h-auto"
              width={500}
              height={500}
            />
          </div>
        );
      })}
    </div>
  );
}
