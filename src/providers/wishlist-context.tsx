"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./auth-context";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/lib/api";
import { toast } from "sonner";

interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  category: { name: string };
  brand: { name: string };
}

interface WishlistContextType {
  wishlist: WishlistProduct[];
  wishlistIds: Set<string>;
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { token, status } = useAuth();

  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await getWishlist(token);
      if (data.status === "success") setWishlist(data.data);
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchWishlist();
    } else if (status === "unauthenticated") {
      setWishlist([]);
    }
  }, [status, token, fetchWishlist]);

  const addItem = async (productId: string) => {
    if (status === "loading") return;
    if (!token) { toast.error("Please login first"); return; }
    try {
      const { data } = await addToWishlist(productId, token);
      if (data.status === "success") {
        await fetchWishlist();
        toast.success("Added to wishlist!");
      }
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) return;
    try {
      const { data } = await removeFromWishlist(productId, token);
      if (data.status === "success") {
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  const wishlistIds = new Set(wishlist.map((p) => p._id));
  const isInWishlist = (productId: string) => wishlistIds.has(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistIds, loading, fetchWishlist, addItem, removeItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
