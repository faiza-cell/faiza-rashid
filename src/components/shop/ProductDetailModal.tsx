import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ArrowRight, Ruler, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    navigateTo,
  } = useStore();

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product?.variants[0]?.size || 'M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const stock = currentVariant?.stock ?? product.totalStock;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, currentVariant?.color, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    setQuickViewProduct(null);
    navigateTo('product', { productId: product.id });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto select-none">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FBF6EE] rounded-3xl shadow-2xl border border-[#E8D8C8] overflow-hidden animate-in zoom-in-95 duration-200">
          
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#21130F] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[3/4] sm:aspect-auto bg-[#EFE4D6]">
              <img
                src={product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#651B17] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-[#C96852] uppercase">
                  {product.categoryName}
                </p>
                <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mt-1">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex text-[#C59A70]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#21130F]/60">({product.reviewCount})</span>
                </div>

                <div className="mt-3">
                  <span className="font-serif-display text-2xl font-bold text-[#651B17] tabular-nums">
                    PKR {(product.salePrice || product.price).toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-[#21130F]/80 mt-3 line-clamp-3 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Size Selector */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1B0E0A]">Size: {selectedSize}</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#C96852] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Ruler className="w-3 h-3" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        disabled={v.stock === 0}
                        onClick={() => setSelectedSize(v.size)}
                        className={`w-9 h-9 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer flex items-center justify-center border ${
                          selectedSize === v.size
                            ? 'bg-[#651B17] text-white border-[#651B17]'
                            : 'bg-white text-[#1B0E0A] border-[#E8D8C8]'
                        }`}
                      >
                        {v.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-[#E8D8C8]">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={stock <= 0}
                    className="flex-1 bg-[#651B17] hover:bg-[#2A120D] text-white py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2.5 rounded-lg border border-[#E8D8C8] hover:bg-white text-[#1B0E0A] transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4" fill={isWishlisted ? '#651B17' : 'none'} color={isWishlisted ? '#651B17' : 'currentColor'} />
                  </button>
                </div>

                <button
                  onClick={handleViewFullDetails}
                  className="w-full text-center text-xs text-[#651B17] font-semibold hover:underline flex items-center justify-center gap-1 py-1"
                >
                  <span>View Complete Details & Reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
