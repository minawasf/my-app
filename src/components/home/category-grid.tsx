import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { CATEGORY_IMAGES } from "@/constants/assets";

const categories = [
  {
    name: "Music",
    image: CATEGORY_IMAGES.MUSIC,
    link: "/categories/6439d61c0049ad0b52b90051"
  },
  {
    name: "Men's Fashion",
    image: CATEGORY_IMAGES.MEN,
    link: "/categories/6439d5b90049ad0b52b90048"
  },
  {
    name: "Women's Fashion",
    image: CATEGORY_IMAGES.WOMEN,
    link: "/categories/6439d58a0049ad0b52b9003f"
  },
  {
    name: "SuperMarket",
    image: CATEGORY_IMAGES.SUPERMARKET,
    link: "/categories/6439d41c67d9aa4ca97064d5"
  },
  {
    name: "Baby & Toys",
    image: CATEGORY_IMAGES.BABY,
    link: "/categories/6439d40367d9aa4ca97064cc"
  },
  {
    name: "Home",
    image: CATEGORY_IMAGES.HOME,
    link: "/categories/6439d3e067d9aa4ca97064c3"
  }
];

const CategoryGrid = () => {
  return (
      <section id="categories" className="py-10 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-[#10b981] to-[#059669] rounded-full"></div>
              <h2 className="text-[1.875rem] font-bold text-[#1f2937] dark:text-gray-100 font-exo leading-[1.3]">
                Shop By <span className="text-[#10b981]">Category</span>
              </h2>
            </div>
            <a 
              href="/categories" 
              className="text-[#10b981] self-end sm:self-auto hover:text-[#059669] font-medium flex items-center transition-colors cursor-pointer text-sm"
            >
              View All Categories
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-white dark:bg-gray-800 rounded-[0.75rem] p-4 text-center border border-transparent dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                {/* Circular Image Container */}
                <div className="h-20 w-20 overflow-hidden bg-[#ecfdf5] dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#d1fae5] dark:group-hover:bg-emerald-900/50 transition-colors duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Category Name */}
                <h3 className="font-semibold text-[#1f2937] dark:text-gray-100 text-sm font-exo leading-normal group-hover:text-[#10b981] transition-colors duration-300">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
  );
};

export default CategoryGrid;