import type { ReactNode } from "react";

interface I_reviewItemProps {
  image?: string | ReactNode;
  title: ReactNode;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  originalPrice?: number;
  originalPriceText?: string;
  price?: number;
  priceText?: ReactNode;
}

const ReviewItem = ({
  image,
  title,
  quantity,
  onQuantityChange,
  originalPrice,
  originalPriceText,
  price,
  priceText,
}: I_reviewItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#e5e7eb] last:border-b-0">
      <div className="flex items-center gap-3">
        {typeof image === "string" ? (
          <div className="w-[42px] h-[42px] bg-white rounded-md flex items-center justify-center shrink-0 border border-[#e5e7eb] overflow-hidden">
            <img src={image} alt="" className="w-[85%] h-[85%] object-contain" />
          </div>
        ) : image ? (
          <div className="w-[42px] h-[42px] bg-white rounded-md flex items-center justify-center shrink-0 overflow-hidden">
            {image}
          </div>
        ) : null}
        <span className="text-[13px] font-medium text-[#111]">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        {quantity !== undefined && onQuantityChange && (
          <div className="flex items-center gap-1 border border-[#e0e0e0] bg-white rounded-[4px] px-0.5 h-6">
            <button
              onClick={() => onQuantityChange(quantity - 1)}
              className="w-5 h-full flex items-center justify-center text-[#666] hover:bg-[#f5f5f5] transition-colors text-lg leading-none"
            >
              −
            </button>
            <span className="text-[13px] font-semibold w-3 text-center text-[#111]">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="w-5 h-full flex items-center justify-center text-[#666] hover:bg-[#f5f5f5] transition-colors text-lg leading-none"
            >
              +
            </button>
          </div>
        )}

        <div className="flex flex-col items-end min-w-[50px] leading-tight">
          {(originalPrice !== undefined && originalPrice > 0) || originalPriceText ? (
            <span className="text-[11px] text-[#888] line-through mb-0.5 font-medium">
              {originalPriceText || `$${originalPrice?.toFixed(2)}`}
            </span>
          ) : null}
          {priceText ? (
            <span className="text-[13px] font-semibold text-[#4e2fd2] uppercase">
              {priceText}
            </span>
          ) : price !== undefined ? (
            <span className="text-[13px] font-semibold text-[#4e2fd2]">
              ${price.toFixed(2)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
