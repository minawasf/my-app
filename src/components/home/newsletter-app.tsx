import React from 'react';
import Image from 'next/image';
import { Mail, ArrowRight, Apple, PlayCircle, CheckCircle, Smartphone } from 'lucide-react';

/**
 * NewsletterApp component
 * A dual-purpose section containing an email subscription form and mobile app promotion.
 * Designed with pixel-perfect accuracy following the FreshCart brand guidelines.
 */
export default function NewsletterApp() {
  return (
      <section className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-[#f8fafc]/50 dark:bg-gray-800/50 border border-[#f1f5f9] dark:border-gray-700 rounded-[2rem] p-6 md:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Newsletter Subscription */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#10b981] flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <Mail size={28} />
                </div>
                  <div>
                    <h3 className="text-[#1f2937] dark:text-gray-100 text-sm font-bold tracking-wider uppercase">Newsletter</h3>
                    <p className="text-[#6b7280] dark:text-gray-400 text-xs font-semibold">50,000+ subscribers</p>
                  </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-[2rem] leading-tight font-bold text-[#1f2937] dark:text-gray-100 max-w-md">
                  Get the Freshest Updates <br className="hidden md:block" /> Delivered Free
                </h2>
                <p className="text-[#6b7280] dark:text-gray-400 text-base font-medium max-w-lg">
                  Weekly recipes, seasonal offers & exclusive member perks.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: CheckCircle, text: "Fresh Picks Weekly" },
                  { icon: CheckCircle, text: "Free Delivery Codes" },
                  { icon: CheckCircle, text: "Members-Only Deals" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-full border border-[#f1f5f9] dark:border-gray-600 shadow-sm">
                      <item.icon size={16} className="text-[#10b981]" />
                      <span className="text-xs font-semibold text-[#1f2937] dark:text-gray-100">{item.text}</span>
                    </div>
                ))}
              </div>

              <form className="max-w-xl group" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="w-full px-6 py-4 rounded-[1rem] border border-[#f1f5f9] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all"
                      />
                  </div>
                  <button className="px-8 py-4 bg-[#10b981] hover:bg-[#059669] text-white rounded-[1rem] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 active:scale-95">
                    Subscribe
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[0.75rem] text-[#6b7280]">
                  <span className="text-[#f59e0b]">✨</span>
                  Unsubscribe anytime. No spam, ever.
                </p>
              </form>
            </div>

            {/* Right Column: Mobile App Interaction Area */}
            <div className="lg:w-[420px] bg-[#0f172a] rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              {/* Abstract decorative circles */}
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-6">
                  <Smartphone size={14} className="text-emerald-400" />
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Mobile App</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Shop Faster on Our App</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                  Get app-exclusive deals & 15% off your first order.
                </p>

                <div className="space-y-3">
                  <a 
                    href="#" 
                    className="flex items-center gap-3 w-full p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Apple size={32} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight leading-none mb-1">Download on</p>
                      <p className="text-lg text-white font-bold leading-none">App Store</p>
                    </div>
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center gap-3 w-full p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <PlayCircle size={32} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight leading-none mb-1">Get it on</p>
                      <p className="text-lg text-white font-bold leading-none">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-white text-xs font-bold ml-1">4.9</span>
                </div>
                <div className="text-slate-400 text-xs font-semibold">100K+ downloads</div>
              </div>

              {/* Mockup Image Element (Optional visual flair as seen in some designs) */}
              <div className="absolute -bottom-12 -right-12 w-64 h-64 opacity-10 pointer-events-none rotate-12">
                <Smartphone size={200} className="text-white" />
              </div>
            </div>

          </div>
        </div>

        {/* Features Row - Integrated Utility Signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { title: "Free Shipping", desc: "On orders over 500 EGP", icon: "🚚", bg: "bg-blue-50 dark:bg-blue-900/30" },
              { title: "Easy Returns", desc: "14-day return policy", icon: "🔄", bg: "bg-orange-50 dark:bg-orange-900/30" },
              { title: "Secure Payment", desc: "100% secure checkout", icon: "🛡️", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
              { title: "24/7 Support", desc: "Contact us anytime", icon: "🎧", bg: "bg-purple-50 dark:bg-purple-900/30" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-[#1f2937] dark:text-gray-100 whitespace-nowrap">{feature.title}</h4>
                  <p className="text-[11px] text-[#6b7280] dark:text-gray-400 font-medium leading-tight">{feature.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}