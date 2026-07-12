import ProductImage from "./components/ProductImage";
import ProductPrice from "./components/ProductPrice";
import ProductVariants from "./components/ProductVariants";
import QuantityStepper from "./components/QuantityStepper";
import type { T_product } from "../../../types/api-types";
import { useState } from "react";
import useProduct from "../../../hooks/useProduct";
import useSection from "../../../hooks/useSection";

interface I_productCardProps {
  product: T_product;
}

const ProductCard = ({ product }: I_productCardProps) => {
  const { section } = useSection();
  const [activeVariant, setActiveVariant] = useState<number>(0);

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  
  const {
    quantity,
    isSelected,
    hasDiscount,
    discountedPrice,
    isPlanSection,
    handleProductSelection,
    handleIncreaseQuantity,
    handleDecreaseQuantity
  } = useProduct({ product, section, activeVariant, hasVariants });

  return (
    <div
      onClick={handleProductSelection}
      className={`relative flex flex-row 2xl:flex-col items-stretch w-full h-full overflow-hidden! gap-3 md:gap-2 2xl:gap-4.75 min-h-39.75 md:min-h-0 2xl:min-h-39.75 rounded-[10px] p-3 sm:p-2.75 bg-white cursor-pointer box-border transition-all duration-200 ease-in-out
      ${
        isSelected
          ? "border-2 border-[#4E2FD2B2]"
          : "border-2 border-[rgba(220,220,220,0.8)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
      }`}
    >
      {/* Save Badge */}
      {hasDiscount && (
        <span className="absolute top-2.75 left-2.75 z-10 bg-primary text-white text-[11px] md:text-xs font-medium rounded-full px-2.5 py-1 tracking-wide">
          {discountedPrice !== 0
            ? `Save ${Math.floor(product.discount)}%`
            : "Free"}
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
      <div
        className={`flex flex-col flex-1 gap-2 md:gap-1.5 2xl:gap-2 ${isPlanSection ? "md:gap-3 2xl:gap-4" : ""}`}
      >
        {/* Title */}
        <h3 className="text-[14px] md:text-base font-semibold text-[rgba(31, 31, 31, 1)]">
          {product.title}
        </h3>

        {/* Description + Learn More */}
        <p className="max-w-75 text-[12px] font-medium text-[rgba(31, 31, 31, 0.75)] leading-[130%]">
          {product.desc}{" "}
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
        <div
          className={`${isPlanSection ? "md:relative 2xl:absolute bottom-5 right-5" : ""} flex items-end justify-between mt-auto pt-3 md:pt-2 2xl:pt-3`}
        >
          {/* Quantity Stepper */}
          {!isPlanSection && (
            <QuantityStepper
              quantity={quantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
            />
          )}

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
