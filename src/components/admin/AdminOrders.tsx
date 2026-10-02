import React, { useState } from 'react';
import { Search, Filter, Eye, Printer, Truck, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { InvoiceModal } from './InvoiceModal';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, cancelOrder } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  // Status Update Modal State
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Confirmed');
  const [courierName, setCourierName] = useState('TCS Express');
  const [trackingId, setTrackingId] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm);
    const matchStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const openStatusModal = (order: Order) => {
    setEditingOrder(order);
    setNewStatus(order.orderStatus);
    setCourierName(order.courier || 'TCS Express');
    setTrackingId(order.trackingNumber || `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setUpdateNote(`Status updated to ${order.orderStatus}`);
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    updateOrderStatus(editingOrder.id, newStatus, trackingId, courierName, updateNote);
    setEditingOrder(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Orders & Shipments
          </h2>
          <p className="text-xs text-[#21130F]/60">
            Fulfill Pakistani customer orders, assign couriers, and generate printable receipts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E8D8C8] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#E8D8C8] rounded-xl px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider text-[10px] font-semibold border-b border-[#E8D8C8]">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C8]/60 text-gray-800">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-[#FBF6EE]/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#651B17]">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#1B0E0A] block">{order.customer.name}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{order.customer.phone}</span>
                  </td>
                  <td className="py-3 px-4">{order.shippingAddress.city}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-700">{order.items.length} item(s)</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#1B0E0A] tabular-nums">
                    PKR {order.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="uppercase text-[10px] bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium">
                      {order.paymentMethod} ({order.paymentStatus})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded ${
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
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openStatusModal(order)}
                        className="bg-[#EFE4D6] hover:bg-[#E8D8C8] text-[#1B0E0A] px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
                        title="Update Status"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setSelectedOrderForInvoice(order)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#651B17] hover:bg-[#EFE4D6] transition-colors cursor-pointer"
                        title="View / Print Invoice"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto select-none">
          <div
            onClick={() => setEditingOrder(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-[#FBF6EE] rounded-3xl shadow-2xl border border-[#E8D8C8] p-6 sm:p-8 animate-in zoom-in-95">
              <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mb-1">
                Update Order Status
              </h3>
              <p className="text-xs text-[#21130F]/60 mb-4 font-mono">
                {editingOrder.orderNumber} · {editingOrder.customer.name}
              </p>

              <form onSubmit={handleStatusSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Order Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Courier Partner</label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17] cursor-pointer"
                  >
                    <option value="TCS Express">TCS Express</option>
                    <option value="Leopards Courier">Leopards Courier</option>
                    <option value="Call Courier">Call Courier</option>
                    <option value="Trax Logistics">Trax Logistics</option>
                    <option value="M&P Logistics">M&P Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Tracking ID</label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. TCS-829104812"
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Status Note (Visible to Customer)</label>
                  <input
                    type="text"
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    placeholder="e.g. Dispatched via courier from Lahore hub"
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C8]">
                  <button
                    type="button"
                    onClick={() => setEditingOrder(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-[#EFE4D6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#651B17] hover:bg-[#2A120D] text-white px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Save Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedOrderForInvoice}
        onClose={() => setSelectedOrderForInvoice(null)}
      />
    </div>
  );
};
