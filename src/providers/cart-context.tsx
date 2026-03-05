"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./auth-context";
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from "@/lib/api";
import { toast } from "sonner";

interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
  brand: { name: string };
  ratingsAverage: number;
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

interface CartContextType {
  cart: CartData | null;
  cartCount: number;
  loading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateItem: (productId: string, count: number) => Promise<void>;
  clearAllItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token, status } = useAuth();

  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await getCart(token);
      if (data.status === "success") setCart(data.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchCart();
    } else if (status === "unauthenticated") {
      setCart(null);
    }
  }, [status, token, fetchCart]);

  const addItem = async (productId: string) => {
    if (status === "loading") return;
    if (!token) { toast.error("Please login first"); return; }
    try {
      const { data } = await addToCart(productId, token);
      if (data.status === "success") {
        setCart(data.data);
        toast.success("Added to cart!");
      }
    } catch {
      toast.error("Failed to add to cart");
    }
  };

    const removeItem = async (productId: string) => {
    if (!token) return;
    // optimistic update
    setCart((prev) =>
      prev
        ? {
            ...prev,
            products: prev.products.filter((p) => p.product._id !== productId),
          }
        : prev
    );
    try {
      const { data } = await removeFromCart(productId, token);
      if (data.status === "success") {
        setCart(data.data);
        toast.success("Removed from cart");
      } else {
        await fetchCart();
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status === 401) {
        // token expired - refetch will also fail but at least cart stays consistent
        await fetchCart();
      } else {
        await fetchCart();
        toast.error("Failed to remove item");
      }
    }
  };

  const updateItem = async (productId: string, count: number) => {
    if (!token) return;
    // optimistic update
    setCart((prev) =>
      prev
        ? {
            ...prev,
            products: prev.products.map((p) =>
              p.product._id === productId ? { ...p, count } : p
            ),
          }
        : prev
    );
    try {
      const { data } = await updateCartItem(productId, count, token);
      if (data.status === "success") {
        setCart(data.data);
      } else {
        await fetchCart();
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status !== 401) {
        toast.error("Failed to update cart");
      }
      await fetchCart();
    }
  };

  const clearAllItems = async () => {
    if (!token) return;
    try {
      await clearCart(token);
      setCart(null);
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const cartCount = cart?.products?.reduce((acc, item) => acc + item.count, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, cartCount, loading, fetchCart, addItem, removeItem, updateItem, clearAllItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
