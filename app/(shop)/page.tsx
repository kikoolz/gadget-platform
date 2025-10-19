import FeaturedProducts from "@/components/shop/FeaturedProducts";
import HeroSection from "@/components/shop/HeroSection";
import NewArrivals from "@/components/shop/NewArrivals";
import TrendingProducts from "@/components/shop/TrendingProducts";
import { getTrendingProducts } from "@/queries/products";
import React from "react";

export default async function page() {
  const trendingProducts = await getTrendingProducts();

  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <TrendingProducts products={trendingProducts} />
      <NewArrivals />
    </div>
  );
}
