import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    getCartSubtotal,
    getCartDiscount,
    getCartShipping,
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
    navigateTo,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getCartShipping();
  const total = getCartTotal();

  const freeShippingThreshold = settings.freeShippingThreshold || 5000;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF6EE] border-l border-[#E8D8C8] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8D8C8] flex items-center justify-between bg-[#F7EFE5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#651B17]" />
              <h2 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                Your Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-[#21130F]/60 hover:text-[#1B0E0A] hover:bg-[#E8D8C8]/60 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#2A120D] text-[#F8EEE5] px-5 py-3 text-xs border-b border-[#3A1C16]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#C59A70]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#C59A70] font-semibold">You unlocked FREE Shipping across Pakistan!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#D9826D] font-semibold">PKR {amountNeededForFreeShipping.toLocaleString()}</strong> more for FREE shipping
                  </span>
                )}
              </span>
              <span className="text-[10px] text-[#E8D8C8]/60 font-mono">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C96852] to-[#C59A70] rounded-full transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center mx-auto text-[#651B17]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#21130F]/60 max-w-xs mx-auto">
                    Explore our bestselling embroidered suits, luxury kurtas, and timeless pret collections.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="bg-[#2A120D] hover:bg-[#651B17] text-white text-xs font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/70 rounded-xl border border-[#E8D8C8] shadow-xs relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg bg-[#EFE4D6] overflow-hidden shrink-0 border border-[#E8D8C8]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-6">
                        <h4 className="text-xs sm:text-sm font-semibold text-[#1B0E0A] line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#21130F]/60 mt-0.5">
                        Size: <span className="font-medium text-[#1B0E0A]">{item.size}</span>
                        {item.color && (
                          <span className="ml-2">· {item.color}</span>
                        )}
                      </p>
                      <p className="text-xs font-semibold text-[#651B17] mt-1 tabular-nums">
                        PKR {item.unitPrice.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E8D8C8]/60">
                      <div className="flex items-center border border-[#E8D8C8] rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#EFE4D6] text-[#21130F] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1B0E0A] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#EFE4D6] text-[#21130F] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#21130F]/40 hover:text-red-700 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F7EFE5] border-t border-[#E8D8C8] space-y-4">
              
              {/* Promo Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#EFE4D6] border border-[#C59A70]/50 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-[#1B0E0A]">
                      <Tag className="w-3.5 h-3.5 text-[#C96852]" />
                      <span>Code: <strong>{appliedCoupon.code}</strong></span>
                      <span className="text-green-700 font-medium">
                        (-PKR {discount.toLocaleString()})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#651B17] hover:underline text-[11px] font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon: DRIP40, WELCOME10"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 bg-white border border-[#E8D8C8] px-3 py-2 text-xs rounded-md uppercase font-medium placeholder:normal-case placeholder:text-gray-400 focus:outline-none focus:border-[#C96852]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2A120D] hover:bg-[#651B17] text-white px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-[#21130F]">
                <div className="flex justify-between">
                  <span className="text-[#21130F]/70">Subtotal</span>
                  <span className="font-medium tabular-nums">PKR {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-PKR {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#21130F]/70">Delivery (Across Pakistan)</span>
                  <span className="font-medium tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-green-700 font-semibold uppercase text-[11px]">FREE</span>
                    ) : (
                      `PKR ${shipping}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8D8C8] flex justify-between text-sm sm:text-base font-bold text-[#1B0E0A]">
                  <span>Total</span>
                  <span className="text-[#651B17] tabular-nums">
                    PKR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#651B17] hover:bg-[#2A120D] text-[#F8EEE5] py-3.5 px-4 rounded-lg font-medium text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#651B17]/20 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#21130F]/50">
                Cash on Delivery (COD) & Online Payment available across Pakistan
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
