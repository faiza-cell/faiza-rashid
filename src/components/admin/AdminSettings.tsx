import React, { useState } from 'react';
import { Save, Store, Truck, Phone, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();

  const [form, setForm] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
          Store Settings & Pakistan Configuration
        </h2>
        <p className="text-xs text-[#21130F]/60">
          Configure Pakistan domestic shipping rates, free delivery thresholds, contact info, and promotional copy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Shipping & Delivery Settings */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
            <Truck className="w-5 h-5 text-[#651B17]" />
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Delivery & Shipping Parameters (Pakistan)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Free Shipping Threshold (PKR)
              </label>
              <input
                type="number"
                value={form.freeShippingThreshold}
                onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Free delivery above this cart value</span>
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Standard Shipping Fee (PKR)
              </label>
              <input
                type="number"
                value={form.standardShippingFee}
                onChange={(e) => setForm({ ...form, standardShippingFee: Number(e.target.value) })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Standard courier rate (TCS / Leopards)</span>
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Express Cargo Fee (PKR)
              </label>
              <input
                type="number"
                value={form.expressShippingFee}
                onChange={(e) => setForm({ ...form, expressShippingFee: Number(e.target.value) })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">Urgent priority dispatch</span>
            </div>
          </div>
        </div>

        {/* Announcement Bar & Promotions */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
            <Bell className="w-5 h-5 text-[#651B17]" />
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Top Announcement & Homepage Promotions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Left Announcement Text
              </label>
              <input
                type="text"
                value={form.announcementText}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Center Brand Tagline
              </label>
              <input
                type="text"
                value={form.announcementHighlight}
                onChange={(e) => setForm({ ...form, announcementHighlight: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Promotional Banner Headline
              </label>
              <input
                type="text"
                value={form.bannerDiscountText}
                onChange={(e) => setForm({ ...form, bannerDiscountText: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">
                Banner Subtitle
              </label>
              <input
                type="text"
                value={form.bannerSubtitle}
                onChange={(e) => setForm({ ...form, bannerSubtitle: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Studio Location */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
            <Store className="w-5 h-5 text-[#651B17]" />
            <h3 className="font-serif-display text-lg font-bold text-[#1B0E0A]">
              Brand Contact & Studio Address
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">Support Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">Helpline Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1B0E0A] mb-1">WhatsApp Helpline</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold text-[#1B0E0A] mb-1">Flagship Studio Address</label>
              <input
                type="text"
                value={form.storeAddress}
                onChange={(e) => setForm({ ...form, storeAddress: e.target.value })}
                className="w-full bg-[#FBF6EE] border border-[#E8D8C8] rounded-lg px-3 py-2 focus:outline-none focus:border-[#651B17]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#651B17] hover:bg-[#2A120D] text-white px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
};
