import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Embroidered Suit',
    'Lawn Set',
    'Velvet Shawl',
    "Men's Kurta",
    'Rose Hoodie',
    'Potli Bag',
  ];

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
        );
      });

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product', { productId });
  };

  const handleSearchAll = (term: string) => {
    setIsSearchOpen(false);
    navigateTo('shop', { query: term });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-[#FBF6EE] rounded-2xl shadow-2xl border border-[#E8D8C8] overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 bg-[#F7EFE5] border-b border-[#E8D8C8] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#C96852] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by suit name, fabric, embroidery, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  handleSearchAll(searchTerm);
                }
              }}
              className="flex-1 bg-transparent text-[#1B0E0A] placeholder-[#21130F]/40 text-base sm:text-lg font-medium focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 rounded-lg text-[#21130F]/60 hover:text-[#1B0E0A] hover:bg-[#E8D8C8] transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {searchTerm.trim() === '' ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-[#651B17] uppercase tracking-wider mb-3">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchTerm(term);
                        }}
                        className="text-xs bg-[#EFE4D6] hover:bg-[#E8D8C8] text-[#21130F] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer border border-[#E0CFBD]"
                      >
                        <Tag className="w-3 h-3 text-[#C96852]" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#651B17] uppercase tracking-wider mb-3">
                    Quick Categories
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Traditional Wear', 'Casual Wear', "Women's Wear", "Men's Wear", 'Accessories'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('shop', { query: cat });
                        }}
                        className="text-left text-xs p-2.5 rounded-lg bg-white/70 hover:bg-white text-[#1B0E0A] border border-[#E8D8C8] transition-all hover:border-[#C59A70]"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-[#21130F]/70 space-y-2">
                <p className="text-sm">No products found matching &ldquo;{searchTerm}&rdquo;</p>
                <p className="text-xs text-[#21130F]/50">
                  Try checking the spelling or searching with broader terms like &ldquo;Kurta&rdquo; or &ldquo;Lawn&rdquo;.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#21130F]/70 pb-2 border-b border-[#E8D8C8]">
                  <span>{filteredProducts.length} results found</span>
                  <button
                    onClick={() => handleSearchAll(searchTerm)}
                    className="text-[#651B17] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all in catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#E8D8C8]/60">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="py-3 flex items-center gap-4 hover:bg-[#EFE4D6]/50 rounded-xl px-2 transition-colors cursor-pointer group"
                    >
                      <div className="w-14 h-16 rounded-md bg-[#EAE0D5] overflow-hidden shrink-0 border border-[#E8D8C8]">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-[#1B0E0A] group-hover:text-[#651B17] transition-colors">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#21130F]/60">
                          {prod.categoryName} · {prod.fabric}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#651B17] tabular-nums">
                          PKR {(prod.salePrice || prod.price).toLocaleString()}
                        </span>
                        {prod.badge && (
                          <div className="text-[10px] text-[#C96852] font-semibold uppercase">
                            {prod.badge}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
