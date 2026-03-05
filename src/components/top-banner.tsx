import React from 'react';
import { Truck, Gift, Phone, Mail, User, UserPlus } from 'lucide-react';

const TopBanner = () => {
  return (
      <div className="hidden lg:block text-sm border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            {/* Left Side: Delivery Notices */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Truck size={14} className="text-emerald-600" />
                <span className="font-medium">Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <Gift size={14} className="text-emerald-600" />
                <span className="font-medium">New Arrivals Daily</span>
              </span>
            </div>

            {/* Right Side: Contact and Auth */}
            <div className="flex items-center gap-6">
              {/* Contact Info */}
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <a 
                  href="tel:+18001234567" 
                  className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  <Phone size={12} strokeWidth={2.5} />
                  <span className="font-medium">+1 (800) 123-4567</span>
                </a>
                <a 
                  href="mailto:support@freshcart.com" 
                  className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  <Mail size={12} strokeWidth={2.5} />
                  <span className="font-medium">support@freshcart.com</span>
                </a>
              </div>

              {/* Divider */}
              <span className="w-px h-4 bg-gray-200 dark:bg-gray-600"></span>

              {/* Auth Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="/login" 
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors"
                >
                  <User size={12} strokeWidth={2.5} />
                  <span className="font-semibold">Sign In</span>
                </a>
                <a 
                  href="/register" 
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors"
                >
                  <UserPlus size={12} strokeWidth={2.5} />
                  <span className="font-semibold">Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TopBanner;