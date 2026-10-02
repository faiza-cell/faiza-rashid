import React from 'react';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Fast & Reliable Delivery',
      subtitle: 'Across Pakistan',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: '100% Safe & Trusted',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Designed for You',
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      subtitle: "We're Here to Help",
    },
  ];

  return (
    <div className="w-full bg-[#1B0E0A] py-8 sm:py-10 border-y border-[#2A120D] text-[#F8EEE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 group select-none"
              >
                {/* Gold Outline Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#2A120D]/80 border border-[#3A1C16] flex items-center justify-center text-[#C59A70] group-hover:text-[#D9826D] group-hover:border-[#C59A70]/50 transition-colors shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F8EEE5] tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#E8D8C8]/60 mt-0.5 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
