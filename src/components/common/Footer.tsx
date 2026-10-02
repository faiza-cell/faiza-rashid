import React, { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed!', 'Thank you for subscribing to DESI DRIP exclusive updates.', 'success');
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#1B0E0A] text-[#F8EEE5] pt-16 pb-12 border-t border-[#2A120D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#2A120D]">
          
          {/* Col 1: Brand & Identity (Left) */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="focus:outline-none cursor-pointer text-left"
              aria-label="DESI DRIP Home"
            >
              <BrandLogo size="lg" light={true} />
            </button>
            <p className="text-xs text-[#E8D8C8]/70 leading-relaxed font-light pt-2 max-w-xs">
              Rooted in Pakistani heritage, tailored for the modern spirit. Luxury pret, stitched lawn, and couture craftsmanship delivered nationwide.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#F8EEE5] uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E8D8C8]/80 font-light">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { query: 'New' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'traditional-wear' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#F8EEE5] uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E8D8C8]/80 font-light">
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('return-exchange')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Return & Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms-conditions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy-policy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Connected & Newsletter (Right) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-[#F8EEE5] uppercase">
              Stay Connected
            </h4>
            <p className="text-xs text-[#E8D8C8]/80 leading-relaxed font-light">
              Be the first to know about new arrivals, exclusive offers and more.
            </p>

            {/* Newsletter Input matching reference */}
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#24130F] border border-[#3A1C16] text-[#F8EEE5] placeholder-[#E8D8C8]/40 text-xs sm:text-sm px-4 py-3 rounded-md focus:outline-none focus:border-[#C96852] pr-12 transition-colors"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#C96852] hover:bg-[#b85b46] text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Icons matching reference: Facebook, Instagram, TikTok, Pinterest, YouTube */}
            <div className="flex items-center space-x-4 pt-2 text-[#E8D8C8]/70">
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); showToast('Facebook', 'DESI DRIP Official Facebook'); }}
                className="hover:text-[#C59A70] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); showToast('Instagram', 'DESI DRIP Official Instagram @desidrip.pk'); }}
                className="hover:text-[#C59A70] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#tiktok"
                onClick={(e) => { e.preventDefault(); showToast('TikTok', 'DESI DRIP TikTok @desidrip.pk'); }}
                className="hover:text-[#C59A70] transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.78 1.43-.04 2.74-.93 3.24-2.27.24-.62.33-1.3.32-1.97V.02z"/>
                </svg>
              </a>
              <a
                href="#pinterest"
                onClick={(e) => { e.preventDefault(); showToast('Pinterest', 'DESI DRIP Moodboards on Pinterest'); }}
                className="hover:text-[#C59A70] transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); showToast('YouTube', 'DESI DRIP Campaign Films on YouTube'); }}
                className="hover:text-[#C59A70] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer matching reference */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D8C8]/60 space-y-3 sm:space-y-0">
          <p>© 2025 Desi Drip. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-[#E8D8C8]/70">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#C96852] fill-current inline-block" />
            <span>for Fashion</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
