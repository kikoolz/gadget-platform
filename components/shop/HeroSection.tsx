import React from "react";
import HomeCarousel from "./HomeCarousel";
import { getHeroCarouselProducts } from "@/queries/products";

export function LoadingHero() {
  return (
    <div className="p-4">
      <h2>Loading Hero Products....</h2>
    </div>
  );
}
export default async function HeroSection() {
  const products = await getHeroCarouselProducts();
  return (
    <div className=" p-4    mx-auto">
      <HomeCarousel products={products} />
    </div>
  );
}