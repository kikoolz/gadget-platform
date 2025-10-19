import { ProductType } from "@/types/products.schema";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function HorizontalProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <div className="border border-gray-200 shadow p-3 rounded-xl flex items-center gap-4 justify-between">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="object-contain w-32"
      />
      <div className="">
        <p className="pt-2 text-blue-600 text-xs">
          In stock {product.stock} items
        </p>
        <h2 className="text-base py-1 font-semibold">{product.name}</h2>
        <p>${product.originalPrice}</p>
        <div className="py-2">
          <Button className="w-full">Order Now</Button>
        </div>
      </div>
    </div>
  );
}
