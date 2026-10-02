import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const FeaturedCollection: React.FC = () => {
  const { products, navigateTo, setQuickViewProduct } = useStore();

  // Find the exact 3 products highlighted in the reference image
  const bestSellerProducts = [
    products.find((p) => p.name === 'Elegant Embroidered Suit') || products[0],
    products.find((p) => p.name === 'Casual Lawn Set') || products[1],
    products.find((p) => p.name === "Men's Kurta") || products[2],
  ].filter(Boolean);

  return (
    <section className="w-full bg-[#F7EFE5] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Description with Botanical Accent */}
          <div className="lg:col-span-4 relative flex flex-col justify-center space-y-6">
            
            {/* Elegant Botanical Branch SVG Motif on left side */}
            <div className="w-20 h-28 text-[#C59A70]/60 -mb-4">
              <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M10 130 C30 110, 50 60, 85 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Leaves */}
                <path
                  d="M85 10 C80 20, 65 25, 55 18 C65 10, 80 5, 85 10 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <path
                  d="M60 48 C45 42, 38 30, 48 20 C58 28, 62 40, 60 48 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M50 75 C65 78, 75 70, 72 58 C60 62, 52 70, 50 75 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M32 95 C20 85, 18 72, 28 65 C35 75, 36 88, 32 95 Z"
                  fill="currentColor"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#C96852] uppercase">
              FEATURED COLLECTIONS
            </p>

            {/* Main Section Title */}
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1B0E0A] tracking-tight leading-tight">
              Best Sellers
            </h2>

            {/* Description matching reference */}
            <p className="text-base text-[#21130F]/80 leading-relaxed font-light">
              Shop our most loved pieces, crafted for comfort, style and everyday confidence.
            </p>

            {/* CTA Button matching reference */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="group inline-flex items-center gap-2.5 bg-[#651B17] hover:bg-[#2A120D] text-[#F8EEE5] text-xs sm:text-sm font-medium tracking-wide uppercase px-6 py-3.5 rounded-md shadow transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>VIEW ALL COLLECTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Product Cards matching reference */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {bestSellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
