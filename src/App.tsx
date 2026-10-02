import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { Toast } from './components/common/Toast';
import { ProductDetailModal } from './components/shop/ProductDetailModal';

// Home Page Sections matching reference image in exact order
import { HeroSection } from './components/home/HeroSection';
import { CategorySection } from './components/home/CategorySection';
import { FeaturedCollection } from './components/home/FeaturedCollection';
import { TrustStrip } from './components/home/TrustStrip';
import { PromoBanner } from './components/home/PromoBanner';

// Subpages
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AccountPage } from './components/pages/AccountPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { PolicyPages } from './components/pages/PolicyPages';

// Admin
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { activeView } = useStore();

  if (activeView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1B0E0A] text-[#21130F]">
      {/* Top Header & Navigation */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Category Cards */}
            <CategorySection />

            {/* 3. Featured Collections / Best Sellers */}
            <FeaturedCollection />

            {/* 4. Trust / Service Strip */}
            <TrustStrip />

            {/* 5. Promotional 40% OFF Banner */}
            <PromoBanner />
          </>
        )}

        {activeView === 'shop' && <ShopPage />}
        {activeView === 'product' && <ProductDetailPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'track' && <OrderTrackingPage />}
        {activeView === 'wishlist' && <WishlistPage />}
        {activeView === 'account' && <AccountPage />}
        {activeView === 'about' && <AboutUsPage />}
        {activeView === 'contact' && <ContactUsPage />}
        {activeView === 'size-guide' && <PolicyPages type="faq" />}
        {activeView === 'shipping-policy' && <PolicyPages type="shipping" />}
        {activeView === 'return-exchange' && <PolicyPages type="returns" />}
        {activeView === 'faq' && <PolicyPages type="faq" />}
        {activeView === 'terms-conditions' && <PolicyPages type="terms" />}
        {activeView === 'privacy-policy' && <PolicyPages type="privacy" />}
      </main>

      {/* Luxury Footer matching reference image */}
      <Footer />

      {/* Overlays & Modals */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <SizeGuideModal />
      <ProductDetailModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
