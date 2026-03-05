"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const LoginIllustration = () => (
  <div className="hidden lg:flex w-[48%] bg-emerald-50 dark:bg-emerald-900/20 flex-col items-center justify-center p-12 relative overflow-hidden">
    {/* decorative circles */}
    <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />
    <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-emerald-200/30 dark:bg-emerald-700/10" />

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
      {/* Funny SVG - person shopping with a full cart, happy face */}
      <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
        {/* Background blob */}
        <ellipse cx="200" cy="340" rx="160" ry="28" fill="#d1fae5" />

        {/* Shopping Cart */}
        <rect x="120" y="220" width="160" height="90" rx="12" fill="#fff" stroke="#10b981" strokeWidth="3"/>
        <rect x="130" y="235" width="140" height="60" rx="8" fill="#ecfdf5"/>
        {/* Cart items (stacked products) */}
        <rect x="145" y="245" width="35" height="40" rx="5" fill="#6ee7b7"/>
        <rect x="188" y="248" width="35" height="37" rx="5" fill="#34d399"/>
        <rect x="231" y="244" width="25" height="41" rx="5" fill="#10b981"/>
        {/* leaves on top */}
        <ellipse cx="162" cy="245" rx="8" ry="5" fill="#065f46"/>
        <ellipse cx="205" cy="248" rx="8" ry="5" fill="#065f46"/>
        {/* Cart handle */}
        <path d="M100 195 Q120 195 130 220" stroke="#10b981" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <line x1="90" y1="195" x2="100" y2="195" stroke="#10b981" strokeWidth="4" strokeLinecap="round"/>
        {/* Cart wheels */}
        <circle cx="155" cy="318" r="14" fill="#fff" stroke="#10b981" strokeWidth="3"/>
        <circle cx="245" cy="318" r="14" fill="#fff" stroke="#10b981" strokeWidth="3"/>
        <circle cx="155" cy="318" r="5" fill="#10b981"/>
        <circle cx="245" cy="318" r="5" fill="#10b981"/>

        {/* Person body */}
        <rect x="195" y="140" width="70" height="85" rx="20" fill="#fef3c7"/>
        {/* Shirt */}
        <rect x="193" y="170" width="74" height="60" rx="15" fill="#10b981"/>
        {/* Heart on shirt */}
        <path d="M226 185 C226 183 224 180 221 182 C218 184 218 188 221 191 L226 196 L231 191 C234 188 234 184 231 182 C228 180 226 183 226 185Z" fill="white"/>

        {/* Head */}
        <circle cx="230" cy="115" r="38" fill="#fef3c7"/>
        {/* Hair */}
        <path d="M195 108 Q200 78 230 75 Q260 72 268 105" fill="#1f2937"/>
        <path d="M192 110 Q188 90 196 80" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" fill="none"/>
        {/* Eyes - big happy */}
        <ellipse cx="218" cy="112" rx="7" ry="8" fill="#1f2937"/>
        <ellipse cx="242" cy="112" rx="7" ry="8" fill="#1f2937"/>
        <circle cx="220" cy="110" r="2.5" fill="white"/>
        <circle cx="244" cy="110" r="2.5" fill="white"/>
        {/* Big smile */}
        <path d="M212 128 Q230 145 248 128" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="none"/>
        {/* Rosy cheeks */}
        <ellipse cx="207" cy="122" rx="8" ry="5" fill="#fca5a5" opacity="0.5"/>
        <ellipse cx="253" cy="122" rx="8" ry="5" fill="#fca5a5" opacity="0.5"/>

        {/* Arms */}
        {/* Left arm pushing cart */}
        <path d="M195 185 Q165 200 135 220" stroke="#fef3c7" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M195 185 Q165 200 135 220" stroke="#10b981" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.3"/>
        {/* Right arm raised/waving */}
        <path d="M265 185 Q285 160 295 140" stroke="#fef3c7" strokeWidth="16" strokeLinecap="round" fill="none"/>
        {/* Hand wave */}
        <circle cx="298" cy="135" r="12" fill="#fef3c7"/>
        {/* fingers */}
        <line x1="290" y1="125" x2="286" y2="115" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>
        <line x1="297" y1="123" x2="295" y2="112" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>
        <line x1="304" y1="124" x2="304" y2="113" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>
        <line x1="310" y1="127" x2="312" y2="117" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>

        {/* Legs */}
        <rect x="205" y="222" width="22" height="60" rx="11" fill="#1f2937"/>
        <rect x="233" y="222" width="22" height="60" rx="11" fill="#1f2937"/>
        {/* Shoes */}
        <ellipse cx="216" cy="284" rx="18" ry="9" fill="#1f2937"/>
        <ellipse cx="244" cy="284" rx="18" ry="9" fill="#1f2937"/>

        {/* floating stars/sparkles around */}
        <text x="310" y="80" fontSize="22">✨</text>
        <text x="70" y="150" fontSize="18">🛒</text>
        <text x="330" y="200" fontSize="16">🥦</text>
        <text x="60" y="260" fontSize="20">🍎</text>
      </svg>

      {/* Floating product badge */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-emerald-100 dark:border-emerald-800">
        <span className="text-2xl">🛍️</span>
        <div>
          <p className="font-bold text-gray-800 dark:text-white text-sm">Fresh Deals Today!</p>
          <p className="text-emerald-600 text-xs">Up to 40% off groceries</p>
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium px-4">
        Sign in and start filling your cart with{" "}
        <span className="font-bold text-emerald-600">fresh goodies! 🥳</span>
      </p>
    </div>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      if (result.error) {
        setError(result.error);
      } else {
        toast.success("Welcome back! 🎉");
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="min-h-screen flex w-full">
        {/* Left - Form */}
        <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800">
            <Link href="/" className="inline-block">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 tracking-tight">Fresh Cart</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm">
                Sign in to <span className="font-bold text-gray-700 dark:text-gray-300">Fresh Cart</span> and get your groceries delivered fresh.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email address"
                    required
                    className="w-full px-5 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Password"
                    required
                    className="w-full px-5 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 font-medium">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-bold rounded-full transition-all text-sm shadow-md"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="relative my-5 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs text-gray-400 bg-white dark:bg-gray-900 px-3">
                  or continue with
                </div>
              </div>

                <div className="flex justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 sm:mt-8">
                Not a member?{" "}
                <Link href="/register" className="text-emerald-600 font-bold hover:text-emerald-700">
                  Register now
                </Link>
              </p>
            </div>
          </div>

          <div className="p-4 text-center text-xs text-gray-400 dark:text-gray-600">
            © 2024 FreshCart. All rights reserved.
          </div>
        </div>

        {/* Right - Illustration */}
        <LoginIllustration />
      </div>
    );
}
