import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Tag,
  Star,
  Settings,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Store,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminInventory } from './AdminInventory';
import { AdminCoupons } from './AdminCoupons';
import { AdminReviews } from './AdminReviews';
import { AdminSettings } from './AdminSettings';

export const AdminLayout: React.FC = () => {
  const { navigateTo, user, logout } = useStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders & Shipping', icon: ShoppingBag },
    { id: 'inventory', label: 'Inventory Audit', icon: Layers },
    { id: 'coupons', label: 'Coupons & Promo', icon: Tag },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4EDE4] flex flex-col md:flex-row text-[#21130F]">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#1B0E0A] text-[#F8EEE5] p-4 flex items-center justify-between border-b border-[#2A120D]">
        <BrandLogo size="sm" light={true} />
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs bg-[#651B17] text-white px-2.5 py-1 rounded"
          >
            Storefront
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1 rounded text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`w-full md:w-64 bg-[#1B0E0A] text-[#F8EEE5] p-5 flex flex-col justify-between shrink-0 border-r border-[#2A120D] ${
          mobileSidebarOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="hidden md:flex flex-col items-center pb-6 border-b border-[#2A120D]">
            <BrandLogo size="md" light={true} />
            <span className="text-[10px] tracking-widest text-[#C59A70] uppercase mt-2 font-semibold bg-[#2A120D] px-2.5 py-0.5 rounded">
              Management Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#651B17] text-white shadow-sm'
                      : 'text-[#E8D8C8]/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D9826D]' : 'text-[#C59A70]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#2A120D] space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center justify-center gap-2 bg-[#2A120D] hover:bg-[#651B17] text-[#E8D8C8] hover:text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#C59A70]" />
            <span>Return to Storefront</span>
          </button>

          <div className="flex items-center justify-between text-xs text-[#E8D8C8]/60 pt-2">
            <div className="truncate">
              <span className="font-semibold text-white block truncate">{user?.name || 'Admin'}</span>
              <span className="text-[10px] opacity-75">{user?.role || 'Staff'}</span>
            </div>
            <button
              onClick={logout}
              className="text-xs text-red-400 hover:text-red-300 p-1 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'inventory' && <AdminInventory />}
        {activeTab === 'coupons' && <AdminCoupons />}
        {activeTab === 'reviews' && <AdminReviews />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>

    </div>
  );
};
