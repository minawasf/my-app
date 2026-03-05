"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { getProducts, getCategories, getBrands } from "@/lib/api";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/product-card";
import { Product, Category, Brand } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const keywordParam = searchParams.get("keyword") || "";
  const categoryParam = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ keyword: keywordParam, category: categoryParam, brand: "", sort: "-ratingsAverage" });
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit: 20, sort: filters.sort };
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.category) params["category[in]"] = filters.category;
      if (filters.brand) params["brand[in]"] = filters.brand;
      const { data } = await getProducts(params as Parameters<typeof getProducts>[0]);
      setProducts(data.data || []);
      setTotalPages(data.metadata?.numberOfPages || 1);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { getCategories().then(({ data }) => setCategories(data.data || [])); }, []);
  useEffect(() => { getBrands().then(({ data }) => setBrands(data.data || [])); }, []);

    return (
        <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">All Products</h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Showing {products.length} products</p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-emerald-500 transition-colors"
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
              </button>
            </div>

            {/* Mobile Filter Overlay */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-5 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X size={20} className="text-gray-400" /></button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Search</label>
                      <input type="text" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} placeholder="Search products..." className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Sort By</label>
                      <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="-ratingsAverage">Top Rated</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-sold">Best Selling</option>
                        <option value="-createdAt">Newest</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
                      <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="">All Categories</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Brand</label>
                      <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="">All Brands</option>
                        {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => { setFilters({ keyword: "", category: "", brand: "", sort: "-ratingsAverage" }); setShowFilters(false); }} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors font-semibold">
                        Clear All
                      </button>
                      <button onClick={() => setShowFilters(false)} className="flex-1 py-2.5 bg-emerald-500 rounded-xl text-sm text-white font-semibold hover:bg-emerald-600 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-6">
              {/* Sidebar Filters - Desktop only */}
              {showFilters && (
                <div className="hidden lg:block w-64 shrink-0">
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 sticky top-20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">Filters</h3>
                      <button onClick={() => setShowFilters(false)}><X size={16} className="text-gray-400" /></button>
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Search</label>
                      <input type="text" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} placeholder="Search products..." className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Sort By</label>
                      <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="-ratingsAverage">Top Rated</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-sold">Best Selling</option>
                        <option value="-createdAt">Newest</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
                      <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="">All Categories</option>
                        {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">Brand</label>
                      <select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500">
                        <option value="">All Brands</option>
                        {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
                      </select>
                    </div>
                    <button onClick={() => setFilters({ keyword: "", category: "", brand: "", sort: "-ratingsAverage" })} className="w-full py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:border-red-400 hover:text-red-500 transition-colors">
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[...Array(12)].map((_, i) => <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-64 animate-pulse" />)}
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No products found</p>
                    <button onClick={() => setFilters({ keyword: "", category: "", brand: "", sort: "-ratingsAverage" })} className="mt-4 text-emerald-500 font-semibold">
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {products.map((p) => <ProductCard key={p._id} product={p} />)}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center gap-1.5 sm:gap-2 mt-8 flex-wrap">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:text-gray-300 text-sm font-semibold disabled:opacity-40 hover:border-emerald-500 transition-colors"
                        >
                          ← Prev
                        </button>
                        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                          const p = i + 1;
                          return (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${page === p ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-600 dark:text-gray-300 hover:border-emerald-500"}`}
                            >
                              {p}
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:text-gray-300 text-sm font-semibold disabled:opacity-40 hover:border-emerald-500 transition-colors"
                        >
                          Next →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="bg-[#f8fafc] min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
