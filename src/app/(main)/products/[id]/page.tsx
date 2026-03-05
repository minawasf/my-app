"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import { getProduct, getProducts } from "@/lib/api";
import { Star, Plus, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/providers/cart-context";
import { useWishlist } from "@/providers/wishlist-context";

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold: number;
  category: { name: string; _id: string };
  brand?: { name: string; _id: string; image: string };
  subcategory?: Array<{ name: string; _id: string }>;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addItem } = useCart();
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id)
      .then(({ data }) => {
        setProduct(data.data);
        setActiveImage(0);
        if (data.data.category?._id) {
          getProducts({ category: data.data.category._id, limit: 5 })
            .then(({ data: rd }) => setRelated(rd.data?.filter((p: Product) => p._id !== id).slice(0, 4) || []))
            .catch(() => {});
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Product not found</p>
      <Link href="/products" className="text-emerald-500 font-semibold">← Back to Products</Link>
    </div>
  );

  const allImages = [product.imageCover, ...(product.images || [])];
  const inWishlist = isInWishlist(product._id);
  const discount = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100) : null;

    return (
      <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <Link href="/products" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 text-sm font-medium mb-5 transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 lg:p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
                {/* Images */}
                <div>
                  <div className="w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 mb-3 flex items-center justify-center">
                    <img src={allImages[activeImage]} alt={product.title} className="w-full h-64 sm:h-80 lg:h-96 object-contain" />
                  </div>
                  {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {allImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i ? "border-emerald-500" : "border-transparent"}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              {/* Info */}
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link href={`/categories/${product.category._id}`} className="text-sm text-emerald-600 font-medium hover:underline">
                      {product.category.name}
                    </Link>
                    {product.brand && (
                      <>
                        <span className="text-gray-300 dark:text-gray-600">·</span>
                        <Link href={`/brands/${product.brand._id}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 transition-colors">
                          {product.brand.name}
                        </Link>
                      </>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{product.title}</h1>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.ratingsAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.ratingsAverage} ({product.ratingsQuantity} reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {product.priceAfterDiscount ?? product.price} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <>
                      <span className="text-lg sm:text-xl text-gray-400 line-through">{product.price} EGP</span>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-600 text-sm font-bold px-2 py-0.5 rounded">-{discount}%</span>
                    </>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{product.description}</p>

                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <span className={`px-3 py-1 rounded-full font-semibold ${product.quantity > 0 ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" : "bg-red-50 dark:bg-red-900/30 text-red-500"}`}>
                    {product.quantity > 0 ? `In Stock (${product.quantity})` : "Out of Stock"}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">{product.sold} sold</span>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => addItem(product._id)}
                    disabled={product.quantity === 0}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200/50 text-sm"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => inWishlist ? removeWishlist(product._id) : addWishlist(product._id)}
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors shrink-0 ${inWishlist ? "border-red-400 text-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 text-gray-500 hover:border-red-400 hover:text-red-500"}`}
                  >
                    <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  {[
                    { icon: Truck, text: "Free Delivery" },
                    { icon: Shield, text: "Secure Payment" },
                    { icon: RefreshCw, text: "Easy Returns" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex flex-col items-center gap-1 text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Icon size={14} className="text-emerald-500" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {related.map((p) => (
                  <div key={p._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 hover:shadow-md transition-shadow">
                    <Link href={`/products/${p._id}`} className="block aspect-square rounded-lg overflow-hidden mb-3">
                      <img src={p.imageCover} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </Link>
                    <Link href={`/products/${p._id}`} className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-emerald-600 transition-colors">
                      {p.title}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100">{p.priceAfterDiscount ?? p.price} EGP</span>
                      <button onClick={() => addItem(p._id)} className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors">
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
