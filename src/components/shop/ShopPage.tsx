import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, Gender } from '../../types';

export const ShopPage: React.FC = () => {
  const { products, selectedCategory, searchQuery, setQuickViewProduct, navigateTo } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'all');
  const [activeGender, setActiveGender] = useState<string>('all');
  const [activeSize, setActiveSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Sync with store state changes if category was passed from hero or nav
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      // Gender filter
      if (activeGender !== 'all' && prod.gender !== activeGender && prod.gender !== 'unisex') {
        return false;
      }
      // Size filter
      if (activeSize !== 'all') {
        const hasSize = prod.variants.some((v) => v.size === activeSize && v.stock > 0);
        if (!hasSize) return false;
      }
      // Price filter
      const effectivePrice = prod.salePrice || prod.price;
      if (effectivePrice > priceMax) {
        return false;
      }
      // In stock
      if (inStockOnly && prod.totalStock <= 0) {
        return false;
      }
      // Search query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          prod.name.toLowerCase().includes(q) ||
          prod.categoryName.toLowerCase().includes(q) ||
          prod.fabric.toLowerCase().includes(q) ||
          (prod.badge && prod.badge.toLowerCase().includes(q)) ||
          prod.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, activeGender, activeSize, priceMax, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveGender('all');
    setActiveSize('all');
    setPriceMax(10000);
    setInStockOnly(false);
  };

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'traditional-wear', label: 'Traditional Wear' },
    { id: 'casual-wear', label: 'Casual Wear' },
    { id: 'womens-wear', label: "Women's Wear" },
    { id: 'mens-wear', label: "Men's Wear" },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen text-[#21130F] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Banner Header */}
        <div className="mb-8 pb-6 border-b border-[#E8D8C8] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C96852] uppercase">
              DESI DRIP CATALOG
            </p>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1B0E0A] mt-1">
              {activeCategory === 'all'
                ? 'All Collections'
                : categories.find((c) => c.id === activeCategory)?.label || 'Shop'}
            </h1>
            <p className="text-xs sm:text-sm text-[#21130F]/70 mt-1 max-w-xl">
              Authentic Pakistani formal suits, luxury stitched lawn, everyday eastern pret, and curated accessories.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* View Mode */}
            <div className="hidden sm:flex p-1 bg-[#EFE4D6] rounded-lg border border-[#E0CFBD]">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  gridCols === 3 ? 'bg-white text-[#1B0E0A] shadow-xs' : 'text-[#21130F]/60'
                }`}
                aria-label="3 columns grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  gridCols === 4 ? 'bg-white text-[#1B0E0A] shadow-xs' : 'text-[#21130F]/60'
                }`}
                aria-label="4 columns grid"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 bg-[#EFE4D6] hover:bg-[#E8D8C8] px-3.5 py-2 rounded-lg text-xs font-semibold text-[#1B0E0A] border border-[#E0CFBD] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#651B17]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs font-semibold text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer shadow-xs"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filter (3 cols on desktop) */}
          <aside
            className={`lg:col-span-3 bg-[#FBF6EE] p-6 rounded-2xl border border-[#E8D8C8] space-y-6 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D8C8]">
              <div className="flex items-center gap-2 font-serif-display text-lg font-bold text-[#1B0E0A]">
                <Filter className="w-4 h-4 text-[#651B17]" />
                <span>Filter Catalog</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#C96852] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#651B17] mb-2.5">
                Category
              </h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      activeCategory === cat.id
                        ? 'bg-[#651B17] text-white font-semibold'
                        : 'text-[#21130F]/80 hover:bg-[#EFE4D6]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-75 font-mono">
                      {cat.id === 'all'
                        ? products.length
                        : products.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#651B17] mb-2.5">
                Department
              </h4>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'women', label: 'Women' },
                  { id: 'men', label: 'Men' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveGender(g.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                      activeGender === g.id
                        ? 'bg-[#2A120D] text-white border-[#2A120D]'
                        : 'bg-white text-[#21130F] border-[#E8D8C8] hover:bg-[#EFE4D6]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#651B17] mb-2.5">
                Size
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'XS', 'S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(s)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center uppercase transition-colors cursor-pointer ${
                      activeSize === s
                        ? 'bg-[#651B17] text-white border-[#651B17]'
                        : 'bg-white text-[#21130F] border-[#E8D8C8] hover:bg-[#EFE4D6]'
                    }`}
                  >
                    {s === 'all' ? 'All' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-[#651B17]">
                  Max Price
                </span>
                <span className="font-bold tabular-nums text-[#1B0E0A]">
                  PKR {priceMax.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={10000}
                step={500}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#651B17] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#21130F]/50 mt-1">
                <span>PKR 2,000</span>
                <span>PKR 10,000</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-[#E8D8C8]">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-[#651B17] w-4 h-4 cursor-pointer"
                />
                <span className="text-[#21130F] font-medium">In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid (9 cols on desktop) */}
          <div className="lg:col-span-9">
            <div className="flex justify-between items-center text-xs text-[#21130F]/60 mb-4 px-1">
              <span>Showing <strong>{filteredProducts.length}</strong> items</span>
              {searchQuery && (
                <span>
                  Query: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#FBF6EE] rounded-3xl p-12 text-center border border-[#E8D8C8] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center mx-auto text-[#651B17]">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
                  No styles found
                </h3>
                <p className="text-xs sm:text-sm text-[#21130F]/70 max-w-sm mx-auto">
                  We couldn&rsquo;t find any items matching your selected filters. Try broadening your price range or clearing category filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#651B17] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#2A120D] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
