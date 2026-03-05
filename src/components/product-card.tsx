"use client";

import React from "react";
import { Star, Plus, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/providers/cart-context";
import { useWishlist } from "@/providers/wishlist-context";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);
  
  const discount = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : null;

  return (
      <div className="group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 transition-all duration-300 hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-700 flex flex-col h-full">
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          -{discount}%
        </span>
      )}

      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => inWishlist ? removeWishlist(product._id) : addWishlist(product._id)}
          className={`w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center transition-colors ${inWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
        >
          <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <Link
          href={`/products/${product._id}`}
          className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-emerald-500 hover:text-white transition-colors"
        >
          <Eye size={14} />
        </Link>
      </div>

      <Link href={`/products/${product._id}`} className="relative aspect-square mb-3 overflow-hidden rounded-lg block">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="flex-1 flex flex-col">
        <span className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">{product.category?.name}</span>
        <Link href={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-tight min-h-[36px] hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.ratingsAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.ratingsQuantity})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>
            {product.priceAfterDiscount && (
              <span className="text-xs text-gray-400 line-through ml-1">{product.price} EGP</span>
            )}
          </div>
          <button
            onClick={() => addItem(product._id)}
            className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm active:scale-90"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
