import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const displayPrice = product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      handleCardClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#FBF6EE] rounded-2xl overflow-hidden border border-[#E8D8C8] transition-all duration-300 hover:shadow-lg hover:border-[#C59A70]/60 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE0D5]">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Secondary Image if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges matching reference: "New", "Bestseller" */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded shadow-sm ${
                product.badge === 'New'
                  ? 'bg-[#2A120D] text-[#F8EEE5]'
                  : product.badge === 'Bestseller'
                  ? 'bg-[#651B17] text-[#F8EEE5]'
                  : product.badge === 'Sale'
                  ? 'bg-[#C96852] text-white'
                  : 'bg-[#C59A70] text-[#1B0E0A]'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button floating top right */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-[#651B17] text-white'
              : 'bg-white/80 hover:bg-white text-[#21130F] hover:text-[#C96852]'
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Quick View Button hover reveal */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#1B0E0A]/90 hover:bg-[#1B0E0A] text-[#F8EEE5] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Details matching reference */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-medium text-sm sm:text-base text-[#21130F] group-hover:text-[#651B17] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#21130F]/60 mt-0.5 capitalize">
            {product.categoryName}
          </p>
        </div>

        {/* Bottom row: Price and Cart Icon Button matching reference */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8D8C8]/60">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm sm:text-base text-[#21130F] tabular-nums">
              PKR {hasSale ? product.salePrice?.toLocaleString() : displayPrice.toLocaleString()}
            </span>
            {hasSale && (
              <span className="text-xs text-[#21130F]/40 line-through tabular-nums">
                PKR {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Shopping cart button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-8 h-8 rounded-full border border-[#21130F]/20 hover:border-[#651B17] hover:bg-[#651B17] hover:text-white text-[#21130F] flex items-center justify-center transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
