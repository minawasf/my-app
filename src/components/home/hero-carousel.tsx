"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { HERO_IMAGES } from "@/constants/assets";

const slides = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    button1: { text: "Shop Now", href: "/products", theme: "white" },
    button2: { text: "View Deals", href: "/deals", theme: "transparent" },
    image: HERO_IMAGES[0],
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    button1: { text: "Shop Now", href: "/products", theme: "white" },
    button2: { text: "Learn More", href: "/about", theme: "transparent" },
    image: HERO_IMAGES[1],
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    button1: { text: "Order Now", href: "/products", theme: "white" },
    button2: { text: "Delivery Info", href: "/delivery", theme: "transparent" },
    image: HERO_IMAGES[2],
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
      <section className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>

            {/* Emerald Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/90 to-emerald-400/50 flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-xl text-white">
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight tracking-tight drop-shadow-sm font-exo">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-lg mb-4 md:mb-8 opacity-95 font-exo">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <a
                        href={slide.button1.href}
                        className="px-4 md:px-6 py-2 md:py-2.5 bg-white text-emerald-600 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-sm inline-flex items-center justify-center text-sm border-2 border-white/50"
                      >
                        {slide.button1.text}
                      </a>
                      <a
                        href={slide.button2.href}
                        className="px-4 md:px-6 py-2 md:py-2.5 bg-transparent text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 border-2 border-white/50 inline-flex items-center justify-center text-sm"
                      >
                        {slide.button2.text}
                      </a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white text-emerald-500 rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 hover:bg-white text-emerald-500 rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Pagination Bullets */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/30 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}