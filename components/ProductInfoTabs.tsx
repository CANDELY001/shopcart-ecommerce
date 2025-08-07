"use client";
import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

// Define a Product type (customize as needed)
export interface Product {
  _id: string;
  description?: string;
  // Add other fields as needed
}

// Define a ReviewFormData type
export interface ReviewFormData {
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
}

interface ProductInfoTabsProps {
  product: Product;
}

const ProductInfoTabs = ({ product }: ProductInfoTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional information" },
    { id: "reviews", label: `Reviews (${reviewStats.totalReviews})` },
  ];

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
      fetchReviewStats();
    }
  }, [product?._id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `/api/reviews/${product._id}?productId=${product._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchReviewStats = async () => {
    try {
      const response = await fetch(
        `/api/reviews/stats?productId=${product._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviewStats(data.stats);
      } else {
        console.error("Failed to fetch review stats");
      }
    } catch (error) {
      console.error("Error fetching review stats:", error);
    }
  };

  const handleReviewSubmit = async (reviewData: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          ...reviewData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("Review submitted successfully!");

        // Refresh reviews and stats after successful submission
        await fetchReviews();
        await fetchReviewStats();

        // Signal successful submission for form reset
        setFormResetKey((prev) => prev + 1);

        // Clear the success message after 5 seconds
        setTimeout(() => {
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitMessage(result.error || "Failed to submit review");
      }
    } catch (error) {
      setSubmitMessage("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-16 px-2">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-semibold text-lg transition-colors ${
                activeTab === tab.id
                  ? "border-shop_dark_green text-shop_dark_green"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-8">
        {activeTab === "description" && (
          <div className="space-y-6">
            <table className="w-full max-w-md">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-600 font-medium">Weight</td>
                  <td className="py-3 text-gray-500">2 kg</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-600 font-medium">Dimensions</td>
                  <td className="py-3 text-gray-500">3 × 72 × 109 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "additional" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div className="text-gray-600">
              <p>
                {product?.description ||
                  "Additional product information will be displayed here."}
              </p>
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {submitMessage && (
              <div
                className={`p-4 rounded-md ${
                  submitMessage.includes("successfully")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <ReviewList reviews={reviews} reviewStats={reviewStats} />

            <div className="border-t pt-8">
              <ReviewForm
                productId={product._id}
                onSubmit={handleReviewSubmit}
                isSubmitting={isSubmitting}
                key={formResetKey}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfoTabs;
