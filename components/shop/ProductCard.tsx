"use client";

import type React from "react";

import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NewArrivalsProduct } from "@/types/products.schema";

interface Product {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  link: string;
}

export function ProductCard({ product }: { product: NewArrivalsProduct }) {
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden   ">
      {/* Product Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full"
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover transition-transform  w-full h-auto "
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {product.discountPercentage.toFixed(2)}% off
          </div>
        )}

        {/* Mobile Add to Cart Icon Button */}
        <button
          onClick={handleAddToCart}
          className="md:hidden absolute bottom-3 right-3 w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="text-xs md:text-sm font-medium text-slate-900 line-clamp-2 hover:text-slate-700 transition-colors leading-relaxed">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm md:text-lg font-semibold text-blue-600">
              UGX {formatPrice(product.discountPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Add to Cart Button */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={handleAddToCart}
            className="hidden md:flex w-full bg-[#204462] text-white py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-lg  items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            onClick={handleAddToCart}
            className="hidden md:flex w-full bg-white  text-black border border-gray-300 py-2 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 hover:shadow-lg  items-center justify-center gap-2"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
