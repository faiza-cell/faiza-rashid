import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Tag,
  Building,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod, ShippingAddress, Order } from '../../types';
import { PAKISTAN_PROVINCES, POPULAR_PAKISTAN_CITIES } from '../../data/mockData';
import { BrandLogo } from '../common/BrandLogo';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    navigateTo,
    user,
    settings,
  } = useStore();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '0300-');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('Gulberg III');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('54000');
  const [notes, setNotes] = useState('');

  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const standardShipping = getCartShipping();
  const shippingFee = shippingSpeed === 'express' ? standardShipping + 200 : standardShipping;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F7EFE5] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-[#FBF6EE] p-10 rounded-3xl border border-[#E8D8C8] shadow-sm space-y-4">
          <BrandLogo size="md" light={false} />
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#21130F]/70">
            Please add your favorite Pakistani suits or kurtas before checking out.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#651B17] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#2A120D] transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  // Order Placement Handler
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !streetAddress || !city) {
      alert('Please fill in all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const address: ShippingAddress = {
        fullName,
        email,
        phone,
        streetAddress,
        area,
        city,
        province,
        postalCode,
        notes,
      };

      const newOrder = createOrder({
        customer: { name: fullName, email, phone },
        shippingAddress: address,
        paymentMethod,
      });

      setCompletedOrder(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  // Completed Order View
  if (completedOrder) {
    return (
      <div className="w-full bg-[#F7EFE5] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-[#FBF6EE] rounded-3xl p-8 sm:p-12 border border-[#E8D8C8] shadow-xl space-y-6 text-[#21130F]">
          
          <div className="text-center space-y-3 pb-6 border-b border-[#E8D8C8]">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C96852]">
              Order Confirmed
            </p>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1B0E0A]">
              Shukriya, {completedOrder.customer.name}!
            </h1>
            <p className="text-xs sm:text-sm text-[#21130F]/70 max-w-md mx-auto">
              Your order has been recorded in our system. A confirmation SMS and email have been dispatched to <strong>{completedOrder.customer.phone}</strong>.
            </p>
            <div className="inline-block bg-[#EFE4D6] px-4 py-2 rounded-lg font-mono text-xs font-bold text-[#651B17] mt-2">
              Order Reference: {completedOrder.orderNumber}
            </div>
          </div>

          {/* Courier & Tracking Details */}
          <div className="p-4 bg-white/80 rounded-2xl border border-[#E8D8C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#21130F]/60 uppercase tracking-wider block">
                Assigned Courier
              </span>
              <strong className="text-sm font-semibold text-[#1B0E0A] flex items-center gap-1.5 mt-0.5">
                <Truck className="w-4 h-4 text-[#C96852]" />
                {completedOrder.courier} (Tracking: {completedOrder.trackingNumber})
              </strong>
            </div>
            <button
              onClick={() => navigateTo('track')}
              className="bg-[#2A120D] hover:bg-[#651B17] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              Track Order Live →
            </button>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#EFE4D6]/60 rounded-xl border border-[#E0CFBD]">
              <h4 className="font-semibold text-[#1B0E0A] mb-1">Shipping Address</h4>
              <p>{completedOrder.shippingAddress.streetAddress}</p>
              <p>{completedOrder.shippingAddress.area}, {completedOrder.shippingAddress.city}</p>
              <p>{completedOrder.shippingAddress.province}, {completedOrder.shippingAddress.postalCode}</p>
              <p className="mt-1 font-mono text-[#651B17]">{completedOrder.shippingAddress.phone}</p>
            </div>

            <div className="p-4 bg-[#EFE4D6]/60 rounded-xl border border-[#E0CFBD]">
              <h4 className="font-semibold text-[#1B0E0A] mb-1">Payment Summary</h4>
              <p className="capitalize">
                Method: <strong>{completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : completedOrder.paymentMethod}</strong>
              </p>
              <p>Payment Status: <strong className="text-amber-800 uppercase text-[11px]">{completedOrder.paymentStatus}</strong></p>
              <p className="mt-2 text-sm font-bold text-[#651B17] tabular-nums">
                Grand Total: PKR {completedOrder.grandTotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Ordered Items List */}
          <div>
            <h4 className="font-semibold text-xs text-[#1B0E0A] uppercase tracking-wider mb-3">
              Items Ordered ({completedOrder.items.length})
            </h4>
            <div className="divide-y divide-[#E8D8C8] bg-white rounded-xl border border-[#E8D8C8] p-3">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-14 object-cover object-top rounded-md border border-[#E8D8C8]"
                    />
                    <div>
                      <h5 className="font-semibold text-[#1B0E0A]">{item.productName}</h5>
                      <p className="text-[11px] text-[#21130F]/60">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1B0E0A] tabular-nums">
                    PKR {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Return & Continue */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8D8C8]">
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold text-[#651B17] hover:underline cursor-pointer"
            >
              Print Receipt
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="bg-[#651B17] hover:bg-[#2A120D] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#651B17] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-[#21130F]/60">
            <Lock className="w-3.5 h-3.5 text-[#C96852]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Multi-Step Information (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Customer Contact */}
              <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
                  <span className="w-6 h-6 rounded-full bg-[#651B17] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Tariq"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="fatima@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Pakistan Mobile Number (for Courier SMS updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Pakistan Shipping Address */}
              <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
                  <span className="w-6 h-6 rounded-full bg-[#651B17] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                    Delivery Address (Pakistan)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Province *
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
                    >
                      {PAKISTAN_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
                    >
                      {POPULAR_PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Area / Sector / Colony *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DHA Phase 5 / Gulberg / Bahria Town / Clifton"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Complete Street Address (House/Flat No, Street, Landmark) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House 24, Street 9, Sector C"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="54000"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call before arrival"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 3: Shipping Method */}
              <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
                  <span className="w-6 h-6 rounded-full bg-[#651B17] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                    Shipping Method
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setShippingSpeed('standard')}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      shippingSpeed === 'standard'
                        ? 'border-[#651B17] bg-[#EFE4D6]/60 shadow-xs ring-1 ring-[#651B17]'
                        : 'border-[#E8D8C8] bg-white hover:bg-[#FBF6EE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingSpeed === 'standard'}
                      onChange={() => setShippingSpeed('standard')}
                      className="mt-0.5 accent-[#651B17]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1B0E0A]">Standard Nationwide Delivery</span>
                      </div>
                      <p className="text-[11px] text-[#21130F]/60 mt-0.5">2–4 business days via TCS / Leopards</p>
                      <p className="text-xs font-bold text-[#651B17] mt-1 tabular-nums">
                        {standardShipping === 0 ? 'FREE' : `PKR ${standardShipping}`}
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingSpeed('express')}
                    className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      shippingSpeed === 'express'
                        ? 'border-[#651B17] bg-[#EFE4D6]/60 shadow-xs ring-1 ring-[#651B17]'
                        : 'border-[#E8D8C8] bg-white hover:bg-[#FBF6EE]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingSpeed"
                      checked={shippingSpeed === 'express'}
                      onChange={() => setShippingSpeed('express')}
                      className="mt-0.5 accent-[#651B17]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1B0E0A]">Express Priority Air Cargo</span>
                      </div>
                      <p className="text-[11px] text-[#21130F]/60 mt-0.5">Next day / 48hr delivery in major cities</p>
                      <p className="text-xs font-bold text-[#651B17] mt-1 tabular-nums">
                        PKR {standardShipping + 200}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* STEP 4: Payment Method */}
              <div className="bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8D8C8]">
                  <span className="w-6 h-6 rounded-full bg-[#651B17] text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                    Payment Method
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#651B17] bg-[#EFE4D6]/60 shadow-xs ring-1 ring-[#651B17]'
                        : 'border-[#E8D8C8] bg-white hover:bg-[#FBF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#651B17]"
                      />
                      <Banknote className="w-5 h-5 text-[#651B17]" />
                      <div>
                        <h4 className="font-semibold text-xs text-[#1B0E0A]">
                          Cash on Delivery (COD)
                        </h4>
                        <p className="text-[11px] text-[#21130F]/60">
                          Pay cash to the courier upon receiving your parcel
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded">
                      Most Popular
                    </span>
                  </label>

                  {/* Online Card */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#651B17] bg-[#EFE4D6]/60 shadow-xs ring-1 ring-[#651B17]'
                        : 'border-[#E8D8C8] bg-white hover:bg-[#FBF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#651B17]"
                      />
                      <CreditCard className="w-5 h-5 text-[#651B17]" />
                      <div>
                        <h4 className="font-semibold text-xs text-[#1B0E0A]">
                          Debit / Credit Card
                        </h4>
                        <p className="text-[11px] text-[#21130F]/60">
                          Visa, MasterCard, PayPak secured by 3D-Secure
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* EasyPaisa / JazzCash */}
                  <label
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#651B17] bg-[#EFE4D6]/60 shadow-xs ring-1 ring-[#651B17]'
                        : 'border-[#E8D8C8] bg-white hover:bg-[#FBF6EE]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'easypaisa'}
                        onChange={() => setPaymentMethod('easypaisa')}
                        className="accent-[#651B17]"
                      />
                      <Smartphone className="w-5 h-5 text-[#651B17]" />
                      <div>
                        <h4 className="font-semibold text-xs text-[#1B0E0A]">
                          EasyPaisa / JazzCash
                        </h4>
                        <p className="text-[11px] text-[#21130F]/60">
                          Direct mobile wallet payment approval via OTP
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Placement (5 cols) */}
            <div className="lg:col-span-5 bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] shadow-sm space-y-6 sticky top-24">
              <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A] pb-3 border-b border-[#E8D8C8]">
                Order Summary ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs py-2 border-b border-[#E8D8C8]/60">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-16 rounded-md object-cover object-top border border-[#E8D8C8]"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-semibold text-[#1B0E0A] line-clamp-1">{item.product.name}</h5>
                        <p className="text-[11px] text-[#21130F]/60">Size: {item.size} · Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-[#651B17] tabular-nums">
                        PKR {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Applicator */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#EFE4D6] p-2.5 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-[#1B0E0A]">
                      <Tag className="w-3.5 h-3.5 text-[#C96852]" />
                      <span>{appliedCoupon.code} applied</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[#651B17] text-[11px] font-semibold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 bg-white border border-[#E8D8C8] px-3 py-2 text-xs rounded-lg uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-[#2A120D] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#651B17] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs text-[#21130F] pt-2 border-t border-[#E8D8C8]">
                <div className="flex justify-between">
                  <span className="text-[#21130F]/70">Subtotal</span>
                  <span className="font-medium tabular-nums">PKR {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Coupon Discount</span>
                    <span className="font-semibold tabular-nums">-PKR {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#21130F]/70">Shipping Fee</span>
                  <span className="font-medium tabular-nums">
                    {shippingFee === 0 ? <span className="text-green-700 font-semibold">FREE</span> : `PKR ${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8D8C8] flex justify-between text-base font-bold text-[#1B0E0A]">
                  <span>Grand Total</span>
                  <span className="text-[#651B17] tabular-nums">
                    PKR {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#651B17] hover:bg-[#2A120D] text-[#F8EEE5] py-4 rounded-xl font-medium text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#651B17]/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <span>PROCESSING ORDER...</span>
                ) : (
                  <>
                    <span>PLACE ORDER (PKR {grandTotal.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#21130F]/60 text-center space-y-1">
                <p>🚚 Free exchange within 14 days of delivery.</p>
                <p>📞 Order verification call from our Lahore studio.</p>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
