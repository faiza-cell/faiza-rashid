import React, { useState } from 'react';
import { User, Package, MapPin, LogOut, Shield, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../common/BrandLogo';

export const AccountPage: React.FC = () => {
  const { user, logout, orders, navigateTo, login } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  if (!user) {
    return (
      <div className="w-full bg-[#F7EFE5] min-h-[70vh] flex items-center justify-center p-6 text-[#21130F]">
        <div className="max-w-md w-full bg-[#FBF6EE] p-8 rounded-3xl border border-[#E8D8C8] shadow-sm text-center space-y-4">
          <BrandLogo size="md" light={false} />
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Customer Account
          </h2>
          <p className="text-xs text-[#21130F]/70">
            Please sign in to view your order history and manage delivery preferences.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => login('sarah.farooq@gmail.com', 'customer')}
              className="bg-[#651B17] text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer hover:bg-[#2A120D] transition-colors"
            >
              Sign In (Demo Customer)
            </button>
            <button
              onClick={() => login('admin@desidrip.com', 'admin')}
              className="bg-[#2A120D] text-[#F8EEE5] py-2.5 rounded-xl text-xs font-semibold cursor-pointer hover:bg-[#651B17] transition-colors"
            >
              Sign In (Demo Admin)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders matching this user if any, or show all recent for demo
  const userOrders = orders;

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-[#FBF6EE] p-6 sm:p-8 rounded-3xl border border-[#E8D8C8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#EFE4D6] border border-[#C59A70] flex items-center justify-center text-[#651B17] font-serif-display text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1B0E0A]">
                  {user.name}
                </h1>
                {user.role === 'admin' && (
                  <span className="bg-[#651B17] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                    Admin Staff
                  </span>
                )}
              </div>
              <p className="text-xs text-[#21130F]/60 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="bg-[#2A120D] hover:bg-[#651B17] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#C59A70]" />
                <span>Admin Console</span>
              </button>
            )}

            <button
              onClick={logout}
              className="bg-[#EFE4D6] hover:bg-red-50 text-[#21130F] hover:text-red-700 text-xs font-semibold px-4 py-2 rounded-xl transition-colors border border-[#E0CFBD] cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8D8C8] text-xs font-semibold uppercase tracking-wider gap-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#651B17] text-[#651B17]'
                : 'border-transparent text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'border-[#651B17] text-[#651B17]'
                : 'border-transparent text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {userOrders.length === 0 ? (
              <div className="bg-[#FBF6EE] p-8 rounded-2xl border border-[#E8D8C8] text-center">
                <p className="text-xs text-[#21130F]/60">You have no order history yet.</p>
              </div>
            ) : (
              userOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8D8C8]">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#651B17]">
                        {order.orderNumber}
                      </span>
                      <p className="text-[11px] text-[#21130F]/50 mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus}
                      </span>

                      <button
                        onClick={() => navigateTo('track')}
                        className="text-xs text-[#651B17] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Track</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#E8D8C8]">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover object-top rounded-md"
                        />
                        <div className="flex-1 text-xs">
                          <h4 className="font-semibold text-[#1B0E0A] line-clamp-1">{item.productName}</h4>
                          <p className="text-[11px] text-[#21130F]/60">Size: {item.size} · Qty: {item.quantity}</p>
                          <span className="font-bold text-[#651B17] tabular-nums mt-0.5 block">
                            PKR {item.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E8D8C8] flex justify-between items-center text-xs">
                    <span className="text-[#21130F]/70">
                      Payment: <strong className="capitalize">{order.paymentMethod.toUpperCase()}</strong> ({order.paymentStatus})
                    </span>
                    <span className="text-sm font-bold text-[#1B0E0A] tabular-nums">
                      Total: PKR {order.grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C96852]">
                Default Home Address
              </span>
              <h4 className="font-semibold text-sm text-[#1B0E0A]">Dr. Sarah Farooq</h4>
              <p className="text-xs text-[#21130F]/80">House 44, Street 7, Phase 5, DHA</p>
              <p className="text-xs text-[#21130F]/80">Lahore, Punjab 54792</p>
              <p className="text-xs font-mono text-[#651B17] pt-1">0300-8429182</p>
            </div>

            <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-dashed border-[#C59A70] flex flex-col items-center justify-center text-center p-8 space-y-2 cursor-pointer hover:bg-[#EFE4D6]/50 transition-colors">
              <MapPin className="w-8 h-8 text-[#C59A70]" />
              <h4 className="font-semibold text-xs text-[#1B0E0A]">Add New Address</h4>
              <p className="text-[11px] text-[#21130F]/60">Save alternate work or gifting locations in Pakistan</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
