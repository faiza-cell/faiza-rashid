import React, { useState } from 'react';
import { Tag, Plus, Check, X, Percent, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCouponActive } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minOrder, setMinOrder] = useState<number>(3000);
  const [desc, setDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discountValue) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrder,
      active: true,
      expiryDate: '2026-12-31',
      description: desc || `${discountValue}${discountType === 'percentage' ? '%' : ' PKR'} off orders above PKR ${minOrder.toLocaleString()}`,
    });

    setIsModalOpen(false);
    setCode('');
    setDesc('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Coupons & Promotional Discounts
          </h2>
          <p className="text-xs text-[#21130F]/60">
            Create promotional codes like DRIP40 or seasonal Eid discounts for customers.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#651B17] hover:bg-[#2A120D] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promo Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`p-5 rounded-2xl border transition-all ${
              coupon.active
                ? 'bg-white border-[#E8D8C8] shadow-xs'
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-base font-bold text-[#651B17] tracking-wider block">
                  {coupon.code}
                </span>
                <span className="text-xs font-semibold text-[#1B0E0A] mt-0.5 block">
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% OFF`
                    : `PKR ${coupon.discountValue} OFF`}
                </span>
              </div>
              <button
                onClick={() => toggleCouponActive(coupon.id)}
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  coupon.active
                    ? 'bg-green-100 text-green-800 hover:bg-red-100 hover:text-red-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-green-100 hover:text-green-800'
                }`}
              >
                {coupon.active ? 'Active' : 'Disabled'}
              </button>
            </div>

            <p className="text-xs text-[#21130F]/70 mt-2 line-clamp-2">
              {coupon.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#E8D8C8]/60 flex justify-between items-center text-[11px] text-[#21130F]/60">
              <span>Min Order: PKR {coupon.minOrderAmount.toLocaleString()}</span>
              <span>Used: {coupon.usageCount} times</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto select-none">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#FBF6EE] rounded-3xl shadow-2xl border border-[#E8D8C8] p-6 sm:p-8 animate-in zoom-in-95">
              <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mb-4">
                New Promo Voucher
              </h3>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EIDFEST25"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Discount Type</label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed PKR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">
                      {discountType === 'percentage' ? 'Percent Value (%)' : 'PKR Discount'} *
                    </label>
                    <input
                      type="number"
                      required
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Minimum Cart Amount (PKR)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Public Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 20% off all Pakistani traditional wear"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C8]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-[#EFE4D6]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#651B17] hover:bg-[#2A120D] text-white px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
                  >
                    Publish Code
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
