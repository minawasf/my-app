import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: <Truck className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Free Shipping",
      description: "On orders over 500 EGP",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Secure Payment",
      description: "100% secure transactions",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-500",
    },
    {
      icon: <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "Easy Returns",
      description: "14-day return policy",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
    },
    {
      icon: <Headset className="w-5 h-5 lg:w-6 lg:h-6" />,
      title: "24/7 Support",
      description: "Dedicated support team",
      bgColor: "bg-purple-50",
      textColor: "text-purple-500",
    },
  ];

  return (
    <section className="py-8 bg-[#f8fafc] dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center sm:text-left"
            >
              <div
                className={`${feature.bgColor} ${feature.textColor} w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105`}
              >
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;