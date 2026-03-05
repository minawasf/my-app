import axios from "axios";

export const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API Error]", err?.config?.url, err?.response?.status, err?.response?.data);
    // Auto-clear expired token
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("fc_token");
      localStorage.removeItem("fc_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export function authHeaders(token: string) {
  return { token };
}

// Auth
export const signUp = (data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) => api.post("/auth/signup", data);

export const signIn = (data: { email: string; password: string }) =>
  api.post("/auth/signin", data);

export const forgotPassword = (data: { email: string }) =>
  api.post("/auth/forgotPasswords", data);

export const verifyResetCode = (data: { resetCode: string }) =>
  api.post("/auth/verifyResetCode", data);

export const resetPassword = (data: { email: string; newPassword: string }) =>
  api.put("/auth/resetPassword", data);

// Products
export const getProducts = (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  category?: string;
  brand?: string;
  [key: string]: string | number | undefined;
}) => api.get("/products", { params });

export const getProduct = (id: string) => api.get(`/products/${id}`);

// Categories
export const getCategories = () => api.get("/categories");
export const getCategory = (id: string) => api.get(`/categories/${id}`);
export const getCategorySubcategories = (id: string) =>
  api.get(`/categories/${id}/subcategories`);

// Brands
export const getBrands = () => api.get("/brands");
export const getBrand = (id: string) => api.get(`/brands/${id}`);

// Cart
export const getCart = (token: string) =>
  api.get("/cart", { headers: authHeaders(token) });

export const addToCart = (productId: string, token: string) =>
  api.post("/cart", { productId }, { headers: authHeaders(token) });

export const removeFromCart = (productId: string, token: string) =>
  api.delete(`/cart/${productId}`, { headers: authHeaders(token) });

export const updateCartItem = (
  productId: string,
  count: number,
  token: string
) =>
  api.put(
    `/cart/${productId}`,
    { count },
    { headers: authHeaders(token) }
  );

export const clearCart = (token: string) =>
  api.delete("/cart", { headers: authHeaders(token) });

// Wishlist
export const getWishlist = (token: string) =>
  api.get("/wishlist", { headers: authHeaders(token) });

export const addToWishlist = (productId: string, token: string) =>
  api.post("/wishlist", { productId }, { headers: authHeaders(token) });

export const removeFromWishlist = (productId: string, token: string) =>
  api.delete(`/wishlist/${productId}`, { headers: authHeaders(token) });

// Orders
export const cashOnDelivery = (
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string },
  token: string
) =>
  api.post(
    `/orders/${cartId}`,
    { shippingAddress },
    { headers: authHeaders(token) }
  );

export const onlinePayment = (
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string },
  token: string
) =>
  api.post(
    `/orders/checkout-session/${cartId}?url=${typeof window !== "undefined" ? window.location.origin : ""}`,
    { shippingAddress },
    { headers: authHeaders(token) }
  );

export const getUserOrders = (userId: string) =>
  api.get(`/user/${userId}/orders`);
