import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo, setQuickViewProduct } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-[#E8D8C8]">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C96852] uppercase">
            YOUR CURATED SELECTIONS
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1B0E0A] mt-1">
            My Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#21130F]/70 mt-1">
            Saved styles you adore. Keep track of stock availability and move items directly into your bag.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-[#FBF6EE] rounded-3xl p-12 sm:p-16 text-center border border-[#E8D8C8] shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center mx-auto text-[#651B17]">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs sm:text-sm text-[#21130F]/70 leading-relaxed">
              Explore our new seasonal drop and tap the heart icon on any piece you want to save for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="bg-[#651B17] hover:bg-[#2A120D] text-white text-xs font-semibold px-7 py-3 rounded-full transition-colors cursor-pointer"
            >
              Discover Best Sellers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
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
  );
};
