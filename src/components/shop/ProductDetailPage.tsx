import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Ruler,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen,
    reviews,
    addReview,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.variants[0]?.size || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.variants[0]?.color || '');
  const [quantity, setQuantity] = useState(1);

  // Review submission form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const stockAvailable = currentVariant?.stock ?? product.totalStock;

  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to your clipboard.', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    addReview({
      productId: product.id,
      userName: reviewName,
      userEmail: `${reviewName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      rating: reviewRating,
      title: reviewTitle || 'Verified Purchase Review',
      comment: reviewComment,
      isVerifiedPurchase: true,
    });
    setReviewSubmitted(true);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen text-[#21130F] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#21130F]/70">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 hover:text-[#651B17] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.categoryName}</span>
            <span>/</span>
            <span className="font-semibold text-[#1B0E0A]">{product.name}</span>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8] shadow-sm">
          
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#EFE4D6] ${
                    activeImageIndex === idx
                      ? 'border-[#651B17] shadow-sm scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE4D6] border border-[#E8D8C8]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#651B17] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#651B17] text-white'
                    : 'bg-white/90 hover:bg-white text-[#21130F] hover:text-[#651B17]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#21130F]/60 pb-1">
                <span className="uppercase tracking-widest font-semibold text-[#C96852]">
                  {product.categoryName}
                </span>
                <span className="font-mono">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1B0E0A] tracking-tight leading-tight mt-1">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C59A70]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1B0E0A]">
                  {product.rating} ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-[#E8D8C8]">
                <span className="font-serif-display text-3xl font-bold text-[#651B17] tabular-nums">
                  PKR {(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-[#21130F]/40 line-through tabular-nums">
                    PKR {product.price.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] bg-[#EFE4D6] text-[#651B17] px-2 py-0.5 rounded font-medium">
                  Tax Included
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light mt-4">
                {product.shortDescription}
              </p>

              {/* Size Selection */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1B0E0A]">
                    Select Size: <strong className="text-[#651B17]">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#C96852] hover:text-[#651B17] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedSize === v.size;
                    const isOutOfStock = v.stock === 0;

                    return (
                      <button
                        key={v.id}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(v.size)}
                        className={`min-w-12 h-10 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center border ${
                          isOutOfStock
                            ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#651B17] text-white border-[#651B17] shadow-sm'
                            : 'bg-white text-[#1B0E0A] border-[#E8D8C8] hover:border-[#C59A70]'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>

                {/* Real-time stock status */}
                <p className="text-xs mt-1">
                  {stockAvailable <= 0 ? (
                    <span className="text-red-600 font-medium">Currently Out of Stock</span>
                  ) : stockAvailable <= 5 ? (
                    <span className="text-amber-700 font-medium">Hurry! Only {stockAvailable} left in stock</span>
                  ) : (
                    <span className="text-green-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                    </span>
                  )}
                </p>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-4">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#E8D8C8] rounded-lg bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 hover:bg-[#EFE4D6] transition-colors cursor-pointer text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(stockAvailable, q + 1))}
                      className="px-3.5 py-2.5 hover:bg-[#EFE4D6] transition-colors cursor-pointer text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={stockAvailable <= 0}
                    className="flex-1 bg-[#651B17] hover:bg-[#2A120D] text-white py-3.5 px-6 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                </div>

                {/* Direct Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={stockAvailable <= 0}
                  className="w-full bg-[#C96852] hover:bg-[#b85b46] text-white py-3 px-6 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 shadow-md"
                >
                  BUY NOW (CASH ON DELIVERY / CARD)
                </button>
              </div>

              {/* Trust Callouts */}
              <div className="mt-6 pt-6 border-t border-[#E8D8C8] grid grid-cols-2 gap-4 text-xs text-[#21130F]/80">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#C96852]" />
                  <span>2–4 Days Nationwide Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#C96852]" />
                  <span>14-Day Hassle-Free Exchange</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C96852]" />
                  <span>100% Genuine Stitched Pret</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-[#651B17] hover:underline cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share This Style</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12 bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A] mb-3">
                Fabric & Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-[#21130F]/80 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-4 p-3 bg-[#EFE4D6]/70 rounded-xl text-xs text-[#1B0E0A]">
                <strong>Fabric Type:</strong> {product.fabric}
              </div>
            </div>

            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A] mb-3">
                Product Features
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#21130F]/80">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C96852] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#1B0E0A] mb-3">
                Care Instructions
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#21130F]/80">
                {product.careInstructions.map((care, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#651B17] shrink-0 mt-2" />
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D8C8]">
            <div>
              <h3 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                Customer Reviews
              </h3>
              <p className="text-xs text-[#21130F]/60 mt-1">
                Real feedback from verified Pakistani fashion customers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-2xl font-bold text-[#651B17]">
                {product.rating}
              </span>
              <div className="flex text-[#C59A70]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#21130F]/60">
                ({productReviews.length} verified ratings)
              </span>
            </div>
          </div>

          {/* Reviews List & Write Review Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Reviews list */}
            <div className="lg:col-span-7 space-y-4">
              {productReviews.length === 0 ? (
                <p className="text-xs text-[#21130F]/60 italic py-6">
                  Be the first to review this elegant piece!
                </p>
              ) : (
                productReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-white/70 border border-[#E8D8C8] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1B0E0A]">
                          {rev.userName}
                        </span>
                        {rev.isVerifiedPurchase && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#21130F]/50">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex text-[#C59A70]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-[#1B0E0A]">
                      {rev.title}
                    </h4>

                    <p className="text-xs text-[#21130F]/80 leading-relaxed font-light">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review Form */}
            <div className="lg:col-span-5 bg-[#EFE4D6]/60 p-6 rounded-2xl border border-[#E0CFBD]">
              <h4 className="font-serif-display text-xl font-bold text-[#1B0E0A] mb-2">
                Write a Review
              </h4>
              <p className="text-xs text-[#21130F]/60 mb-4">
                Share your thoughts on fit, fabric texture, and embroidery finish.
              </p>

              {reviewSubmitted ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-900 text-xs text-center space-y-1">
                  <Check className="w-6 h-6 text-green-600 mx-auto" />
                  <p className="font-semibold">Thank you for your review!</p>
                  <p>Your feedback helps other shoppers select the perfect fit.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Your Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'text-[#C59A70] fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maryam Siddiqui"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gorgeous embroidery and perfect fit"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg px-3 py-2 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How did the garment look and fit? What event did you wear it to?"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-lg p-3 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2A120D] hover:bg-[#651B17] text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* You May Also Like / Related Collections */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C96852]">
                  RECOMMENDED FOR YOU
                </p>
                <h3 className="font-serif-display text-3xl font-bold text-[#1B0E0A] mt-1">
                  Complete The Drip
                </h3>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-semibold text-[#651B17] hover:underline"
              >
                View Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
