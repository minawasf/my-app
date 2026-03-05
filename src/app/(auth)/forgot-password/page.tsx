"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { forgotPassword, verifyResetCode, resetPassword } from "@/lib/api";
import { useRouter } from "next/navigation";

type Step = "email" | "code" | "newPassword" | "done";

const ForgotIllustration = ({ step }: { step: Step }) => {
  const content = {
    email: {
      badge: "📧",
      badgeText: "Check your inbox!",
      badgeSub: "We'll send a reset code",
      caption: "Enter your email and we'll help you get back in! 🔑",
      svg: (
        <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
          <ellipse cx="200" cy="360" rx="120" ry="18" fill="#d1fae5" opacity="0.6"/>
          {/* Big envelope */}
          <rect x="80" y="160" width="240" height="160" rx="16" fill="white" stroke="#10b981" strokeWidth="3"/>
          <path d="M80 176 L200 255 L320 176" stroke="#10b981" strokeWidth="3" fill="none"/>
          <path d="M80 320 L155 245" stroke="#10b981" strokeWidth="2" opacity="0.4"/>
          <path d="M320 320 L245 245" stroke="#10b981" strokeWidth="2" opacity="0.4"/>
          {/* envelope flap open */}
          <path d="M80 160 L200 215 L320 160" fill="#ecfdf5" stroke="#10b981" strokeWidth="3"/>

          {/* Person peeking from behind envelope - confused face */}
          {/* Head */}
          <circle cx="200" cy="125" r="40" fill="#fef3c7"/>
          {/* Hair */}
          <path d="M163 115 Q168 82 200 78 Q232 74 238 112" fill="#92400e"/>
          {/* Confused eyes (one squinting) */}
          <ellipse cx="186" cy="115" rx="7" ry="7" fill="white" stroke="#1f2937" strokeWidth="2"/>
          <circle cx="187" cy="116" r="3.5" fill="#1f2937"/>
          {/* squinting eye */}
          <path d="M205 112 Q212 108 218 112" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M205 115 Q212 118 218 115" stroke="#1f2937" strokeWidth="2" strokeLinecap="round"/>
          {/* confused mouth */}
          <path d="M187 132 Q196 130 207 134" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          {/* question mark thought bubble */}
          <circle cx="248" cy="85" r="22" fill="#ecfdf5" stroke="#10b981" strokeWidth="2"/>
          <text x="240" y="94" fontSize="20" fill="#10b981" fontWeight="bold">?</text>
          <circle cx="234" cy="106" r="5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5"/>
          <circle cx="226" cy="115" r="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5"/>
          {/* Arms on envelope */}
          <path d="M163 155 Q140 160 115 175" stroke="#fef3c7" strokeWidth="14" strokeLinecap="round" fill="none"/>
          <path d="M238 155 Q260 160 285 175" stroke="#fef3c7" strokeWidth="14" strokeLinecap="round" fill="none"/>
          <text x="50" y="140" fontSize="18">🔍</text>
          <text x="320" y="100" fontSize="18">💭</text>
        </svg>
      ),
    },
    code: {
      badge: "🔢",
      badgeText: "Code sent!",
      badgeSub: "Check your email inbox",
      caption: "Enter the 6-digit code we sent you! 📬",
      svg: (
        <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
          <ellipse cx="200" cy="360" rx="120" ry="18" fill="#d1fae5" opacity="0.6"/>
          {/* Phone showing code */}
          <rect x="140" y="120" width="120" height="200" rx="18" fill="white" stroke="#10b981" strokeWidth="3"/>
          <rect x="148" y="135" width="104" height="155" rx="8" fill="#ecfdf5"/>
          {/* code digits on screen */}
          <rect x="155" y="180" width="22" height="28" rx="5" fill="#10b981"/>
          <rect x="183" y="180" width="22" height="28" rx="5" fill="#10b981"/>
          <rect x="211" y="180" width="22" height="28" rx="5" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
          <text x="160" y="200" fontSize="16" fill="white" fontWeight="bold">4</text>
          <text x="188" y="200" fontSize="16" fill="white" fontWeight="bold">2</text>
          <text x="216" y="200" fontSize="16" fill="#10b981" fontWeight="bold">_</text>
          <circle cx="200" cy="308" r="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>

          {/* Person excited next to phone */}
          <circle cx="95" cy="100" r="32" fill="#fef3c7"/>
          <path d="M66 93 Q70 67 95 64 Q120 61 125 90" fill="#1f2937"/>
          {/* excited eyes */}
          <circle cx="84" cy="100" r="7" fill="white" stroke="#1f2937" strokeWidth="2"/>
          <circle cx="85" cy="101" r="3.5" fill="#1f2937"/>
          <circle cx="105" cy="100" r="7" fill="white" stroke="#1f2937" strokeWidth="2"/>
          <circle cx="106" cy="101" r="3.5" fill="#1f2937"/>
          {/* big smile */}
          <path d="M80 114 Q95 126 110 114" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M63 93 Q58 80 65 74" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <text x="295" y="130" fontSize="22">⭐</text>
          <text x="50" y="200" fontSize="20">✨</text>
          <text x="310" y="260" fontSize="18">🎯</text>
        </svg>
      ),
    },
    newPassword: {
      badge: "🔒",
      badgeText: "Almost there!",
      badgeSub: "Set your new password",
      caption: "Create a strong new password to protect your account! 💪",
      svg: (
        <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
          <ellipse cx="200" cy="360" rx="120" ry="18" fill="#d1fae5" opacity="0.6"/>
          {/* Big lock */}
          <rect x="130" y="195" width="140" height="120" rx="16" fill="#10b981"/>
          <rect x="148" y="212" width="104" height="88" rx="10" fill="#059669"/>
          {/* keyhole */}
          <circle cx="200" cy="248" r="18" fill="#ecfdf5"/>
          <rect x="193" y="254" width="14" height="24" rx="4" fill="#ecfdf5"/>
          {/* shackle */}
          <path d="M155 196 Q155 140 200 135 Q245 130 245 196" stroke="#10b981" strokeWidth="22" strokeLinecap="round" fill="none"/>
          <path d="M155 196 Q155 140 200 135 Q245 130 245 196" stroke="#ecfdf5" strokeWidth="12" strokeLinecap="round" fill="none"/>

          {/* Person flexing - strong! */}
          <circle cx="310" cy="110" r="32" fill="#fef3c7"/>
          <path d="M281 103 Q285 77 310 74 Q335 71 340 100" fill="#92400e"/>
          {/* sunglasses - cool */}
          <rect x="295" y="103" width="16" height="10" rx="3" fill="#1f2937"/>
          <rect x="314" y="103" width="16" height="10" rx="3" fill="#1f2937"/>
          <line x1="311" y1="107" x2="314" y2="107" stroke="#1f2937" strokeWidth="2"/>
          {/* smirk */}
          <path d="M300 122 Q312 130 322 122" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* flexing arm */}
          <path d="M285 135 Q265 120 258 100" stroke="#fef3c7" strokeWidth="14" strokeLinecap="round" fill="none"/>
          <circle cx="254" cy="94" r="14" fill="#fef3c7"/>
          <path d="M242 88 Q248 76 258 80" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round" fill="none"/>
          <text x="50" y="130" fontSize="22">💪</text>
          <text x="80" y="280" fontSize="20">✅</text>
          <text x="310" y="200" fontSize="18">🔐</text>
        </svg>
      ),
    },
    done: {
      badge: "🎉",
      badgeText: "You're back!",
      badgeSub: "Password reset successfully",
      caption: "Welcome back to Fresh Cart! 🛒",
      svg: (
        <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs drop-shadow-lg">
          <ellipse cx="200" cy="360" rx="120" ry="18" fill="#d1fae5" opacity="0.6"/>
          <circle cx="200" cy="180" r="100" fill="#ecfdf5" stroke="#10b981" strokeWidth="4"/>
          <path d="M145 180 L175 215 L260 145" stroke="#10b981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="80" y="80" fontSize="28">🎊</text>
          <text x="290" y="90" fontSize="28">🎉</text>
          <text x="60" y="300" fontSize="22">⭐</text>
          <text x="310" y="310" fontSize="22">✨</text>
        </svg>
      ),
    },
  };

  const c = content[step];
  return (
    <div className="hidden lg:flex w-[48%] bg-emerald-50 dark:bg-emerald-900/20 flex-col items-center justify-center p-12 relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-emerald-200/40 dark:bg-emerald-700/20" />
      <div className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full bg-emerald-200/30 dark:bg-emerald-700/10" />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">
        {c.svg}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 border border-emerald-100 dark:border-emerald-800">
          <span className="text-2xl">{c.badge}</span>
          <div>
            <p className="font-bold text-gray-800 dark:text-white text-sm">{c.badgeText}</p>
            <p className="text-emerald-600 text-xs">{c.badgeSub}</p>
          </div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium px-4">
          {c.caption}
        </p>
      </div>
    </div>
  );
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await forgotPassword({ email });
      if (data.statusMsg === "success") {
        toast.success("Reset code sent to your email!");
        setStep("code");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await verifyResetCode({ resetCode: code });
      if (data.status === "Success") setStep("newPassword");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await resetPassword({ email, newPassword });
      if (data.token) {
        toast.success("Password reset successfully! 🎉");
        setStep("done");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const stepIndex = { email: 0, code: 1, newPassword: 2, done: 3 };
  const steps = ["email", "code", "newPassword"];

  return (
    <div className="min-h-screen flex w-full">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-extrabold text-emerald-600 tracking-tight">Fresh Cart</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {step === "done" ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">All Done! 🎉</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Redirecting you to login...</p>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                  {step === "email" ? "Forgot Password?" : step === "code" ? "Enter Code" : "New Password"}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                  {step === "email"
                    ? "No worries! Enter your email and we'll send a reset code."
                    : step === "code"
                    ? `We sent a 6-digit code to ${email}`
                    : "Enter your new strong password below."}
                </p>

                {/* Step dots */}
                <div className="flex items-center gap-2 mb-8">
                  {steps.map((s, i) => (
                    <React.Fragment key={s}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 scale-110" :
                        stepIndex[step] > i ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                      }`}>{i + 1}</div>
                      {i < 2 && <div className={`flex-1 h-1 rounded-full transition-all ${stepIndex[step] > i ? "bg-emerald-400" : "bg-gray-100 dark:bg-gray-700"}`} />}
                    </React.Fragment>
                  ))}
                </div>

                {step === "email" && (
                  <form onSubmit={handleSendEmail} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="w-full px-5 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400"
                    />
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-bold rounded-full transition-all text-sm shadow-md">
                      {loading ? "Sending..." : "Send Reset Code"}
                    </button>
                  </form>
                )}

                {step === "code" && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      required
                      maxLength={6}
                      className="w-full px-5 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400 text-center tracking-widest font-mono text-lg"
                    />
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-bold rounded-full transition-all text-sm shadow-md">
                      {loading ? "Verifying..." : "Verify Code"}
                    </button>
                    <button type="button" onClick={() => setStep("email")} className="w-full py-2 text-gray-400 text-sm hover:text-gray-600 dark:hover:text-gray-300">
                      ← Change email
                    </button>
                  </form>
                )}

                {step === "newPassword" && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min 6 chars)"
                      required
                      minLength={6}
                      className="w-full px-5 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all text-sm placeholder-gray-400"
                    />
                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-50 text-white dark:text-gray-900 font-bold rounded-full transition-all text-sm shadow-md">
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </form>
                )}
              </>
            )}

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              <Link href="/login" className="text-emerald-600 font-bold hover:text-emerald-700">
                ← Back to Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="p-4 text-center text-xs text-gray-400 dark:text-gray-600">
          © 2024 FreshCart. All rights reserved.
        </div>
      </div>

      {/* Right - Illustration (changes per step) */}
      <ForgotIllustration step={step} />
    </div>
  );
}
