import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Tag, Check, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, Gender } from '../../types';
import { heroModelImg, productBlackSuitImg, productCreamLawnImg, productMensKurtaImg } from '../../data/mockData';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState<number>(4500);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<ProductCategory>('womens-wear');
  const [gender, setGender] = useState<Gender>('women');
  const [fabric, setFabric] = useState('Pure Raw Silk');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [badge, setBadge] = useState<'New' | 'Bestseller' | 'Sale' | 'Limited' | 'Trending' | undefined>(undefined);
  const [totalStock, setTotalStock] = useState<number>(25);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`DD-PR-${Math.floor(100 + Math.random() * 900)}`);
    setPrice(4500);
    setSalePrice(undefined);
    setCategory('womens-wear');
    setGender('women');
    setFabric('Pure Lawn Cotton');
    setShortDesc('Luxury embroidered stitched pret suit with matching dupatta.');
    setDesc('Mastercrafted Pakistani formal wear featuring intricate gold resham work.');
    setBadge('New');
    setTotalStock(30);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setPrice(p.price);
    setSalePrice(p.salePrice);
    setCategory(p.category);
    setGender(p.gender);
    setFabric(p.fabric);
    setShortDesc(p.shortDescription);
    setDesc(p.description);
    setBadge(p.badge);
    setTotalStock(p.totalStock);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        sku,
        price,
        salePrice: salePrice && salePrice > 0 ? salePrice : undefined,
        category,
        categoryName: category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        gender,
        fabric,
        shortDescription: shortDesc,
        description: desc,
        badge,
        totalStock,
      });
    } else {
      addProduct({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku,
        price,
        salePrice: salePrice && salePrice > 0 ? salePrice : undefined,
        costPrice: Math.round(price * 0.45),
        category,
        categoryName: category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        gender,
        description: desc,
        shortDescription: shortDesc,
        fabric,
        careInstructions: ['Dry clean or gentle hand wash', 'Iron inside out'],
        features: ['Stitched Ready-to-Wear Pret', 'Authentic Embroidery'],
        images: [
          category === 'mens-wear' ? productMensKurtaImg : productBlackSuitImg,
          heroModelImg,
        ],
        badge,
        isFeatured: true,
        rating: 5.0,
        reviewCount: 0,
        totalStock,
        lowStockThreshold: 5,
        status: 'published',
        tags: [category, gender, 'New Season'],
        variants: [
          { id: `v-${Date.now()}-s`, sku: `${sku}-S`, size: 'S', color: 'Default', colorHex: '#1B0E0A', stock: Math.round(totalStock * 0.3) },
          { id: `v-${Date.now()}-m`, sku: `${sku}-M`, size: 'M', color: 'Default', colorHex: '#1B0E0A', stock: Math.round(totalStock * 0.4) },
          { id: `v-${Date.now()}-l`, sku: `${sku}-L`, size: 'L', color: 'Default', colorHex: '#1B0E0A', stock: Math.round(totalStock * 0.3) },
        ],
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
            Product Catalog Management
          </h2>
          <p className="text-xs text-[#21130F]/60">
            Create, update pricing, manage variants, and assign badges.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#651B17] hover:bg-[#2A120D] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title, SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E8D8C8] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-[#E8D8C8] rounded-xl px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="traditional-wear">Traditional Wear</option>
          <option value="casual-wear">Casual Wear</option>
          <option value="womens-wear">Women's Wear</option>
          <option value="mens-wear">Men's Wear</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7EFE5] text-[#1B0E0A] uppercase tracking-wider text-[10px] font-semibold border-b border-[#E8D8C8]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C8]/60 text-gray-800">
              {filtered.map((prod) => (
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
                        <span className="font-semibold text-[#1B0E0A] block">{prod.name}</span>
                        <span className="text-[10px] text-gray-500">{prod.fabric}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-xs">{prod.sku}</td>
                  <td className="py-3 px-4 capitalize">{prod.categoryName}</td>
                  <td className="py-3 px-4 font-semibold text-[#651B17] tabular-nums">
                    PKR {(prod.salePrice || prod.price).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-bold tabular-nums ${
                      prod.totalStock <= prod.lowStockThreshold ? 'text-red-600' : 'text-green-700'
                    }`}>
                      {prod.totalStock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {prod.badge ? (
                      <span className="text-[10px] bg-[#EFE4D6] text-[#651B17] font-semibold px-2 py-0.5 rounded">
                        {prod.badge}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#651B17] hover:bg-[#EFE4D6] transition-colors cursor-pointer"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto select-none">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-[#FBF6EE] rounded-3xl shadow-2xl border border-[#E8D8C8] p-6 sm:p-8 animate-in zoom-in-95">
              <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Pakistani Pret'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Price (PKR) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs tabular-nums focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Sale Price (PKR, Optional)</label>
                    <input
                      type="number"
                      placeholder="Leave empty for regular price"
                      value={salePrice || ''}
                      onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs tabular-nums focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ProductCategory)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    >
                      <option value="traditional-wear">Traditional Wear</option>
                      <option value="casual-wear">Casual Wear</option>
                      <option value="womens-wear">Women's Wear</option>
                      <option value="mens-wear">Men's Wear</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Badge</label>
                    <select
                      value={badge || ''}
                      onChange={(e) => setBadge((e.target.value || undefined) as any)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    >
                      <option value="">No Badge</option>
                      <option value="New">New</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Sale">Sale</option>
                      <option value="Limited">Limited</option>
                      <option value="Trending">Trending</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Fabric Specification</label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1B0E0A] mb-1">Total Stock</label>
                    <input
                      type="number"
                      value={totalStock}
                      onChange={(e) => setTotalStock(Number(e.target.value))}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs tabular-nums focus:outline-none focus:border-[#651B17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Short Description</label>
                  <input
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1B0E0A] mb-1">Full Craftsmanship Description</label>
                  <textarea
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-lg p-3 text-xs focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C8]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-[#EFE4D6] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#651B17] hover:bg-[#2A120D] text-white px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                  >
                    Save Changes
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
