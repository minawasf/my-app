"use client";

import React, { useEffect, useState } from "react";
import HeroCarousel from "@/components/home/hero-carousel";
import FeatureGrid from "@/components/home/feature-grid";
import CategoryGrid from "@/components/home/category-grid";
import NewsletterApp from "@/components/home/newsletter-app";
import { getProducts, getCategories } from "@/lib/api";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Product, Category } from "@/types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    getProducts({ limit: 20 })
      .then(({ data }) => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoadingProducts(false));

    getCategories()
      .then(({ data }) => setCategories(data.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroCarousel />
          <FeatureGrid />

          {/* Category Grid with live data */}
          {categories.length > 0 ? (
            <section className="py-10 bg-white dark:bg-gray-900">
              <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                      Shop By <span className="text-emerald-500">Category</span>
                    </h2>
                  </div>
                  <Link href="/categories" className="text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-1 text-sm mt-2 sm:mt-0">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categories/${cat._id}`}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center border border-transparent dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="h-20 w-20 overflow-hidden bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm group-hover:text-emerald-600 transition-colors">
                        {cat.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <CategoryGrid />
          )}

          {/* Featured Products */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Featured <span className="text-emerald-500">Products</span>
                  </h2>
                </div>
                <Link href="/products" className="text-emerald-500 hover:text-emerald-600 font-medium text-sm mt-2 sm:mt-0">
                  View All →
                </Link>
              </div>

              {loadingProducts ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 animate-pulse" />
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </section>

        <NewsletterApp />
      </main>
      <Footer />
    </div>
  );
}
