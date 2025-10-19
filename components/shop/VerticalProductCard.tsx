import { ProductType } from "@/types/products.schema";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function VerticalProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <div className="border border-gray-200 shadow p-3 rounded-xl">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="object-contain w-full"
      />
      <p className="pt-2 text-blue-600 text-sm">
        In stock {product.stock} items
      </p>
      <h2 className="text-xl py-1 font-semibold">{product.name}</h2>
      <p>${product.originalPrice}</p>
      <div className="py-2">
        <Button className="w-full">Order Now</Button>
      </div>
    </div>
  );
}
