"use client";
import { StarIcon } from "lucide-react";
import React from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showRating?: boolean;
  size?: number;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({
  rating,
  maxRating = 5,
  showRating = false,
  size = 16,
  readonly = true,
  onRatingChange,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = hoverRating
            ? starValue <= hoverRating
            : starValue <= rating;

          return (
            <StarIcon
              key={index}
              size={size}
              className={`${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              } ${!readonly ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      {showRating && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)} out of {maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;
