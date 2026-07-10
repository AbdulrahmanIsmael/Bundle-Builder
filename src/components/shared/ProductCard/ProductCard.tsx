import {
  addProduct,
  decreaseTotalPrice,
  decreaseTotalPriceWithDiscount,
  deleteProduct,
  increaseTotalPrice,
  increaseTotalPriceWithDiscount,
  removeProduct,
} from "../../../store/features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { AccordionSectionContext } from "./sectionContext";
import ProductImage from "./components/ProductImage";
import ProductPrice from "./components/ProductPrice";
import ProductVariants from "./components/ProductVariants";
import QuantityStepper from "./components/QuantityStepper";
import type { RootState } from "../../../store/store";
import type { T_product } from "../../../types/api-types";
import { useContext } from "react";
import { useState } from "react";

interface I_productCardProps {
  product: T_product;
}

const isRequiredSensor = (section: string | undefined, productId: number) => {
  return section?.toLowerCase() === "sensors" && productId === 1;
};

const getChargeableQuantityDelta = (
  section: string | undefined,
  productId: number,
  oldQuantity: number,
  newQuantity: number,
  hasCameraSelection: boolean,
) => {
  if (!isRequiredSensor(section, productId)) {
    return newQuantity - oldQuantity;
  }

  const freeAllowance = hasCameraSelection ? 1 : 0;
  return (
    Math.max(0, newQuantity - freeAllowance) -
    Math.max(0, oldQuantity - freeAllowance)
  );
};
const getEffectiveDiscount = (
  section: string | undefined,
  productId: number,
  discount: number,
) => {
  return isRequiredSensor(section, productId) ? 0 : discount;
};

