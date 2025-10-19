"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import VerticalProductCard from "./VerticalProductCard";
import HorizontalProductCard from "./HorizontalProductCard";
import { ProductType } from "@/types/products.schema";

export default function BestDeals({
  title,
  products,
}: {
  products: ProductType[];
  title: string;
}) {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl py-4">{title}</h2>
        <div className="py-4 border-b border-gray-200">
          {products.length === 0 ? (
            <div className="p-8">
              <h2>This Category has No Products</h2>
            </div>
          ) : (
            <div className="py-3 grid grid-cols-2 md:grid-cols-3  gap-4">
              {products.map((product) => {
                return (
                  <HorizontalProductCard key={product.id} product={product} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
