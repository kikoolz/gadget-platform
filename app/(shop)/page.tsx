import FeaturedProducts from "@/components/shop/FeaturedProducts";
import HeroSection from "@/components/shop/HeroSection";
import NewArrivals from "@/components/shop/NewArrivals";
import TrendingProducts from "@/components/shop/TrendingProducts";
import React from "react";

export default function page() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <TrendingProducts />
      <NewArrivals />
    </div>
  );
}
