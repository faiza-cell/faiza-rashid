import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { promoVelvetImg } from '../../data/mockData';

export const PromoBanner: React.FC = () => {
  const { navigateTo, settings } = useStore();

  return (
    <section className="w-full bg-[#1B0E0A] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-[#3A1C16] bg-[#F7EFE5]">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
          
          {/* Left Side: Macro Photo of Rich Maroon Velvet Fabric with Gold Embroidery */}
          <div className="md:col-span-6 relative overflow-hidden min-h-[260px] md:min-h-full">
            <img
              src={promoVelvetImg}
              alt="DESI DRIP Luxury Handcrafted Velvet Embroidery"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 pointer-events-none md:block hidden" />
          </div>

          {/* Right Side: Cream Background with Offer Typography & Botanical Accent */}
          <div className="md:col-span-6 bg-[#F7EFE5] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
            
            {/* Delicate Gold Botanical Leaf Line Accent */}
            <div className="absolute right-0 top-0 w-36 h-48 text-[#C59A70]/30 pointer-events-none transform translate-x-6 -translate-y-4">
              <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M10 130 C30 110, 50 60, 85 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M85 10 C80 20, 65 25, 55 18 C65 10, 80 5, 85 10 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M60 48 C45 42, 38 30, 48 20 C58 28, 62 40, 60 48 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M50 75 C65 78, 75 70, 72 58 C60 62, 52 70, 50 75 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>

            <div className="z-10 space-y-4">
              {/* Eyebrow */}
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#C96852] uppercase">
                {settings.bannerTitle || 'LIMITED TIME OFFER'}
              </p>

              {/* Offer Headline */}
              <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1B0E0A] tracking-tight leading-[1.1]">
                {settings.bannerDiscountText || 'Get Up To 40% OFF'}
              </h2>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-[#21130F]/80 font-normal">
                {settings.bannerSubtitle || 'On Your Favorite Styles'}
              </p>

              {/* Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop', { query: 'Sale' })}
                  className="group inline-flex items-center gap-2.5 bg-[#2A120D] hover:bg-[#651B17] text-[#F8EEE5] text-xs sm:text-sm font-medium tracking-wide uppercase px-7 py-3 rounded-full shadow transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
