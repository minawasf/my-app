import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

import { LOGO_URL } from "@/constants/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { label: 'All Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Brands', href: '/brands' },
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: "Men's Fashion", href: '/products?category=mens' },
    { label: "Women's Fashion", href: '/products?category=womens' },
  ];

  const accountLinks = [
    { label: 'My Account', href: '/account' },
    { label: 'Order History', href: '/account/orders' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Shopping Cart', href: '/cart' },
    { label: 'Sign In', href: '/login' },
    { label: 'Create Account', href: '/register' },
  ];

  const supportLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Help Center', href: '/help' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Track Order', href: '/track-order' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 font-exo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4 max-w-sm">
              <div className="bg-white rounded-lg p-3 inline-block mb-6">
                <Image 
                  src={LOGO_URL} 
                  alt="FreshCart" 
                  width={160} 
                  height={31} 
                  className="h-8 w-auto"
                />
              </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-4">
              <a href="tel:+18001234567" className="flex items-center gap-3 text-gray-400 hover:text-primary-600 transition-colors group">
                <Phone className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 (800) 123-4567</span>
              </a>
              <a href="mailto:support@freshcart.com" className="flex items-center gap-3 text-gray-400 hover:text-primary-600 transition-colors group">
                <Mail className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm">support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 group">
                <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-base font-bold mb-6">Shop</h3>
            <ul className="space-y-4">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-600 text-sm transition-colors block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-base font-bold mb-6">Account</h3>
            <ul className="space-y-4">
              {accountLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-600 text-sm transition-colors block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-base font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-600 text-sm transition-colors block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white text-base font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-600 text-sm transition-colors block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © {currentYear} FreshCart. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-1.5 text-gray-400">
               <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-4 bg-white/10 rounded flex items-center justify-center">Visa</span>
                  <span className="w-6 h-4 bg-white/10 rounded flex items-center justify-center px-6 py-3">Mastercard</span>
                  <span className="w-6 h-4 bg-white/10 rounded flex items-center justify-center px-6 py-3">PayPal</span>
               </span>
            </div>
            <div className="flex gap-4">
              {/* Payment icons represent common providers mentioned in design instructions */}
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Visa</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Mastercard</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;