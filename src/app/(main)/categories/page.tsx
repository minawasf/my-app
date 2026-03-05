"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";
import Link from "next/link";
import { Search } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(({ data }) => {
        setCategories(data.data || []);
        setFiltered(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, categories]);

  return (
      <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Categories</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{filtered.length} categories</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-36 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filtered.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/categories/${cat._id}`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-700 transition-all duration-300 group flex flex-col items-center gap-3"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-colors">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
