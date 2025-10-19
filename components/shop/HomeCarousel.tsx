"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselProduct } from "@/types/products.schema";

export default function HomeCarousel({
  products,
}: {
  products: CarouselProduct[];
}) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const slideCount: number = products.length;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 8000;
  const animationDuration = 700;

  const goToSlide = useCallback(
    (index: number): void => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), animationDuration);
    },
    [isAnimating]
  );

  const goToPrevSlide = useCallback((): void => {
    const newIndex = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide, slideCount]);

  const goToNextSlide = useCallback((): void => {
    const newIndex = (currentSlide + 1) % slideCount;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide, slideCount]);

  useEffect(() => {
    setProgress(0);

    if (progressRef.current) {
      clearInterval(progressRef.current);
    }

    if (!isHovering) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / (slideDuration / 100);
        });
      }, 100);

      progressRef.current = interval;
    }

    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [currentSlide, isHovering, slideDuration]);

  useEffect(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    if (!isHovering && !isAnimating) {
      autoPlayRef.current = setTimeout(() => {
        goToNextSlide();
      }, slideDuration);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAnimating, isHovering, goToNextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden h-screen max-h-[600px] min-h-[500px] rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Full-width image carousel */}
      <div className="absolute inset-0 w-full h-full">
        {products.map((slide, index) => {
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 z-10 transform scale-100"
                  : "opacity-0 z-0 transform scale-105"
              }`}
            >
              {/* Full-width background image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt={`${slide.name}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={index === 0}
                />

                {/* Enhanced gradient overlay for better text readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-[2px]`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={goToPrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/60 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white text-gray-800 p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/60 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Enhanced slide indicators with progress */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-4">
        <div className="bg-black/20 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-white/20 flex items-center gap-4">
          {/* Slide counter */}
          <div className="text-white font-medium text-sm">
            <span className="text-base font-bold">{currentSlide + 1}</span>
            <span className="mx-1">/</span>
            <span>{slideCount}</span>
          </div>

          {/* Slide indicators */}
          <div className="flex space-x-3">
            {products.map((_: CarouselProduct, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  currentSlide === index
                    ? "bg-blue-600 w-8"
                    : "bg-white/50 hover:bg-white/80 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? "true" : "false"}
                type="button"
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
