"use client";

import React from "react";
import { useWishlist } from "@/providers/wishlist-context";
import { useCart } from "@/providers/cart-context";
import { useAuth } from "@/providers/auth-context";
import Link from "next/link";
import { Heart, Plus, Trash2, Star } from "lucide-react";

export default function WishlistPage() {
  const { status } = useAuth();
  const { wishlist, removeItem, loading } = useWishlist();
  const { addItem } = useCart();

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
          <Heart className="w-10 h-10 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Please sign in to view your wishlist</h2>
        <Link href="/login" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
          <Heart className="w-12 h-12 text-red-200" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
        <p className="text-gray-500 text-sm">Save products you love!</p>
        <Link href="/products" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
      <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Wishlist</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{wishlist.length} saved items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
                <div className="relative">
                  <Link href={`/products/${product._id}`} className="block aspect-square rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                    <img src={product.imageCover} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <button
                    onClick={() => removeItem(product._id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-sm flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors border border-gray-100 dark:border-gray-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex-1">
                  <p className="text-[11px] text-emerald-600 font-medium mb-1">{product.category?.name}</p>
                  <Link href={`/products/${product._id}`} className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-emerald-600 transition-colors">
                    {product.title}
                  </Link>
                  <div className="flex items-center gap-1 mt-1.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className={i < Math.floor(product.ratingsAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
                    ))}
                  </div>
                  <p className="text-base font-bold text-gray-800 dark:text-gray-100">{product.price} EGP</p>
                </div>

                <button
                  onClick={() => addItem(product._id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <Plus size={16} strokeWidth={3} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
