"use client";

import React from "react";
import { useCart } from "@/providers/cart-context";
import { useAuth } from "@/providers/auth-context";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { status } = useAuth();
  const { cart, cartCount, loading, removeItem, updateItem, clearAllItems } = useCart();
  const router = useRouter();

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Please sign in to view your cart</h2>
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

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-emerald-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 text-sm">Add some products to get started!</p>
        <Link href="/products" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <ShoppingBag size={18} />
          Browse Products
        </Link>
      </div>
    );
  }

  const total = cart.totalAfterDiscount ?? cart.totalCartPrice;

  return (
      <div className="bg-[#f8fafc] dark:bg-gray-900 min-h-screen py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">Shopping Cart</h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{cartCount} items</p>
            </div>
            <button
              onClick={clearAllItems}
              className="flex items-center gap-1.5 px-3 py-2 text-red-500 border border-red-200 dark:border-red-800 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 size={13} />
              Clear Cart
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Cart Items */}
            <div className="flex-1 space-y-3">
              {cart.products.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-4 flex gap-3 hover:shadow-sm transition-shadow">
                  <Link href={`/products/${item.product._id}`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 shrink-0">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-[11px] text-emerald-600 font-medium">{item.product.category?.name}</p>
                        <Link href={`/products/${item.product._id}`} className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-emerald-600 transition-colors">
                          {item.product.title}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => item.count > 1 ? updateItem(item.product._id, item.count - 1) : removeItem(item.product._id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors dark:text-gray-300"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm font-bold dark:text-gray-100">{item.count}</span>
                        <button
                          onClick={() => updateItem(item.product._id, item.count + 1)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-colors dark:text-gray-300"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100">{item.price * item.count} EGP</p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500">{item.price} EGP each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-5 lg:sticky lg:top-20">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal ({cartCount} items)</span>
                    <span className="font-semibold dark:text-gray-100">{cart.totalCartPrice} EGP</span>
                  </div>
                  {cart.totalAfterDiscount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="text-green-600 font-semibold">-{cart.totalCartPrice - cart.totalAfterDiscount} EGP</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mb-5">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-800 dark:text-gray-100">Total</span>
                    <span className="font-bold text-xl text-emerald-600">{total} EGP</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-200/50"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
