"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-context";
import { useCart } from "@/providers/cart-context";
import Link from "next/link";
import { MapPin, CreditCard, Banknote, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cashOnDelivery, onlinePayment } from "@/lib/api";
import { useRouter } from "next/navigation";

type PaymentMethod = "cash" | "online";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export default function CheckoutPage() {
  const { token, status } = useAuth();
  const { cart, fetchCart } = useCart();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({ details: "", phone: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Please sign in to checkout</h2>
        <Link href="/login" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Sign In</Link>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <Link href="/products" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl">Browse Products</Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-6">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-500 text-sm">Your order has been successfully placed.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/orders" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
            View Orders
          </Link>
          <Link href="/products" className="px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-emerald-500 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.details.trim() || !shippingAddress.phone.trim() || !shippingAddress.city.trim()) {
      toast.error("Please fill in all shipping details");
      return;
    }
    if (!token) { toast.error("Please login again"); return; }

    setLoading(true);
    try {
      if (paymentMethod === "cash") {
        const { data } = await cashOnDelivery(cart._id, shippingAddress, token);
        if (data.status === "success") {
          setOrderSuccess(true);
          await fetchCart();
        }
      } else {
        const { data } = await onlinePayment(cart._id, shippingAddress, token);
        if (data.session?.url) {
          window.location.href = data.session.url;
        }
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.totalAfterDiscount ?? cart.totalCartPrice;

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6">
      <div className="container mx-auto px-4">
        <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 text-sm font-medium mb-5 transition-colors">
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left: Shipping + Payment */}
            <div className="flex-1 space-y-4">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Shipping Address</h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                    <input type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} placeholder="Cairo, Alexandria, Giza..." required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} placeholder="01012345678" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address Details</label>
                    <textarea value={shippingAddress.details} onChange={(e) => setShippingAddress({ ...shippingAddress, details: e.target.value })} placeholder="Building number, Street name, Area..." required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm resize-none" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "cash" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="sr-only" />
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${paymentMethod === "cash" ? "bg-emerald-500" : "bg-gray-100"}`}>
                      <Banknote className={`w-4 h-4 sm:w-5 sm:h-5 ${paymentMethod === "cash" ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay when you receive</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "online" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="sr-only" />
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${paymentMethod === "online" ? "bg-emerald-500" : "bg-gray-100"}`}>
                      <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 ${paymentMethod === "online" ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Online Payment</p>
                      <p className="text-xs text-gray-500">Visa / Mastercard</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 lg:sticky lg:top-20">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4 max-h-48 sm:max-h-60 overflow-y-auto pr-1">
                  {cart.products.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover bg-gray-50 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.product.title}</p>
                        <p className="text-xs text-gray-400">Qty: {item.count}</p>
                      </div>
                      <p className="text-xs font-bold text-gray-800 shrink-0">{item.price * item.count} EGP</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">{cart.totalCartPrice} EGP</span>
                  </div>
                  {cart.totalAfterDiscount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="text-green-600 font-semibold">-{cart.totalCartPrice - cart.totalAfterDiscount} EGP</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-emerald-600 text-lg">{total} EGP</span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200/50 text-sm">
                  {loading ? "Placing Order..." : paymentMethod === "online" ? "Pay Now" : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
