import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseTotalPrice,
  decreaseTotalPriceWithDiscount,
  deleteProduct,
  increaseTotalPrice,
  increaseTotalPriceWithDiscount,
  removeProduct,
} from "../store/features/products/productsSlice";
import type { RootState } from "../store/store";
import type { T_product } from "../types/api-types";
import React from "react";
import { toast } from "sonner";

export const isRequiredSensor = (section: string | undefined, productId: number) => {
  return section?.toLowerCase() === "sensors" && productId === 1;
};

export const getChargeableQuantityDelta = (
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

export const getEffectiveDiscount = (
  section: string | undefined,
  productId: number,
  discount: number,
) => {
  return isRequiredSensor(section, productId) ? 0 : discount;
};

interface UseProductProps {
  product: T_product;
  section: string | undefined;
  activeVariant: number;
  hasVariants: boolean;
}

const useProduct = ({
  product,
  section,
  activeVariant,
  hasVariants,
}: UseProductProps) => {
  const normalizedSection = section?.toLowerCase() ?? "";
  const isPlanSection = normalizedSection.includes("plan");
  const isSensorSection = normalizedSection.includes("sensor");
  const isAccessoriesSection = normalizedSection.includes("accessorie");

  const selectedCamerasCount = useSelector((state: RootState) =>
    state.products.cameras.reduce((sum, item) => sum + item.quantity, 0),
  );

  const selectedProducts = useSelector((state: RootState) => {
    if (isPlanSection) return state.products.plans;
    if (isSensorSection) return state.products.sensors;
    if (isAccessoriesSection) return state.products.accessories;
    return state.products.cameras;
  });

  const dispatch = useDispatch();

  // current product
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

  const handleProductSelection = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();

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
      discount: getEffectiveDiscount(section, +product.id, +product.discount),
      quantity,
    };

    if (isSelected) {
      const minimumQuantity =
        isRequiredSensor(section, +product.id) && selectedCamerasCount > 0
          ? 1
          : 0;
      if (quantity <= minimumQuantity) {
        toast.error("At least 1 sensor is required for a camera!", {
          description: "The first sensor is free!",
          style: {
            backgroundColor: "#FEF2F2",
            color: "#B91C1C",
            border: "1px solid #FCA5A5",
            fontWeight: "semibold",
          },
          duration: 2500,
        });
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

  const handleIncreaseQuantity = (e?: React.MouseEvent) => {
    e?.stopPropagation();

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
      discount: getEffectiveDiscount(section, +product.id, +product.discount),
      quantity: 1,
    };

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

  const handleDecreaseQuantity = (e?: React.MouseEvent) => {
    e?.stopPropagation();

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
      discount: getEffectiveDiscount(section, +product.id, +product.discount),
      quantity: 1,
    };

    if (
      quantity <= 1 &&
      isRequiredSensor(section, +product.id) &&
      selectedCamerasCount > 0
    ) {
      toast.error("At least 1 sensor is required for a camera!", {
        description: "The first sensor is free!",
        style: {
          backgroundColor: "#FEF2F2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          fontWeight: "semibold",
        },
        duration: 2500,
      });
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

  return {
    quantity,
    isSelected,
    hasDiscount,
    discountedPrice,
    isPlanSection,
    handleProductSelection,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
};

export default useProduct;
