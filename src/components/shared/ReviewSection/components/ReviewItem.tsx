import type { ReactNode } from "react";
import QuantityStepper from "../../ProductCard/components/QuantityStepper";

interface I_reviewItemProps {
  image?: string | ReactNode;
  title?: ReactNode;
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
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {typeof image === "string" ? (
          <div className="w-[41px] h-[41px] bg-white rounded-[5px] flex items-center justify-center shrink-0 border border-[#e5e7eb] overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-[85%] h-[85%] object-contain"
            />
          </div>
        ) : image ? (
          <div className="w-[41px] h-[41px] rounded-[5px] flex items-center justify-center shrink-0 overflow-hidden">
            {image}
          </div>
        ) : null}
        <span className="text-[12px] leading-4 tracking-[0.5%] font-medium text-[#0B0D10]">
          {title}
        </span>
      </div>

      <div className={`flex text-center gap-2`}>
        {quantity !== undefined && onQuantityChange && (
          <QuantityStepper
            quantity={quantity}
            setQuantity={onQuantityChange}
            btnBg="#FFFFFF"
          />
        )}

        <div className="flex flex-col items-end min-w-[50px] leading-tight">
          {(originalPrice !== undefined && originalPrice > 0) ||
          originalPriceText ? (
            <span className="text-[12px] leading-4 tracking-[0.5%] text-[#888] line-through mb-0.5 font-medium">
              {originalPriceText || `$${originalPrice?.toFixed(2)}`}
            </span>
          ) : null}
          {priceText ? (
            <span className="text-[13px] font-semibold text-primary uppercase">
              {priceText}
            </span>
          ) : price !== undefined ? (
            <span className="text-[12px] leading-4 tracking-[0.5%] font-semibold text-primary">
              ${price.toFixed(2)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
