import React, { useState } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, Home, MapPin, Phone, Calendar } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, navigateTo } = useStore();
  const [query, setQuery] = useState('DD-2026-001042');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => orders[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  const statusSteps: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const clean = query.trim().toUpperCase();

    const matched = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.customer.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
        (o.trackingNumber && o.trackingNumber.toUpperCase().includes(clean))
    );

    if (matched) {
      setSearchedOrder(matched);
    } else {
      setErrorMessage(
        `No order found with reference "${query}". Please check your order ID or mobile number.`
      );
      setSearchedOrder(null);
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : -1;

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C96852] uppercase">
            LIVE DISPATCH TRACKING
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1B0E0A]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#21130F]/70 max-w-md mx-auto">
            Enter your DESI DRIP order reference number or mobile number to track real-time courier shipment.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#FBF6EE] p-4 sm:p-6 rounded-2xl border border-[#E8D8C8] shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Order Number (e.g. DD-2026-001042) or Phone Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-[#E8D8C8] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#651B17] hover:bg-[#2A120D] text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              Track Order
            </button>
          </form>

          {/* Quick Demo Pill */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[#21130F]/60">
            <span>Try demo order:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('DD-2026-001042');
                setSearchedOrder(orders[0]);
                setErrorMessage('');
              }}
              className="font-mono text-[#651B17] hover:underline cursor-pointer font-bold"
            >
              DD-2026-001042
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 mt-3">{errorMessage}</p>
          )}
        </div>

        {/* Tracking Details View */}
        {searchedOrder && (
          <div className="bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8] shadow-sm space-y-8 animate-in fade-in duration-300">
            
            {/* Top Order Badge Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D8C8]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C96852]">
                  Order Reference
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
                  {searchedOrder.orderNumber}
                </h3>
                <p className="text-xs text-[#21130F]/60 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:text-right">
                <div>
                  <span className="text-[11px] text-[#21130F]/60 uppercase tracking-wider block">
                    Courier Tracking
                  </span>
                  <span className="text-xs font-bold text-[#651B17] font-mono">
                    {searchedOrder.courier || 'TCS Express'} · {searchedOrder.trackingNumber || 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-[#1B0E0A] uppercase tracking-wider mb-6">
                Shipment Progress
              </h4>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#E8D8C8] -translate-y-1/2 z-0" />
                <div
                  className="hidden md:block absolute top-1/2 left-0 h-1 bg-[#651B17] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: `${Math.max(0, (currentStepIdx / (statusSteps.length - 1)) * 100)}%`,
                  }}
                />

                {/* Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 relative z-10">
                  {statusSteps.map((step, idx) => {
                    const isDone = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;

                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center text-center group"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                            isCurrent
                              ? 'bg-[#C96852] text-white ring-4 ring-[#C96852]/30 scale-110'
                              : isDone
                              ? 'bg-[#651B17] text-white'
                              : 'bg-white text-gray-400 border border-[#E8D8C8]'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-[11px] mt-2 leading-tight ${
                            isCurrent
                              ? 'font-bold text-[#651B17]'
                              : isDone
                              ? 'font-semibold text-[#1B0E0A]'
                              : 'text-gray-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status History Log */}
            <div className="bg-white/70 p-5 rounded-2xl border border-[#E8D8C8] space-y-3">
              <h4 className="text-xs font-semibold text-[#1B0E0A] uppercase tracking-wider">
                Live Courier Log
              </h4>
              <div className="space-y-2 text-xs">
                {searchedOrder.statusHistory.map((hist, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-2 border-b border-[#E8D8C8]/50 last:border-none last:pb-0">
                    <Clock className="w-3.5 h-3.5 text-[#C96852] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1B0E0A]">{hist.status}:</span>{' '}
                      <span className="text-[#21130F]/80">{hist.note}</span>
                      <p className="text-[10px] text-[#21130F]/50 mt-0.5">
                        {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(hist.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E8D8C8]">
              <div>
                <h4 className="text-xs font-semibold text-[#1B0E0A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C96852]" />
                  Destination
                </h4>
                <div className="text-xs text-[#21130F]/80 space-y-0.5">
                  <p className="font-semibold text-[#1B0E0A]">{searchedOrder.shippingAddress.fullName}</p>
                  <p>{searchedOrder.shippingAddress.streetAddress}</p>
                  <p>{searchedOrder.shippingAddress.area}, {searchedOrder.shippingAddress.city}</p>
                  <p>{searchedOrder.shippingAddress.province}</p>
                  <p className="font-mono text-[#651B17] pt-1">{searchedOrder.shippingAddress.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#1B0E0A] uppercase tracking-wider mb-2">
                  Package Contents
                </h4>
                <div className="space-y-2">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1">
                      <span>{item.quantity}x {item.productName} ({item.size})</span>
                      <span className="font-bold tabular-nums">PKR {item.totalPrice.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#E8D8C8] flex justify-between text-xs font-bold text-[#651B17]">
                    <span>Total Amount ({searchedOrder.paymentMethod.toUpperCase()})</span>
                    <span className="tabular-nums">PKR {searchedOrder.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
