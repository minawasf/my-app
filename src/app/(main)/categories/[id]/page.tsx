"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import { getCategory, getProducts, getCategorySubcategories } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Plus, Heart, Eye, Star } from "lucide-react";
import { useCart } from "@/providers/cart-context";
import { useWishlist } from "@/providers/wishlist-context";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

interface Subcategory {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string; _id: string };
  brand?: { name: string };
}

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem } = useCart();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getCategory(id),
      getProducts({ "category[in]": id, limit: 20 } as Parameters<typeof getProducts>[0]),
      getCategorySubcategories(id),
    ])
      .then(([catRes, prodRes, subRes]) => {
        setCategory(catRes.data.data);
        setProducts(prodRes.data.data || []);
        setSubcategories(subRes.data.data || []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link href="/categories" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Categories
        </Link>

        {category && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-emerald-50">
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-gray-500 text-sm">{products.length} products</p>
            </div>
          </div>
        )}

        {subcategories.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Subcategories</h2>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((sub) => (
                <span key={sub._id} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer">
                  {sub.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products found in this category</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => {
              const inWishlist = isInWishlist(p._id);
              const discount = p.priceAfterDiscount ? Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100) : null;
              return (
                <div key={p._id} className="group relative bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-all flex flex-col h-full">
                  {discount && (
                    <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">-{discount}%</span>
                  )}
                  <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => inWishlist ? removeWishlist(p._id) : addWishlist(p._id)}
                      className={`w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-colors ${inWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}>
                      <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
                    </button>
                    <Link href={`/products/${p._id}`} className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-emerald-500 hover:text-white transition-colors">
                      <Eye size={14} />
                    </Link>
                  </div>
                  <Link href={`/products/${p._id}`} className="aspect-square rounded-lg overflow-hidden mb-3 block">
                    <img src={p.imageCover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <span className="text-[11px] text-gray-500 mb-1">{p.category?.name}</span>
                    <Link href={`/products/${p._id}`} className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[36px] mb-2">{p.title}</Link>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(p.ratingsAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                      <span className="text-[10px] text-gray-400">({p.ratingsQuantity})</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-800">{p.priceAfterDiscount ?? p.price} EGP</span>
                        {p.priceAfterDiscount && <span className="text-xs text-gray-400 line-through ml-1">{p.price} EGP</span>}
                      </div>
                      <button onClick={() => addItem(p._id)} className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors">
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
