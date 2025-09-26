"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: "Hot" | "New";
  inStock: number;
}

const productData: Record<string, Product[]> = {
  Mobile: [
    {
      id: "1",
      name: "Galaxy Note20 Ultra 5G",
      price: 2700,
      rating: 4.5,
      image: "/samsung-galaxy-note20-ultra-black-smartphone.jpg",
      inStock: 5,
    },
    {
      id: "2",
      name: "iPad 10th Generation",
      price: 1900,
      originalPrice: 2100,
      rating: 4.8,
      image: "/ipad-10th-generation-pink-tablet.jpg",
      badge: "Hot",
      inStock: 3,
    },
    {
      id: "3",
      name: "Galaxy Note20 Ultra 5G",
      price: 2700,
      rating: 4.6,
      image: "/samsung-galaxy-note20-ultra-green-smartphone.jpg",
      badge: "New",
      inStock: 8,
    },
    {
      id: "4",
      name: "Samsung S21 Ultra",
      price: 2500,
      rating: 4.7,
      image: "/samsung-galaxy-s21-ultra-blue-smartphone.jpg",
      inStock: 6,
    },
    {
      id: "5",
      name: "Samsung Galaxy Note 20",
      price: 2300,
      rating: 4.4,
      image: "/samsung-galaxy-note-20-purple-smartphone.jpg",
      inStock: 4,
    },
    {
      id: "6",
      name: "Sony Xperia 1 III",
      price: 2700,
      originalPrice: 2900,
      rating: 4.3,
      image: "/sony-xperia-tablet-blue-device.jpg",
      badge: "Hot",
      inStock: 7,
    },
    {
      id: "7",
      name: "iPhone 12 Pro Max",
      price: 1270,
      rating: 4.9,
      image: "/iphone-12-pro-max-green-smartphone.jpg",
      badge: "New",
      inStock: 2,
    },
    {
      id: "8",
      name: "Galaxy Note20 Ultra 5G",
      price: 940,
      rating: 4.5,
      image: "/samsung-galaxy-note20-ultra-black-folded-smartphon.jpg",
      inStock: 9,
    },
    {
      id: "9",
      name: "Samsung Galaxy S21 5G",
      price: 700,
      rating: 4.6,
      image: "/samsung-galaxy-s21-purple-smartphone.jpg",
      badge: "New",
      inStock: 3,
    },
    {
      id: "10",
      name: "Galaxy Note20 Ultra 5G",
      price: 680,
      rating: 4.4,
      image: "/samsung-galaxy-note20-ultra-rose-gold-smartphone.jpg",
      inStock: 5,
    },
  ],
  Watch: [
    {
      id: "11",
      name: "Apple Watch Series 8",
      price: 399,
      rating: 4.7,
      image: "/apple-watch-series-8-black-smartwatch.jpg",
      badge: "New",
      inStock: 12,
    },
    {
      id: "12",
      name: "Samsung Galaxy Watch 5",
      price: 329,
      originalPrice: 379,
      rating: 4.5,
      image: "/samsung-galaxy-watch-5-silver-smartwatch.jpg",
      badge: "Hot",
      inStock: 8,
    },
    {
      id: "13",
      name: "Garmin Forerunner 955",
      price: 499,
      rating: 4.8,
      image: "/garmin-forerunner-955-black-sports-watch.jpg",
      inStock: 6,
    },
    {
      id: "14",
      name: "Fitbit Versa 4",
      price: 199,
      rating: 4.3,
      image: "/fitbit-versa-4-pink-fitness-watch.jpg",
      inStock: 15,
    },
  ],
  Camera: [
    {
      id: "15",
      name: "Canon EOS R5",
      price: 3899,
      rating: 4.9,
      image: "/canon-eos-r5-mirrorless-camera-black.jpg",
      badge: "Hot",
      inStock: 3,
    },
    {
      id: "16",
      name: "Sony Alpha A7 IV",
      price: 2499,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
      inStock: 5,
    },
    {
      id: "17",
      name: "Nikon Z9",
      price: 5499,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 2,
    },
    {
      id: "18",
      name: "Fujifilm X-T5",
      price: 1699,
      originalPrice: 1899,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 7,
    },
  ],
  Accessories: [
    {
      id: "19",
      name: "AirPods Pro 2nd Gen",
      price: 249,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Hot",
      inStock: 20,
    },
    {
      id: "20",
      name: "MagSafe Charger",
      price: 39,
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 25,
    },
    {
      id: "21",
      name: "USB-C Hub",
      price: 79,
      originalPrice: 99,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
      inStock: 18,
    },
    {
      id: "22",
      name: "Wireless Mouse",
      price: 59,
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 30,
    },
  ],
  Speaker: [
    {
      id: "23",
      name: "HomePod mini",
      price: 99,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
      badge: "New",
      inStock: 14,
    },
    {
      id: "24",
      name: "Sonos One",
      price: 219,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Hot",
      inStock: 8,
    },
    {
      id: "25",
      name: "JBL Charge 5",
      price: 179,
      originalPrice: 199,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 12,
    },
    {
      id: "26",
      name: "Bose SoundLink",
      price: 149,
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=200",
      inStock: 16,
    },
  ],
};

const categories = ["Mobile", "Watch", "Camera", "Accessories", "Speaker"];

export default function TrendingProducts() {
  const [activeCategory, setActiveCategory] = useState("Mobile");

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Trending Products
      </h1>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-8  rounded p-1">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {productData[activeCategory]?.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow duration-200 bg-white border-gray-200"
          >
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  ★ In Stock {product.inStock} Items
                </p>
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500 ml-1">★★★★★</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white text-sm py-2 mt-3"
                  size="sm"
                >
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
