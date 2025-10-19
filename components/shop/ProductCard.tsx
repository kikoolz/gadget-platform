"use client";

import type React from "react";

import { useState } from "react";
import { Heart, ShoppingCart, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NewArrivalsProduct } from "@/types/products.schema";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: NewArrivalsProduct }) {
  const { state, addToCart, removeFromCart, updateQuantity } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if product is in cart and get quantity
  const cartItem = state.items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      originalPrice: product.price,
      discountPrice: product.discountPrice,
      stock: 10, // You might want to get this from the product data
    });
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartQuantity + 1);
    }
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* IMAGE SECTION */}
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square bg-gray-100 p-2">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* WISHLIST BUTTON */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* CART BUTTON - Shows different UI based on cart state */}
        {!isInCart ? (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-4 h-4 text-gray-600" />
          </button>
        ) : (
          <div className="absolute bottom-2 right-2 bg-blue-500 rounded-lg overflow-hidden flex items-center">
            {/* DELETE BUTTON */}
            <button
              onClick={handleRemoveFromCart}
              className="w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>

            {/* QUANTITY DISPLAY */}
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500">
              <span className="text-white text-sm font-medium">
                {cartQuantity}
              </span>
            </div>

            {/* INCREASE BUTTON */}
            <button
              onClick={handleIncreaseQuantity}
              className="w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="p-4 space-y-3">
          {/* PRODUCT NAME */}
          <div>
            <h3 className="font-medium text-gray-900 text-sm leading-tight">
              {product.name}
            </h3>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm font-medium text-gray-900 ml-1">4.3</span>
            </div>
            <span className="text-xs text-gray-500">(18)</span>
          </div>

          {/* PRICING */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              UGX {formatPrice(product.discountPrice)}
            </span>
            {product.price && product.price > product.discountPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  UGX {formatPrice(product.price)}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md font-medium">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100
                  )}
                  %
                </span>
              </>
            )}
          </div>

          {/* MARKET LABEL */}
          <div className="flex items-center gap-1">
            <div className="bg-green-50 border border-green-200 rounded-full px-2 py-1 flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-green-700 text-xs font-medium">market</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
