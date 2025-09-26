"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselSlides = [
  {
    title: "Apple HomePod",
    subtitle: "2nd Gen Speaker",
    description:
      "Apple ecosystem and provide high-quality audio playback while also serving as a hub for controlling smart home devices.",
    image: "/white-apple-homepod-speaker.png",
    background: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
  },
  {
    title: "Apple AirPods",
    subtitle: "Pro 2nd Gen",
    description:
      "Experience premium sound quality with active noise cancellation and spatial audio technology.",
    image: "/white-apple-airpods-pro.png",
    background:
      "bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900",
  },
  {
    title: "Apple iPad",
    subtitle: "Air 5th Gen",
    description:
      "Powerful performance meets stunning design in the most capable iPad Air ever.",
    image: "/silver-apple-ipad-air.png",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900",
  },
];

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] sm:h-[600px]">
        {/* Main Carousel - Takes up 2/3 width */}
        <div className="lg:col-span-2 relative overflow-hidden rounded">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselSlides.map((slide, index) => (
              <div
                key={index}
                className={`min-w-full h-full ${slide.background} relative flex items-center justify-between p-6 sm:p-8 md:p-12`}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-32 right-20 w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute top-20 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-32 right-16 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>

                <div className="flex-1 z-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-balance">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
                    {slide.subtitle}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 max-w-md leading-relaxed text-pretty">
                    {slide.description}
                  </p>
                  <Button className="bg-white text-black hover:bg-gray-100 px-6 py-2 sm:px-8 sm:py-3 rounded-full font-medium">
                    Shop Now →
                  </Button>
                </div>

                <div className="flex-1 flex justify-center items-center z-10">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="max-w-[200px] sm:max-w-sm max-h-60 sm:max-h-80 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Carousel dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
            <ChevronLeft
              onClick={prevSlide}
              className="absolute top-1/2 right-14 -translate-y-1/2 w-8 h-8  text-white/80 p-1 cursor-pointer z-20"
            />
            <ChevronRight
              onClick={nextSlide}
              className="absolute top-1/2 left-14 -translate-y-1/2 w-8 h-8   text-white/80  p-1 cursor-pointer z-20"
            />
          </div>
        </div>

        {/* Apple Watch Card - Takes up 1/3 width */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-red-900 rounded p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
          <div>
            <h3 className="text-3xl font-bold mb-2 text-balance">Explore</h3>
            <h4 className="text-3xl font-bold mb-6 text-balance">
              Apple Watch
            </h4>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-0 font-medium text-lg"
            >
              Shop Now →
            </Button>
          </div>
          <div className="flex justify-center mt-8">
            <img
              src="/apple-watch-ultra-orange-band.jpg"
              alt="Apple Watch"
              className="max-w-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row - Three equal cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-auto md:h-64">
        {/* Samsung Gear Camera */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded p-6 sm:p-8 flex items-center justify-between text-white relative overflow-hidden">
          <div>
            <h3 className="text-2xl font-bold mb-1 text-balance">Samsung</h3>
            <h4 className="text-2xl font-bold mb-4 text-balance">
              Gear Camera
            </h4>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-0 font-medium"
            >
              Shop Now →
            </Button>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/samsung-gear-360-camera-white.jpg"
              alt="Samsung Gear Camera"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Beats Studio Buds */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded p-6 sm:p-8 flex items-center justify-between text-white relative overflow-hidden">
          <div>
            <h3 className="text-2xl font-bold mb-1 text-balance">
              Beats Studio
            </h3>
            <h4 className="text-2xl font-bold mb-4 text-balance">Buds</h4>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-0 font-medium"
            >
              Shop Now →
            </Button>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/black-beats-studio-buds-earphones.jpg"
              alt="Beats Studio Buds"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Hero Camera */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-6 sm:p-8 flex items-center justify-between text-white relative overflow-hidden">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-balance">
              Hero Camera
            </h3>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 p-0 font-medium"
            >
              Shop Now →
            </Button>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/vintage-film-camera-silver.jpg"
              alt="Hero Camera"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
