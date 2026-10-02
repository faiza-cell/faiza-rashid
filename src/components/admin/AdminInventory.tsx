import React, { useState } from 'react';
import { Package, Plus, Minus, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminInventory: React.FC = () => {
  const { products, adjustStock } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Real-Time Inventory & Restock
          </h2>
          <p className="text-xs text-[#21130F]/60">
            Monitor size-level stock variations, restock popular Pakistani stitched suits, and prevent backorder cancellations.
          </p>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-[#E8D8C8] rounded-xl px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
        >
          <option value="all">All Collections</option>
          <option value="traditional-wear">Traditional Wear</option>
          <option value="casual-wear">Casual Wear</option>
          <option value="womens-wear">Women's Wear</option>
          <option value="mens-wear">Men's Wear</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider text-[10px] font-semibold border-b border-[#E8D8C8]">
              <tr>
                <th className="py-3 px-4">Design / Piece</th>
                <th className="py-3 px-4">Total Stock</th>
                <th className="py-3 px-4">Variant Breakdown</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C8]/60 text-gray-800">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FBF6EE]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 rounded object-cover object-top border border-[#E8D8C8]"
                      />
                      <div>
                        <strong className="text-[#1B0E0A] block">{prod.name}</strong>
                        <span className="text-[10px] text-gray-500 font-mono">SKU: {prod.sku}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-bold tabular-nums text-sm">
                    {prod.totalStock} units
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {prod.variants.map((v) => (
                        <span
                          key={v.id}
                          className={`text-[11px] px-2 py-0.5 rounded font-mono font-medium border ${
                            v.stock === 0
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : v.stock <= 3
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          {v.size}: <strong>{v.stock}</strong>
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {prod.totalStock === 0 ? (
                      <span className="text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    ) : prod.totalStock <= prod.lowStockThreshold ? (
                      <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                        <Check className="w-3 h-3" /> Healthy
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {prod.variants[0] && (
                        <>
                          <button
                            onClick={() => adjustStock(prod.id, prod.variants[0].id, 5)}
                            className="bg-[#EFE4D6] hover:bg-[#E8D8C8] text-[#1B0E0A] px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
                            title="Add 5 units to first variant"
                          >
                            +5 Units
                          </button>
                          <button
                            onClick={() => adjustStock(prod.id, prod.variants[0].id, 10)}
                            className="bg-[#2A120D] hover:bg-[#651B17] text-white px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
                            title="Add 10 units to first variant"
                          >
                            +10 Units
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
