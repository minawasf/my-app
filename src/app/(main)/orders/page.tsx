"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/providers/auth-context";
import { getUserOrders } from "@/lib/api";
import Link from "next/link";
import { Package, MapPin, CreditCard, ChevronDown, ChevronUp } from "lucide-react";

interface OrderItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
  _id: string;
  price: number;
}

interface Order {
  _id: string;
  cartItems: OrderItem[];
  shippingAddress: { details: string; phone: string; city: string };
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { user, status } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Get user ID from session
  const userId = user?.id;

  const fetchOrders = useCallback(async () => {
    if (!userId) return;
    try {
      const { data } = await getUserOrders(userId);
      setOrders(Array.isArray(data) ? data.reverse() : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchOrders();
    else setLoading(false);
  }, [userId, fetchOrders]);

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Please sign in to view your orders</h2>
        <Link href="/login" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Sign In</Link>
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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
          <Package className="w-12 h-12 text-emerald-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
        <p className="text-gray-500 text-sm">Start shopping to see your orders here!</p>
        <Link href="/products" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 text-sm">{orders.length} orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
              {/* Order Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                    <p className="text-xs text-gray-400">{order.cartItems.length} items</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${order.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {order.isPaid ? "Paid" : "Pending Payment"}
                      </span>
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                        {order.isDelivered ? "Delivered" : "In Progress"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${order.paymentMethodType === "card" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                        {order.paymentMethodType === "card" ? "💳 Online" : "💵 Cash"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{order.totalOrderPrice} EGP</p>
                    <div className="text-gray-400 mt-1">
                      {expandedOrder === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Items */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <Package size={14} className="text-emerald-500" /> Order Items
                      </h3>
                      <div className="space-y-3">
                        {order.cartItems.map((item) => (
                          <div key={item._id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.product.title}</p>
                              <p className="text-xs text-gray-500">Qty: {item.count} × {item.price} EGP</p>
                            </div>
                            <p className="text-sm font-bold text-gray-800 shrink-0">{item.price * item.count} EGP</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping & Payment Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          <MapPin size={14} className="text-emerald-500" /> Shipping Address
                        </h3>
                        <div className="bg-white rounded-lg p-3 text-sm text-gray-600 space-y-1">
                          <p><span className="font-semibold">City:</span> {order.shippingAddress.city}</p>
                          <p><span className="font-semibold">Phone:</span> {order.shippingAddress.phone}</p>
                          <p><span className="font-semibold">Details:</span> {order.shippingAddress.details}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          <CreditCard size={14} className="text-emerald-500" /> Payment Info
                        </h3>
                        <div className="bg-white rounded-lg p-3 text-sm text-gray-600 space-y-1">
                          <p><span className="font-semibold">Method:</span> {order.paymentMethodType === "card" ? "Online Payment" : "Cash on Delivery"}</p>
                          <p><span className="font-semibold">Status:</span> {order.isPaid ? `Paid${order.paidAt ? ` on ${new Date(order.paidAt).toLocaleDateString()}` : ""}` : "Not paid yet"}</p>
                          <p><span className="font-semibold">Total:</span> <span className="text-emerald-600 font-bold">{order.totalOrderPrice} EGP</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
