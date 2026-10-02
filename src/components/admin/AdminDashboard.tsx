import React from 'react';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  TrendingUp,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { orders, products, reviews } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const lowStockProducts = products.filter((p) => p.totalStock <= p.lowStockThreshold);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
          Dashboard Overview
        </h2>
        <p className="text-xs text-[#21130F]/60 mt-0.5">
          Real-time performance analytics for DESI DRIP Pakistan operations.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#C59A70]">
            <span className="text-xs font-semibold text-[#21130F]/70 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#1B0E0A] tabular-nums">
            PKR {totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-green-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% from last month</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#C59A70]">
            <span className="text-xs font-semibold text-[#21130F]/70 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#1B0E0A] tabular-nums">
            {totalOrders}
          </div>
          <p className="text-[11px] text-[#21130F]/60">
            Across Lahore, Karachi, Islamabad & nationwide
          </p>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#C59A70]">
            <span className="text-xs font-semibold text-[#21130F]/70 uppercase tracking-wider">
              Listed Pret Pieces
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#1B0E0A] tabular-nums">
            {products.length} Designs
          </div>
          <p className="text-[11px] text-[#21130F]/60">
            All categories active & published
          </p>
        </div>

        {/* Pending Shipments */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#C59A70]">
            <span className="text-xs font-semibold text-[#21130F]/70 uppercase tracking-wider">
              Awaiting Dispatch
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl font-bold text-[#651B17] tabular-nums">
            {pendingOrders}
          </div>
          <p className="text-[11px] text-[#21130F]/60">
            Needs courier packing slip & pickup
          </p>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-xs">
              <strong className="block font-semibold">Inventory Alert: {lowStockProducts.length} product(s) low on stock!</strong>
              <span>Items like &ldquo;{lowStockProducts[0].name}&rdquo; have reached their reorder threshold.</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('inventory')}
            className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            Review Inventory
          </button>
        </div>
      )}

      {/* Grid: Recent Orders + Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Recent Orders Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E8D8C8] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D8C8]">
            <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
              Recent Orders
            </h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-[#651B17] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Order</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]/60">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FBF6EE]/60 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#651B17]">
                      {ord.orderNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-[#1B0E0A]">{ord.customer.name}</span>
                      <span className="text-[10px] text-gray-500 block">{ord.shippingAddress.city}</span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#1B0E0A] tabular-nums">
                      PKR {ord.grandTotal.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Pakistan Logistics Summary */}
          <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-3">
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Logistics Network
            </h3>
            <div className="space-y-2 text-xs text-[#21130F]/80">
              <div className="flex justify-between pb-1 border-b border-[#E8D8C8]">
                <span>Primary Courier:</span>
                <strong>TCS Express</strong>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#E8D8C8]">
                <span>Secondary Courier:</span>
                <strong>Leopards Courier</strong>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#E8D8C8]">
                <span>Dispatch Hub:</span>
                <strong>Lahore Studio</strong>
              </div>
              <div className="flex justify-between">
                <span>Free Shipping Threshold:</span>
                <strong className="text-[#651B17]">PKR 5,000</strong>
              </div>
            </div>
          </div>

          {/* Customer Reviews Moderation Alert */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8D8C8] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
                Reviews & Ratings
              </h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                {reviews.length} Total
              </span>
            </div>
            <p className="text-xs text-[#21130F]/70">
              Verified buyers praise the pure raw silk handfeel and intricate zardozi embroidery work.
            </p>
            <button
              onClick={() => onNavigateTab('reviews')}
              className="w-full bg-[#EFE4D6] hover:bg-[#E8D8C8] text-[#1B0E0A] py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Moderate Reviews →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
