import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { Order } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200 p-8 sm:p-10 text-gray-900 print:p-0 print:border-none print:shadow-none">
          
          {/* Action buttons (hidden when printing) */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-100 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-[#2A120D] hover:bg-[#651B17] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Invoice Header */}
          <div className="flex justify-between items-start mt-4">
            <div>
              <BrandLogo size="md" light={false} />
              <p className="text-[11px] text-gray-500 mt-2">
                DESI DRIP Flagship Studio<br />
                M.M. Alam Road, Gulberg III, Lahore, Pakistan<br />
                NTN: 8291048-2 · care@desidrip.com
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-widest text-[#C96852] font-semibold">
                TAX INVOICE / RECEIPT
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mt-0.5">
                {order.orderNumber}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase bg-gray-100 text-gray-800">
                Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
              </span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-2 gap-6 my-6 p-4 rounded-xl bg-gray-50 text-xs border border-gray-200">
            <div>
              <span className="text-gray-400 uppercase font-semibold text-[10px] block mb-1">
                Billed To:
              </span>
              <p className="font-bold text-gray-900">{order.customer.name}</p>
              <p className="text-gray-600">{order.customer.email}</p>
              <p className="text-gray-600 font-mono">{order.customer.phone}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-semibold text-[10px] block mb-1">
                Delivery Destination:
              </span>
              <p className="text-gray-800">{order.shippingAddress.streetAddress}</p>
              <p className="text-gray-800">{order.shippingAddress.area}, {order.shippingAddress.city}</p>
              <p className="text-gray-800">{order.shippingAddress.province}, {order.shippingAddress.postalCode}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7EFE5] text-[#1B0E0A] font-semibold uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-3 font-medium text-[#1B0E0A]">{item.productName}</td>
                    <td className="py-2.5 px-3 font-mono">{item.size}</td>
                    <td className="py-2.5 px-3 text-center tabular-nums">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">PKR {item.unitPrice.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-semibold tabular-nums">PKR {item.totalPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">PKR {order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount ({order.couponCode || 'Promo'})</span>
                  <span className="tabular-nums font-semibold">-PKR {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="tabular-nums">{order.shippingFee === 0 ? 'FREE' : `PKR ${order.shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-[#1B0E0A]">
                <span>Grand Total</span>
                <span className="text-[#651B17] tabular-nums">PKR {order.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Signoff */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center text-[10px] text-gray-400">
            <p>Thank you for supporting authentic Pakistani fashion & craftsmanship.</p>
            <p className="mt-0.5">Official DESI DRIP e-commerce platform · www.desidrip.com</p>
          </div>

        </div>
      </div>
    </div>
  );
};
