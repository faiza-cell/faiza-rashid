import React from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminReviews: React.FC = () => {
  const { reviews, updateReviewStatus, products } = useStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
          Customer Reviews Moderation
        </h2>
        <p className="text-xs text-[#21130F]/60">
          Review customer feedback, verified purchase ratings, and maintain brand reputation.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#E8D8C8] text-center text-xs text-gray-500">
            No reviews submitted yet.
          </div>
        ) : (
          reviews.map((rev) => {
            const product = products.find((p) => p.id === rev.productId);

            return (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-[#E8D8C8] shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#1B0E0A]">{rev.userName}</span>
                    <span className="text-[10px] text-gray-500 font-mono">({rev.userEmail})</span>
                    {rev.isVerifiedPurchase && (
                      <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  <div className="flex text-[#C59A70]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h4 className="text-xs font-semibold text-[#1B0E0A]">{rev.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">{rev.comment}</p>

                  <div className="text-[11px] text-[#651B17] font-medium pt-1">
                    Product: <strong>{product?.name || 'Pakistani Stitched Suit'}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                    rev.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rev.status}
                  </span>

                  {rev.status !== 'approved' ? (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'approved')}
                      className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors cursor-pointer"
                      title="Approve Review"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'rejected')}
                      className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Reject Review"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
