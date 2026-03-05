"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/lib/api";

const RegisterIllustration = () => (
  <div className="hidden lg:flex w-[48%] bg-emerald-50 dark:bg-emerald-900/20 flex-col items-center justify-center p-12 relative overflow-hidden">
    <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />
    <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-emerald-200/30 dark:bg-emerald-700/10" />

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
      {/* Funny SVG - person jumping with excitement holding grocery bag */}
      <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
        {/* Shadow on ground */}
        <ellipse cx="200" cy="365" rx="80" ry="12" fill="#d1fae5" opacity="0.6"/>

        {/* Grocery bag */}
        <rect x="240" y="180" width="80" height="90" rx="10" fill="#fff" stroke="#10b981" strokeWidth="3"/>
        <path d="M255 180 Q255 160 275 158 Q295 156 295 180" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* bag content */}
        <text x="248" y="215" fontSize="28">🥕</text>
        <text x="268" y="240" fontSize="18">🥬</text>

        {/* Person jumping */}
        {/* Body */}
        <rect x="150" y="155" width="65" height="80" rx="18" fill="#10b981"/>
        {/* Shirt text */}
        <text x="158" y="202" fontSize="13" fill="white" fontWeight="bold">NEW!</text>

        {/* Head */}
        <circle cx="183" cy="120" r="36" fill="#fef3c7"/>
        {/* Hair */}
        <path d="M150 112 Q155 82 183 78 Q211 74 218 110" fill="#92400e"/>
        {/* spiky hair bits */}
        <path d="M152 100 Q148 85 156 82" stroke="#92400e" strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M217 98 Q222 84 215 80" stroke="#92400e" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* Eyes - wide open excited */}
        <circle cx="172" cy="117" r="8" fill="white" stroke="#1f2937" strokeWidth="2"/>
        <circle cx="194" cy="117" r="8" fill="white" stroke="#1f2937" strokeWidth="2"/>
        <circle cx="173" cy="117" r="4" fill="#1f2937"/>
        <circle cx="195" cy="117" r="4" fill="#1f2937"/>
        <circle cx="174" cy="115" r="1.5" fill="white"/>
        <circle cx="196" cy="115" r="1.5" fill="white"/>
        {/* Big excited open mouth */}
        <path d="M168 132 Q183 148 198 132" stroke="#1f2937" strokeWidth="2.5" fill="#fca5a5" strokeLinecap="round"/>
        <ellipse cx="183" cy="138" rx="9" ry="6" fill="#fca5a5"/>
        {/* Teeth */}
        <rect x="176" y="132" width="6" height="5" rx="1" fill="white"/>
        <rect x="183" y="132" width="6" height="5" rx="1" fill="white"/>
        {/* Rosy cheeks */}
        <ellipse cx="160" cy="127" rx="8" ry="5" fill="#fca5a5" opacity="0.5"/>
        <ellipse cx="206" cy="127" rx="8" ry="5" fill="#fca5a5" opacity="0.5"/>

        {/* Left arm raised up in excitement */}
        <path d="M150 175 Q125 150 110 125" stroke="#fef3c7" strokeWidth="15" strokeLinecap="round" fill="none"/>
        {/* hand */}
        <circle cx="107" cy="120" r="11" fill="#fef3c7"/>
        <line x1="100" y1="111" x2="96" y2="101" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>
        <line x1="107" y1="109" x2="105" y2="98" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>
        <line x1="114" y1="110" x2="114" y2="99" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round"/>

        {/* Right arm holding bag */}
        <path d="M215 175 Q235 175 245 185" stroke="#fef3c7" strokeWidth="15" strokeLinecap="round" fill="none"/>

        {/* Legs - jumping pose (bent) */}
        <path d="M165 233 Q158 270 145 295" stroke="#1f2937" strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M200 233 Q210 265 225 288" stroke="#1f2937" strokeWidth="18" strokeLinecap="round" fill="none"/>
        {/* Shoes */}
        <ellipse cx="138" cy="299" rx="18" ry="9" fill="#1f2937" transform="rotate(-15 138 299)"/>
        <ellipse cx="230" cy="293" rx="18" ry="9" fill="#1f2937" transform="rotate(10 230 293)"/>

        {/* Confetti / sparkles */}
        <text x="60" y="100" fontSize="22">🎉</text>
        <text x="310" y="120" fontSize="20">⭐</text>
        <text x="80" y="200" fontSize="18">✨</text>
        <text x="320" y="280" fontSize="22">🎊</text>
        <text x="50" y="320" fontSize="16">🌟</text>
      </svg>

      {/* Welcome badge */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-emerald-100 dark:border-emerald-800">
        <span className="text-2xl">🎁</span>
        <div>
          <p className="font-bold text-gray-800 dark:text-white text-sm">Join 10,000+ shoppers!</p>
          <p className="text-emerald-600 text-xs">Free delivery on first order</p>
        </div>
      </div>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium px-4">
        Create an account and enjoy{" "}
        <span className="font-bold text-emerald-600">fresh groceries delivered fast! 🚀</span>
      </p>
    </div>
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", rePassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    if (!form.phone.match(/^01[0125][0-9]{8}$/)) e.phone = "Enter a valid Egyptian phone number";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.rePassword) e.rePassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { data } = await signUp(form);
      if (data.message === "success") {
        toast.success("Account created! Please sign in. 🎉");
        router.push("/login");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; errors?: Record<string, { msg: string }> } } };
      const apiErrors = error.response?.data?.errors;
      if (apiErrors) {
        const mapped: Record<string, string> = {};
        Object.entries(apiErrors).forEach(([k, v]) => { mapped[k] = v.msg; });
        setErrors(mapped);
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const field = (
    key: keyof typeof form,
    placeholder: string,
    type = "text",
    isPassword = false
  ) => (
    <div>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className={`w-full px-5 py-3.5 rounded-full border ${errors[key] ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400 ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {errors[key] && <p className="text-red-500 text-xs mt-1 pl-4">{errors[key]}</p>}
    </div>
  );

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
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Create Account</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 text-sm">
                Join <span className="font-bold text-gray-700 dark:text-gray-300">Fresh Cart</span> and start shopping fresh today!
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {field("name", "Full Name")}
                {field("email", "Email address", "email")}
                {field("phone", "Phone number (01XXXXXXXXX)", "tel")}
                {field("password", "Password (min 6 chars)", "text", true)}
                {field("rePassword", "Confirm password", "text", true)}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-bold rounded-full transition-all text-sm shadow-md mt-2"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-600 font-bold hover:text-emerald-700">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="p-4 text-center text-xs text-gray-400 dark:text-gray-600">
            © 2024 FreshCart. All rights reserved.
          </div>
        </div>

        {/* Right - Illustration */}
        <RegisterIllustration />
      </div>
    );
}
