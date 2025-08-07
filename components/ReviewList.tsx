"use client";
import React from "react";
import StarRating from "./StarRating";
import { format } from "date-fns";
import { ThumbsUp, ShieldCheck } from "lucide-react";

interface Review {
  _id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
}

interface ReviewListProps {
  reviews: Review[];
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: Record<string, number>;
  };
}

const ReviewList = ({ reviews, reviewStats }: ReviewListProps) => {
  const { totalReviews, averageRating, ratingDistribution } = reviewStats;

  const RatingBreakdown = () => (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </div>
          <StarRating rating={averageRating || 0} size={20} />
          <div className="text-sm text-gray-600 mt-1">
            Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating.toString()] || 0;
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600 w-6">{rating}</span>
                <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const StarIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  if (totalReviews === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <StarIcon className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-600">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RatingBreakdown />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Customer Reviews</h4>

        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-shop_orange rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {review.customerName}
                    </span>
                    {review.isVerifiedPurchase && (
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <ShieldCheck size={12} />
                        Verified Purchase
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size={14} />
                    <span className="text-sm text-gray-600">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
            <p className="text-gray-700 mb-3">{review.comment}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <ThumbsUp size={14} />
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
