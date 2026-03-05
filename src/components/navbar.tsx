"use client";

import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Headset,
  Heart,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Package,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "@/providers/auth-context";
import Link from "next/link";
import { useCart } from "@/providers/cart-context";
import { useWishlist } from "@/providers/wishlist-context";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { LOGO_URL } from "@/constants/assets";

export default function Navbar() {
  const { user, status, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = status === "authenticated";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    setMobileOpen(false);
  };

  return (
    <>
        {/* Top Bar */}
        <div className="hidden lg:block text-sm border-b border-[#f1f5f9] dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-10">
              <div className="flex items-center gap-6 text-[#6b7280] dark:text-slate-400 text-xs">
                <span className="font-medium">🚚 Free Shipping on Orders 500 EGP</span>
                <span className="font-medium">🎁 New Arrivals Daily</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#6b7280] dark:text-slate-400 text-xs">📞 +20 (100) 123-4567</span>
                <span className="w-px h-4 bg-[#f1f5f9] dark:bg-slate-700" />
                {isLoggedIn ? (
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#1f2937] dark:text-slate-200 font-semibold">Hi, {user?.name?.split(" ")[0]}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                    >
                      <LogOut size={12} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-xs">
                    <Link href="/login" className="text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold">Sign In</Link>
                    <Link href="/register" className="text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img
                alt="FreshCart"
                className="h-6 lg:h-8 w-auto"
                src={LOGO_URL}
              />
            </Link>

            {/* Search Bar */}
            <form className="hidden lg:flex flex-1 max-w-2xl" onSubmit={handleSearch}>
              <div className="relative w-full">
                <input
                  type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, brands and more..."
                    className="w-full px-5 py-3 pr-12 rounded-full border border-[#f1f5f9] dark:border-slate-700 bg-[#f8fafc]/50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-sm font-medium text-[#1f2937] dark:text-slate-200 dark:placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center hover:bg-[#059669] transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-6">
              <Link href="/" className="text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold transition-colors text-sm">Home</Link>
                <Link href="/products" className="text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold transition-colors text-sm">Shop</Link>

                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold transition-colors py-2 text-sm">
                    Categories
                    <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white dark:bg-slate-800 border border-[#f1f5f9] dark:border-slate-700 rounded-xl shadow-xl py-2 min-w-[200px]">
                      <Link href="/categories" className="block px-4 py-2.5 text-[#6b7280] dark:text-slate-400 hover:text-[#10b981] hover:bg-[#10b981]/5 transition-colors font-medium text-sm">All Categories</Link>
                    </div>
                  </div>
                </div>

                <Link href="/brands" className="text-[#1f2937] dark:text-slate-200 hover:text-[#10b981] font-semibold transition-colors text-sm">Brands</Link>
            </nav>

              {/* Utility Icons */}
              <div className="flex items-center gap-1 lg:gap-2">
                <Link href="/contact" className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-[#f1f5f9] hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#10b981]/5 flex items-center justify-center">
                    <Headset className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider">
                    <div className="text-[#6b7280] font-medium leading-tight">Support</div>
                    <div className="font-bold text-[#1f2937] leading-tight">24/7 Help</div>
                  </div>
                </Link>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-full hover:bg-[#f8fafc] dark:hover:bg-slate-700 transition-colors group"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-[#6b7280] group-hover:text-[#10b981] transition-colors" />
                  )}
                </button>

                <Link href="/wishlist" className="relative p-2.5 rounded-full hover:bg-[#f8fafc] dark:hover:bg-slate-700 transition-colors group">
                  <Heart className="w-6 h-6 text-[#6b7280] dark:text-slate-400 group-hover:text-[#10b981] transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

                <Link href="/cart" className="relative p-2.5 rounded-full hover:bg-[#f8fafc] dark:hover:bg-slate-700 transition-colors group">
                  <ShoppingCart className="w-6 h-6 text-[#6b7280] dark:text-slate-400 group-hover:text-[#10b981] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#10b981] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <div className="hidden lg:flex items-center gap-2 ml-2">
                  <Link
                    href="/orders"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-sm font-bold transition-colors hover:bg-[#10b981]/20"
                  >
                    <Package className="w-4 h-4" />
                    <span>Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-200 text-red-500 text-sm font-bold transition-colors hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-2 ml-2 px-6 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-sm font-bold transition-colors shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden ml-1 w-10 h-10 rounded-full bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

          {/* Mobile Menu */}
            {mobileOpen && (
              <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-[#f1f5f9] dark:border-slate-700 px-4 py-4 space-y-3 shadow-lg">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#f1f5f9] dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-800 text-[#1f2937] dark:text-slate-200 text-sm focus:outline-none focus:border-[#10b981]"
                  />
                  <button type="submit" className="px-4 py-2.5 bg-[#10b981] text-white rounded-full text-sm font-semibold">Search</button>
                </form>
                <nav className="grid grid-cols-2 gap-1 pt-1">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Shop" },
                    { href: "/categories", label: "Categories" },
                    { href: "/brands", label: "Brands" },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center py-2.5 px-3 rounded-xl text-[#1f2937] dark:text-slate-200 font-semibold text-sm hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-[#f1f5f9] dark:border-slate-700 pt-3 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Link
                      href="/wishlist"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#f1f5f9] dark:border-slate-700 text-[#1f2937] dark:text-slate-200 font-semibold text-sm hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Wishlist {wishlist.length > 0 && <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>}
                    </Link>
                    <Link
                      href="/cart"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#f1f5f9] dark:border-slate-700 text-[#1f2937] dark:text-slate-200 font-semibold text-sm hover:border-[#10b981] hover:text-[#10b981] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Cart {cartCount > 0 && <span className="bg-[#10b981] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                    </Link>
                  </div>
                  {isLoggedIn ? (
                    <div className="flex gap-2">
                      <Link
                        href="/orders"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#10b981]/10 text-[#10b981] font-semibold text-sm hover:bg-[#10b981]/20 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/login" className="flex-1 flex items-center justify-center py-2.5 rounded-xl bg-[#10b981] text-white font-bold text-sm hover:bg-[#059669] transition-colors" onClick={() => setMobileOpen(false)}>Sign In</Link>
                      <Link href="/register" className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-[#10b981] text-[#10b981] font-bold text-sm hover:bg-[#10b981]/10 transition-colors" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
      </header>
    </>
  );
}
