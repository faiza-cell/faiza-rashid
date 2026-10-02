import React, { useState, useEffect } from 'react';
import {
  Search,
  User as UserIcon,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Truck,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    activeView,
    navigateTo,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
    settings,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for smooth solid background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop', view: 'shop' as const },
    { label: 'New Arrivals', view: 'shop' as const, params: { query: 'New' } },
    { label: 'Collections', view: 'shop' as const, params: { category: 'traditional-wear' } },
    { label: 'About Us', view: 'about' as const },
    { label: 'Contact', view: 'contact' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT BAR matching reference image exactly */}
      <div className="bg-[#1B0E0A] border-b border-[#2A120D] text-[#F8EEE5] text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 text-[#E8D8C8] whitespace-nowrap">
            <span className="text-sm">🚚</span>
            <span className="font-normal tracking-wide hidden sm:inline">
              Free Shipping All Over Pakistan
            </span>
            <span className="font-normal tracking-wide sm:hidden">
              Free Shipping Across PK
            </span>
          </div>

          {/* Center Motto */}
          <div className="hidden md:flex items-center gap-1.5 text-[#C59A70] tracking-wider font-light">
            <Sparkles className="w-3 h-3 text-[#D9826D]" />
            <span>Fashion That Speaks You</span>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#E8D8C8]">
            <button
              onClick={() => navigateTo('track')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <PackageCheck className="w-3 h-3 text-[#C59A70]" />
              <span className="hidden xs:inline">Track Order</span>
            </button>
            <span className="text-[#651B17] select-none">|</span>
            <button
              onClick={() => navigateTo('contact')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-[#C59A70]" />
              <span className="hidden xs:inline">Help</span>
            </button>

            {/* Quick Admin Access pill */}
            <span className="text-[#651B17] select-none">|</span>
            <button
              onClick={() => navigateTo('admin')}
              className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-[#C96852] text-white'
                  : 'bg-[#2A120D] text-[#C59A70] hover:bg-[#651B17] hover:text-white'
              }`}
              title="Toggle Admin Control Panel"
            >
              {activeView === 'admin' ? '← Store' : 'Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1B0E0A]/95 backdrop-blur-md shadow-xl py-2.5 sm:py-3 border-b border-[#2A120D]'
            : 'bg-[#1B0E0A]/85 backdrop-blur-sm py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="group focus:outline-none text-left cursor-pointer flex items-center"
            aria-label="DESI DRIP Home"
          >
            <BrandLogo size="md" light={true} />
          </button>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive =
                activeView === item.view &&
                (!item.params ||
                  (item.params.query && item.params.query === 'New') ||
                  (item.params.category && activeView === 'shop'));

              return (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.view, item.params)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 tracking-wide ${
                    isActive
                      ? 'text-[#F8EEE5] font-semibold'
                      : 'text-[#E8D8C8]/80 hover:text-[#F8EEE5]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#C96852] rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Actions (Search, Wishlist, Account, Cart, Mobile Menu) */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#F8EEE5]">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#E8D8C8] hover:text-white cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#E8D8C8] hover:text-white cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#651B17] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User / Account */}
            <button
              onClick={() => {
                if (user) {
                  navigateTo('account');
                } else {
                  setIsAuthOpen(true);
                }
              }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#E8D8C8] hover:text-white cursor-pointer"
              aria-label="Account"
            >
              <UserIcon className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#E8D8C8] hover:text-white cursor-pointer flex items-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 bg-[#C96852] text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold shadow">
                {totalCartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#E8D8C8] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1B0E0A] border-t border-[#2A120D] px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-3 text-base">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigateTo(item.view, item.params);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-[#2A120D]/60 text-[#F8EEE5] hover:text-[#C96852] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-[#C59A70] hover:text-white font-medium flex items-center justify-between"
              >
                <span>Admin Panel Management</span>
                <span className="text-xs bg-[#651B17] text-white px-2 py-0.5 rounded">Staff</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#2A120D] text-xs text-[#E8D8C8]/70 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C96852]" />
                <span>Standard Delivery PKR 250 (Free over PKR 5,000)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C59A70]" />
                <span>100% Authentic Pakistani Pret & Couture</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
