import type { I_products, T_product } from "../../types/api-types";
import { useEffect, useState } from "react";
import useProduct, { isRequiredSensor } from "../../hooks/useProduct";

import ReviewItem from "../shared/ReviewSection/components/ReviewItem";
import ReviewSection from "../shared/ReviewSection/ReviewSection";
import type { RootState } from "../../store/store";
import type { T_ReviewItem } from "../../types/ui-types";
import freeShippingIcon from "../../assets/images/free-shipping.svg";
import { getProducts } from "../../utils/api";
import reviewBadge from "../../assets/images/review-badge.png";
import { store } from "../../store/store";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const getDiscountedPrice = (product: T_product) => {
  return product.price - (product.price * product.discount) / 100;
};

const CartReviewItem = ({ item }: { item: T_ReviewItem }) => {
  const activeVariantIndex =
    item.product.variants?.findIndex(
      (v) => v.color.toLowerCase() === item.selectedItem.variant.toLowerCase(),
    ) ?? 0;
  const resolvedVariantIndex =
    activeVariantIndex === -1 ? 0 : activeVariantIndex;

  const { handleIncreaseQuantity, handleDecreaseQuantity } = useProduct({
    product: item.product,
    section: item.section,
    activeVariant: resolvedVariantIndex,
    hasVariants: item.hasVariants,
  });

  return (
    <ReviewItem
      image={item.image}
      title={item.title}
      quantity={item.quantity}
      onQuantityChange={(nextQuantity) => {
        if (nextQuantity > item.quantity) handleIncreaseQuantity();
        else if (nextQuantity < item.quantity) handleDecreaseQuantity();
      }}
      originalPrice={item.originalPrice}
      price={item.price}
      priceText={item.priceText}
    />
  );
};

const Review = () => {
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

      const isRequired = isRequiredSensor(section, product.id);
      const isFreeEligible = isRequired && selectedCamerasCount > 0;

      const chargeableQuantity = isFreeEligible
        ? Math.max(0, selectedItem.quantity - 1)
        : selectedItem.quantity;

      const lineItemFinalPrice = discountedPrice * chargeableQuantity;

      // We will show the UNIT price if quantity is 1, or if it's not a mixed free/paid situation.
      // But if they have 2, 1 free, 1 paid, it's better to show the average unit price? Or just the final unit price.
      // Actually, if they have multiple, the "price" display is usually the unit price. We can just use the final price for display.
      // The original code used finalPrice = 0 if quantity <= 1 and free.
      const finalPrice =
        isFreeEligible && selectedItem.quantity === 1 ? 0 : discountedPrice;

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
          originalPrice:
            product.price !== finalPrice ? product.price : undefined,
          price: finalPrice,
          priceText: finalPrice === 0 ? "FREE" : undefined,
          section,
          selectedItem,
          hasVariants: Boolean(product.variants?.length),
          product,
          lineItemFinalPrice, // added for total calculation
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

  const allItems = [
    ...cameraItems,
    ...planItems,
    ...sensorItems,
    ...accessoryItems,
  ];
  const totalPrice = allItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const priceAfterDiscount = allItems.reduce(
    (sum, item) => sum + item.lineItemFinalPrice,
    0,
  );

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
                <CartReviewItem key={item.id} item={item} />
              ))}
            </ReviewSection>
          ) : null}

          {sensorItems.length > 0 ? (
            <ReviewSection title="Sensors">
              {sensorItems.map((item) => (
                <CartReviewItem key={item.id} item={item} />
              ))}
            </ReviewSection>
          ) : null}

          {accessoryItems.length > 0 ? (
            <ReviewSection title="Accessories">
              {accessoryItems.map((item) => (
                <CartReviewItem key={item.id} item={item} />
              ))}
            </ReviewSection>
          ) : null}

          {planItems.length > 0 ? (
            <ReviewSection title="Home Monitoring Plan">
              {planItems.map((item) => (
                <CartReviewItem key={item.id} item={item} />
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
          <div className="flex items-center justify-between 2xl:justify-start gap-6.25 mb-6">
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
            Congrats! You&apos;re saving $
            {(totalPrice - priceAfterDiscount).toFixed(2)} on your security
            bundle!
          </p>

          <button
            className="cursor-pointer w-full bg-primary text-white rounded-[5px] py-3.25 px-4 text-[17px] font-bold mb-2.5! shadow-sm"
            onClick={() => {
              const hasCameras = selectedCameras.some(
                (item) => item.quantity > 0,
              );
              const hasPlans = selectedPlans.some((item) => item.quantity > 0);
              const hasSensors = selectedSensors.some(
                (item) => item.quantity > 0,
              );

              if (!hasCameras || !hasPlans || !hasSensors) {
                toast.error("Incomplete System", {
                  description:
                    "Please select at least one camera, sensor, and plan to proceed with checkout.",
                  style: {
                    backgroundColor: "#FFF6E5",
                    border: "1px solid #F6AD55",
                    color: "#9C541E",
                    fontWeight: "semibold",
                    fontSize: "1rem",
                  },
                  duration: 3500,
                });
                return;
              }

              toast.success("Thanks for testing!", {
                description: "Checkout flow not implemented yet.",
                style: {
                  backgroundColor: "#DEF7EC",
                  border: "1px solid #319795",
                  color: "#03543F",
                  fontWeight: "semibold",
                  fontSize: "1rem",
                },
                duration: 2000,
              });
            }}
          >
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