const ProductCard = ({ product }: I_productCardProps) => {
  const section = useContext(AccordionSectionContext);
  const normalizedSection = section?.toLowerCase() ?? "";
  const isPlanSection = normalizedSection.includes("plan");
  const isSensorSection = normalizedSection.includes("sensor");
  const isAccessorieSection = normalizedSection.includes("accessorie");
  const selectedCamerasCount = useSelector((state: RootState) =>
    state.products.cameras.reduce((sum, item) => sum + item.quantity, 0),
  );
  const selectedProducts = useSelector((state: RootState) => {
    if (isPlanSection) return state.products.plans;
    if (isSensorSection) return state.products.sensors;
    if (isAccessorieSection) return state.products.accessories;
    return state.products.cameras;
  });
  const dispatch = useDispatch();
  const [activeVariant, setActiveVariant] = useState<number>(0);
  // const [quantity, setQuantity] = useState<number>(0);

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  // curent product
  const currentProduct = selectedProducts.find((c) => {
    if (c.productId !== +product.id) return false;

    if (!hasVariants) return true;

    return (
      c.variant.toLowerCase() ===
      product.variants?.[+activeVariant]?.color.toLowerCase()
    );
  });

  const quantity = currentProduct?.quantity ?? 0;
  const isSelected = quantity > 0;
  const hasDiscount = product.discount > 0;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const handleProductSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const productPayload = {
      productId: +product.id,
      hasVariants: hasVariants,
      variant: hasVariants
        ? (product.variants?.[activeVariant]?.color ?? "")
        : "",
      section: section || "",
    };

    const totalPricePayload = {
      quantity,
      price: +product.price,
    };

    const priceWithDiscountPayload = {
      price: +product.price,
      discount: getEffectiveDiscount(
        section,
        +product.id,
        +product.discount,
      ),
      quantity,
    };

    e.stopPropagation();
    if (isSelected) {
      const minimumQuantity =
        isRequiredSensor(section, +product.id) && selectedCamerasCount > 0
          ? 1
          : 0;
      if (quantity <= minimumQuantity) {
        return;
      }

      dispatch(deleteProduct(productPayload));
      const quantityDelta = getChargeableQuantityDelta(
        section,
        +product.id,
        quantity,
        0,
        selectedCamerasCount > 0,
      );
      if (quantityDelta < 0) {
        dispatch(
          decreaseTotalPrice({
            ...totalPricePayload,
            quantity: Math.abs(quantityDelta),
          }),
        );
        dispatch(
          decreaseTotalPriceWithDiscount({
            ...priceWithDiscountPayload,
            quantity: Math.abs(quantityDelta),
          }),
        );
      }
    } else {
      totalPricePayload.quantity = 1;
      priceWithDiscountPayload.quantity = 1;
      dispatch(addProduct(productPayload));
      const quantityDelta = getChargeableQuantityDelta(
        section,
        +product.id,
        0,
        1,
        selectedCamerasCount > 0,
      );
      if (quantityDelta > 0) {
        dispatch(increaseTotalPrice(totalPricePayload));
        dispatch(increaseTotalPriceWithDiscount(priceWithDiscountPayload));
      }
    }
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    const productPayload = {
      productId: +product.id,
      hasVariants: hasVariants,
      variant: hasVariants
        ? (product.variants?.[activeVariant]?.color ?? "")
        : "",
      section: section || "",
    };

    const totalPricePayload = { price: +product.price, quantity: 1 };

    const priceWithDiscountPayload = {
      price: +product.price,
      discount: getEffectiveDiscount(
        section,
        +product.id,
        +product.discount,
      ),
      quantity: 1,
    };

    e.stopPropagation();
    dispatch(addProduct(productPayload));
    const quantityDelta = getChargeableQuantityDelta(
      section,
      +product.id,
      quantity,
      quantity + 1,
      selectedCamerasCount > 0,
    );
    if (quantityDelta > 0) {
      dispatch(increaseTotalPrice(totalPricePayload));
      dispatch(increaseTotalPriceWithDiscount(priceWithDiscountPayload));
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();

    const productPayload = {
      productId: +product.id,
      hasVariants: hasVariants,
      variant: hasVariants
        ? (product.variants?.[activeVariant]?.color ?? "")
        : "",
      section: section || "",
    };

    const totalPricePayload = { price: +product.price, quantity: 1 };

    const priceWithDiscountPayload = {
      price: +product.price,
      discount: getEffectiveDiscount(
        section,
        +product.id,
        +product.discount,
      ),
      quantity: 1,
    };

    if (
      quantity <= 1 &&
      isRequiredSensor(section, +product.id) &&
      selectedCamerasCount > 0
    ) {
      return;
    }

    dispatch(removeProduct(productPayload));
    const quantityDelta = getChargeableQuantityDelta(
      section,
      +product.id,
      quantity,
      quantity - 1,
      selectedCamerasCount > 0,
    );
    if (quantityDelta < 0) {
      dispatch(
        decreaseTotalPrice({
          ...totalPricePayload,
          quantity: Math.abs(quantityDelta),
        }),
      );
      dispatch(
        decreaseTotalPriceWithDiscount({
          ...priceWithDiscountPayload,
          quantity: Math.abs(quantityDelta),
        }),
      );
    }
  };

  return (
    <div
      onClick={handleProductSelection}
      className={`relative flex items-stretch gap-3 sm:gap-4.75 w-full min-h-39.75 rounded-[10px] p-3 sm:p-2.75 bg-white cursor-pointer box-border transition-all duration-200 ease-in-out
        ${
          isSelected
            ? "border-2 border-[#4E2FD2B2]"
            : "border-2 border-[rgba(220,220,220,0.8)] shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
        }`}
    >
      {/* Save Badge */}
      {hasDiscount && (
        <span className="absolute top-2.75 left-2.75 z-10 bg-primary text-white text-[11px] font-medium rounded-full px-2.5 py-1 tracking-wide">
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
        className={`flex flex-col flex-1 gap-2 ${isPlanSection ? "gap-4" : "gap-2"}`}
      >
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
        <div
          className={`${isPlanSection ? "absolute bottom-5 right-5" : ""} flex items-end justify-between mt-auto pt-3`}
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
