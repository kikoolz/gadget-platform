"use client";

import { useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronRight,
  ArrowLeft,
  Star,
  Shield,
  Plus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

export type ProductDetailProps = {
  product: {
    id: string;
    title: string;
    images: string[];
    merchantSku: string;
    sku: string;
    currentPrice: number;
    originalPrice?: number;
    discountPercentage?: number;
    description: string;
    specifications: { [key: string]: string };
    seller: {
      name: string;
      rating: number;
      link: string;
    };
    returnPolicy: string;
    inStock: boolean;
    slug: string;
    stock: number;
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, updateQuantity, state } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      slug: product.slug,
      image: product.images[0],
      originalPrice: product.originalPrice || product.currentPrice,
      discountPrice: product.currentPrice,
      stock: product.stock,
    });
  };

  const handleUpdateQuantity = (increment: boolean) => {
    const cartItem = state.items.find((item) => item.id === product.id);
    if (cartItem) {
      const newQuantity = Math.max(1, cartItem.quantity + (increment ? 1 : -1));
      updateQuantity(product.id, newQuantity);
    } else {
      // If item not in cart, add it first
      addToCart({
        id: product.id,
        name: product.title,
        slug: product.slug,
        image: product.images[0],
        originalPrice: product.originalPrice || product.currentPrice,
        discountPrice: product.currentPrice,
        stock: product.stock,
      });
    }
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} x ${product.title}`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this product: ${product.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Dynamic breadcrumbs based on product data
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    {
      name: product.specifications.Category || "Products",
      href: `/category/${product.slug}`,
    },
    { name: product.title, href: `/products/${product.slug}` },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="hidden lg:block bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.name}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Back Button */}
      <div className="lg:hidden bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="aspect-square relative bg-slate-50 p-8">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-slate-900"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide mb-4">
                {product.title}
              </h1>

              {/* SKU Info */}
              <div className="space-y-2 mb-6">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Merchant SKU:</span>{" "}
                  {product.merchantSku}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <span className="text-3xl font-semibold text-blue-600">
                  {formatPrice(product.currentPrice)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-slate-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    {product.discountPercentage && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                        {product.discountPercentage}% off
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-slate-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => handleUpdateQuantity(false)}
                    className="px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-slate-300 min-w-[60px] text-center">
                    {state.items.find((item) => item.id === product.id)
                      ?.quantity || quantity}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(true)}
                    className="px-3 py-2 hover:bg-slate-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={handleBuyNow}
                  className="bg-slate-800 hover:bg-slate-900 text-white py-2 px-6 rounded-xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  BUY NOW
                </button>
                <button
                  onClick={handleAddToCart}
                  className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white py-2 px-6 rounded-xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleWishlist}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Seller Info Sidebar */}
            <div className=" space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-medium text-slate-900 mb-4">
                  Seller Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {product.seller.name}
                    </h4>
                  </div>
                  <Link
                    href={product.seller.link}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    MORE FROM THIS SELLER
                  </Link>
                </div>
              </div>
            </div>
            {/* Features */}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-medium text-sm tracking-wide transition-colors border-b-2 ${
                  activeTab === "description"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("specification")}
                className={`px-6 py-4 font-medium text-sm tracking-wide transition-colors border-b-2 ${
                  activeTab === "specification"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                SPECIFICATION
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specification" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-slate-100"
                  >
                    <span className="font-medium text-slate-900">{key}:</span>
                    <span className="text-slate-600">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Fixed Mobile Action Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <button
            onClick={handleAddToCart}
            className="border-2 border-slate-800 text-slate-800 py-3 px-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-slate-800 text-white py-3 px-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            BUY NOW
          </button>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
}
