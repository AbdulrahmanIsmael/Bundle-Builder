import { useState } from "react";
import type { T_camera } from "../../../types/api-types";
import ProductImage from "./components/ProductImage";
import ProductVariants from "./components/ProductVariants";
import QuantityStepper from "./components/QuantityStepper";
import ProductPrice from "./components/ProductPrice";

interface I_productCardProps {
  product: T_camera;
  selected?: boolean;
  onSelect?: (id: number) => void;
}

const ProductCard = ({
  product,
  selected = false,
  onSelect,
}: I_productCardProps) => {
  const [activeVariant, setActiveVariant] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const hasVariants = product.variants && product.variants.length > 0;
  const hasDiscount = product.discount > 0;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(product.id);
      }}
      className={`relative flex items-stretch gap-3 sm:gap-[19px] w-full min-h-[159px] rounded-[10px] p-3 sm:p-[11px] bg-white cursor-pointer box-border transition-all duration-200 ease-in-out
        ${
          selected
            ? "border-2 border-[#4E2FD2B2]"
            : "border-2 border-[rgba(220,220,220,0.8)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
        }`}
    >
      {/* Save Badge */}
      {hasDiscount && (
        <span className="absolute top-[11px] left-[11px] z-10 bg-primary text-white text-[11px] font-medium rounded-full px-2.5 py-1 tracking-wide">
          Save {Math.floor(product.discount)}%
        </span>
      )}

      {/* Product Image */}
      <ProductImage
        hasDiscount={hasDiscount}
        hasVariants={hasVariants}
        activeVariant={activeVariant}
        product={product}
      />

      {/* Info Section */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title */}
        <h3 className="text-[14px] font-semibold text-[rgba(31, 31, 31, 1)]">
          {product.title}
        </h3>

        {/* Description + Learn More */}
        <p className="text-[12px] font-medium text-[rgba(31, 31, 31, 0.75)] leading-[130%]">
          {product.desc} <br className="sm:hidden" />
          <a
            href="#"
            onClick={(e) => e.stopPropagation()}
            className="text-[#0000EEFF] underline"
          >
            Learn More
          </a>
        </p>

        {/* Variants */}
        {hasVariants && (
          <ProductVariants
            product={product}
            activeVariant={activeVariant}
            setActiveVariant={setActiveVariant}
          />
        )}

        {/* Quantity + Price */}
        <div className="flex items-end justify-between mt-auto pt-3">
          {/* Quantity Stepper */}
          <QuantityStepper quantity={quantity} setQuantity={setQuantity} />

          {/* Price */}
          <ProductPrice
            hasDiscount={hasDiscount}
            product={product}
            discountedPrice={discountedPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
