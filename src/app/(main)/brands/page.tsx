"use client";

import React, { useEffect, useState } from "react";
import { getBrands } from "@/lib/api";
import Link from "next/link";
import { Search } from "lucide-react";

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filtered, setFiltered] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands()
      .then(({ data }) => {
        setBrands(data.data || []);
        setFiltered(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFiltered(brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase())));
  }, [search, brands]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Brands</h1>
            <p className="text-gray-500 text-sm">{filtered.length} brands available</p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={brand.image} alt={brand.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-emerald-600 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
