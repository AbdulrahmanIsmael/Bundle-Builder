import type { I_products, T_product } from "../../types/api-types";
import {
  addProduct,
  decreaseTotalPrice,
  decreaseTotalPriceWithDiscount,
  increaseTotalPrice,
  increaseTotalPriceWithDiscount,
  removeProduct,
} from "../../store/features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ReviewItem from "../shared/ReviewSection/components/ReviewItem";
import ReviewSection from "../shared/ReviewSection/ReviewSection";
import type { RootState } from "../../store/store";
import freeShippingIcon from "../../assets/images/free-shipping.svg";
import { getProducts } from "../../utils/api";
import reviewBadge from "../../assets/images/review-badge.png";

import { store } from "../../store/store";

import { toast } from "sonner";

const getDiscountedPrice = (product: T_product) => {
  return product.price - (product.price * product.discount) / 100;
};

const isRequiredSensor = (section: string, productId: number) => {
  return section.toLowerCase() === "sensors" && productId === 1;
};

const getChargeableQuantityAmount = (
  section: string,
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

const Review = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(
    (state: RootState) => state.products.totalPrice,
  );
  const priceAfterDiscount = useSelector(
    (state: RootState) => state.products.totalPriceWithDiscount,
  );
  const selectedCameras = useSelector(
    (state: RootState) => state.products.cameras,
  );
  const selectedCamerasCount = useSelector((state: RootState) =>
    state.products.cameras.reduce((sum, item) => sum + item.quantity, 0),
  );
  const selectedPlans = useSelector((state: RootState) => state.products.plans);
  const selectedSensors = useSelector(
    (state: RootState) => state.products.sensors,
  );
  const selectedAccessories = useSelector(
    (state: RootState) => state.products.accessories,
  );
  const [catalog, setCatalog] = useState<I_products | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      const products = await getProducts();
      if (products) {
        setCatalog(products);
      }
    };

    fetchCatalog();
  }, []);

  const handleSaveSystem = () => {
    localStorage.setItem(
      "productsState",
      JSON.stringify(store.getState().products),
    );

    toast.success("System Saved Successfully!", {
      style: {
        backgroundColor: "#DEF7EC",
        border: "1px solid #319795",
        color: "#03543F",
        fontWeight: "semibold",
        fontSize: "1rem",
      },
      duration: 2500,
    });
  };

  const buildReviewItems = (
    selectedItems: Array<{
      productId: number;
      quantity: number;
      variant: string;
    }>,
    products: T_product[] | undefined,
    section: "cameras" | "plans" | "sensors" | "accessories",
  ) => {
    if (!products) return [];

    return selectedItems.flatMap((selectedItem) => {
      const product = products.find(
        (item) => item.id === selectedItem.productId,
      );

      if (!product || selectedItem.quantity <= 0) return [];

      const discountedPrice = getDiscountedPrice(product);
      const isFreeSensor =
        isRequiredSensor(section, product.id) &&
        selectedCamerasCount > 0 &&
        selectedItem.quantity <= 1;
      const finalPrice = isFreeSensor ? 0 : discountedPrice;
      const selectedVariant = product.variants?.find(
        (variant) =>
          variant.color.toLowerCase() === selectedItem.variant.toLowerCase(),
      );
      const displayTitle =
        selectedItem.variant && product.variants?.length
          ? `${product.title} (${selectedItem.variant})`
          : product.title;
      const reviewImage =
        selectedVariant?.image ?? product.image ?? "/images/placeholder.webp";

      return [
        {
          id: `${section}-${selectedItem.productId}-${selectedItem.variant || "default"}`,
          title: displayTitle,
          quantity: selectedItem.quantity,
          image: reviewImage,
          originalPrice: product.price,
          price: finalPrice,
          priceText: finalPrice === 0 ? "FREE" : undefined,
          section,
          selectedItem,
          hasVariants: Boolean(product.variants?.length),
          product,
        },
      ];
    });
  };

  const cameraItems = buildReviewItems(
    selectedCameras,
    catalog?.cameras,
    "cameras",
  );
  const planItems = buildReviewItems(selectedPlans, catalog?.plans, "plans");
  const sensorItems = buildReviewItems(
    selectedSensors,
    catalog?.sensors,
    "sensors",
  );
  const accessoryItems = buildReviewItems(
    selectedAccessories,
    catalog?.accessories,
    "accessories",
  );

  const handleQuantityChange = (
    section: "cameras" | "plans" | "sensors" | "accessories",
    selectedItem: { productId: number; quantity: number; variant: string },
    nextQuantity: number,
    hasVariants: boolean,
    product?: T_product,
  ) => {
    const payload = {
      productId: selectedItem.productId,
      variant: selectedItem.variant,
      hasVariants,
      section,
    };

    const hasCameraSelection = selectedCamerasCount > 0;
    const minimumQuantity =
      isRequiredSensor(section, selectedItem.productId) && hasCameraSelection
        ? 1
        : 0;
    const safeNextQuantity = Math.max(minimumQuantity, nextQuantity);

    if (safeNextQuantity !== nextQuantity) {
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
    }

    const quantityChangeAmount = getChargeableQuantityAmount(
      section,
      selectedItem.productId,
      selectedItem.quantity,
      safeNextQuantity,
      hasCameraSelection,
    );

    const effectiveDiscount = isRequiredSensor(section, selectedItem.productId)
      ? 0
      : (product?.discount ?? 0);

    if (safeNextQuantity > selectedItem.quantity) {
      dispatch(addProduct(payload));
      if (product && quantityChangeAmount > 0) {
        dispatch(
          increaseTotalPrice({
            price: product.price,
            quantity: quantityChangeAmount,
          }),
        );
        dispatch(
          increaseTotalPriceWithDiscount({
            price: product.price,
            discount: effectiveDiscount,
            quantity: quantityChangeAmount,
          }),
        );
      }
    } else if (safeNextQuantity < selectedItem.quantity) {
      dispatch(removeProduct(payload));
      if (product && quantityChangeAmount < 0) {
        dispatch(
          decreaseTotalPrice({
            price: product.price,
            quantity: Math.abs(quantityChangeAmount),
          }),
        );
        dispatch(
          decreaseTotalPriceWithDiscount({
            price: product.price,
            discount: effectiveDiscount,
            quantity: Math.abs(quantityChangeAmount),
          }),
        );
      }
    }
  };

  return (
    <section className="bg-[#EDF4FF] px-3.75 2xl:px-10 pt-3.75 2xl:pt-8 pb-8 w-full box-border rounded-none md:rounded-lg 2xl:rounded-[10px]">
      <div className="flex flex-col 2xl:flex-row 2xl:gap-8">
        {/* Items column */}
        <div className="md:flex-1">
          <p className="2xl:hidden text-[10px] tracking-[1.6px] text-[#484848] uppercase mb-2 font-medium">
            Review
          </p>
          <div className="mb-6">
            <h2 className="text-[22px] 2xl:text-[28px] font-semibold text-[#1F1F1F] mb-1.5">
              Your security system
            </h2>
            <p className="2xl:max-w-[95%] text-xs 2xl:text-base text-[#1F1F1FBF] leading-[130%] font-medium">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          {cameraItems.length > 0 ? (
            <ReviewSection title="Cameras">
              {cameraItems.map((item) => (
                <ReviewItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  quantity={item.quantity}
                  onQuantityChange={(nextQuantity) =>
                    handleQuantityChange(
                      item.section,
                      item.selectedItem,
                      nextQuantity,
                      item.hasVariants,
                      item.product,
                    )
                  }
                  originalPrice={item.originalPrice}
                  price={item.price}
                  priceText={item.priceText}
                />
              ))}
            </ReviewSection>
          ) : null}

          {sensorItems.length > 0 ? (
            <ReviewSection title="Sensors">
              {sensorItems.map((item) => (
                <ReviewItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  quantity={item.quantity}
                  onQuantityChange={(nextQuantity) =>
                    handleQuantityChange(
                      item.section,
                      item.selectedItem,
                      nextQuantity,
                      item.hasVariants,
                      item.product,
                    )
                  }
                  originalPrice={item.originalPrice}
                  price={item.price}
                  priceText={item.priceText}
                />
              ))}
            </ReviewSection>
          ) : null}

          {accessoryItems.length > 0 ? (
            <ReviewSection title="Accessories">
              {accessoryItems.map((item) => (
                <ReviewItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  quantity={item.quantity}
                  onQuantityChange={(nextQuantity) =>
                    handleQuantityChange(
                      item.section,
                      item.selectedItem,
                      nextQuantity,
                      item.hasVariants,
                      item.product,
                    )
                  }
                  originalPrice={item.originalPrice}
                  price={item.price}
                  priceText={item.priceText}
                />
              ))}
            </ReviewSection>
          ) : null}

          {planItems.length > 0 ? (
            <ReviewSection title="Home Monitoring Plan">
              {planItems.map((item) => (
                <ReviewItem
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  quantity={item.quantity}
                  onQuantityChange={(nextQuantity) =>
                    handleQuantityChange(
                      item.section,
                      item.selectedItem,
                      nextQuantity,
                      item.hasVariants,
                      item.product,
                    )
                  }
                  originalPrice={item.originalPrice}
                  price={item.price}
                  priceText={item.priceText}
                />
              ))}
            </ReviewSection>
          ) : null}

          <div className="border-t border-[#CED6DE] pb-1">
            <ReviewItem
              image={
                <img
                  src={freeShippingIcon}
                  alt="Shipping"
                  className="w-10 h-10"
                />
              }
              title="Fast Shipping"
              originalPriceText="$5.99"
              priceText="FREE"
            />
          </div>
        </div>

        {/* Checkout column */}
        <div className="md:w-90 md:shrink-0 2xl:shrink 2xl:w-full 2xl:flex-1 flex flex-col justify-end 2xl:justify-start">
          {/* Badge + returns copy */}
          <div className="flex items-center justify-between gap-6.25 mb-6">
            <img
              src={reviewBadge}
              alt="100% Satisfaction Guarantee"
              className="w-21.25 h-21.25 md:w-19.5 md:h-19.5 2xl:w-32.75 2xl:h-32.75 object-contain shrink-0"
            />
            <div className="hidden 2xl:flex flex-col gap-5 leading-[110%] tracking-[0.6px] max-w-82.5">
              <h3 className="text-[18px] font-semibold text-[#1F1F1F] mb-1">
                30-day hassle-free returns
              </h3>
              <p className="text-[18px] text-[#1F1F1FBF] leading-[130%] font-medium">
                If you&apos;re not totally in love with the product, we will
                refund you 100%.
              </p>
            </div>
            {/* Price row */}
            <div className="flex 2xl:hidden flex-col items-center justify-between gap-1">
              <div className="bg-primary text-white text-xs 2xl:text-base tracking-[-5%] font-medium px-2 py-0.75 2xl:px-2 2xl:py-1 rounded-[3px]">
                as low as $19.19/mo
              </div>
              <div className="flex items-baseline gap-2">
                {totalPrice === priceAfterDiscount ? (
                  <span className="text-2xl 2xl:text-[28px] font-bold text-primary leading-8 tracking-tight">
                    ${priceAfterDiscount.toFixed(2)}
                  </span>
                ) : (
                  <>
                    <span className="text-lg 2xl:text-[22px] leading-5 text-[#6F7882] line-through font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl 2xl:text-[28px] font-bold text-primary leading-8 tracking-tight">
                      ${priceAfterDiscount.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Price row */}
          <div className="hidden 2xl:flex items-center justify-between mb-3">
            <div className="bg-primary text-white text-xs 2xl:text-base tracking-[-5%] font-medium px-2 py-0.75 2xl:px-2 2xl:py-1 rounded-[3px]">
              as low as $19.19/mo
            </div>
            <div className="flex items-baseline gap-2">
              {totalPrice === priceAfterDiscount ? (
                <span className="text-2xl 2xl:text-[28px] font-bold text-primary leading-8 tracking-tight">
                  ${priceAfterDiscount.toFixed(2)}
                </span>
              ) : (
                <>
                  <span className="text-lg 2xl:text-[22px] leading-5 text-[#6F7882] line-through font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl 2xl:text-[28px] font-bold text-primary leading-8 tracking-tight">
                    ${priceAfterDiscount.toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-xs 2xl:text-sm font-medium text-success mb-1 tracking-[-0.06px] text-center">
            Congrats! You&apos;re saving $50.92 on your security bundle!
          </p>

          <button className="cursor-pointer w-full bg-primary text-white rounded-[5px] py-3.25 px-4 text-[17px] font-bold mb-2.5! shadow-sm">
            Checkout
          </button>
          <button
            className="cursor-pointer self-center text-xs md:text-sm text-[#484848] italic underline hover:text-[#333] transition-colors leading-[120%] font-normal"
            onClick={handleSaveSystem}
          >
            Save my system for later
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
