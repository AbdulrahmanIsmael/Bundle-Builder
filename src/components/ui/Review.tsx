import ReviewItem from "../shared/ReviewSection/components/ReviewItem";
import ReviewSection from "../shared/ReviewSection/ReviewSection";
import type { RootState } from "../../store/store";
import camPanV3 from "../../assets/images/placeholder.webp";
// Placeholder images
import camV4 from "../../assets/images/placeholder.webp";
import freeShippingIcon from "../../assets/images/free-shipping.svg";
import reviewBadge from "../../assets/images/review-badge.png";
import sdCard from "../../assets/images/placeholder.webp";
import senseHub from "../../assets/images/placeholder.webp";
import senseMotion from "../../assets/images/placeholder.webp";
import { useSelector } from "react-redux";

const dummyData = {
  cameras: [
    {
      id: 1,
      name: "Wyze Cam v4",
      qty: 1,
      originalPrice: 35.98,
      price: 27.98,
      image: camV4,
    },
    {
      id: 2,
      name: "Wyze Cam Pan v3",
      qty: 2,
      originalPrice: 57.98,
      price: 47.98,
      image: camPanV3,
    },
  ],
  sensors: [
    {
      id: 3,
      name: "Wyze Sense Motion Sensor",
      qty: 2,
      originalPrice: 0,
      price: 59.98,
      image: senseMotion,
    },
    {
      id: 4,
      name: "Wyze Sense Hub (Required)",
      qty: 1,
      originalPrice: 29.92,
      priceText: "FREE",
      image: senseHub,
    },
  ],
  accessories: [
    {
      id: 5,
      name: "Wyze MicroSD Card (256GB)",
      qty: 2,
      originalPrice: 0,
      price: 41.96,
      image: sdCard,
    },
  ],
};

const Review = () => {
  const totalPrice = useSelector(
    (state: RootState) => state.products.totalPrice,
  );

  return (
    <section className="bg-[#EDF4FF] px-[15px] pt-[15px] pb-8 w-full box-border">
      <p className="text-[10px] tracking-[1.6px] text-[#484848] uppercase mb-2 font-medium">
        Review
      </p>
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-[#1F1F1F] mb-1.5">
          Your security system
        </h2>
        <p className="text-[12px] text-[#1F1F1FBF] leading-[130%] font-medium">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <ReviewSection title="Cameras">
        {dummyData.cameras.map((item) => (
          <ReviewItem
            key={item.id}
            image={item.image}
            title={item.name}
            quantity={item.qty}
            onQuantityChange={() => {}}
            originalPrice={item.originalPrice}
            price={item.price}
          />
        ))}
      </ReviewSection>

      <ReviewSection title="Sensors">
        {dummyData.sensors.map((item) => (
          <ReviewItem
            key={item.id}
            image={item.image}
            title={item.name}
            quantity={item.qty}
            onQuantityChange={() => {}}
            originalPrice={item.originalPrice}
            price={item.price}
            priceText={item.priceText}
          />
        ))}
      </ReviewSection>

      <ReviewSection title="Accessories">
        {dummyData.accessories.map((item) => (
          <ReviewItem
            key={item.id}
            image={item.image}
            title={item.name}
            quantity={item.qty}
            onQuantityChange={() => {}}
            originalPrice={item.originalPrice}
            price={item.price}
          />
        ))}
      </ReviewSection>

      <ReviewSection title="Home Monitoring Plan">
        <ReviewItem
          title={
            <div className="flex items-center gap-1">
              <img
                src="/images/cam-unlimited-plan.svg"
                alt="Shield"
                className="w-5 h-5"
              />
              <span className="flex items-center gap-1 text-[14px] font-bold">
                <span className="text-[#000000]">Cam</span>
                <span className="text-primary">Unlimited</span>
              </span>
            </div>
          }
          originalPriceText="$12.99/mo"
          priceText="$9.99/mo"
        />
      </ReviewSection>

      <div className="border-t border-[#CED6DE] pb-1">
        <ReviewItem
          image={
            <img src={freeShippingIcon} alt="Shipping" className="w-10 h-10" />
          }
          title="Fast Shipping"
          originalPriceText="$5.99"
          priceText="FREE"
        />
      </div>

      {/* Footer Area */}
      <div className="flex items-end justify-between mb-4">
        <img
          src={reviewBadge}
          alt="100% Satisfaction Guarantee"
          className="w-[85px] h-[85px] object-contain"
        />

        <div className="flex flex-col items-end pb-1">
          <div className="bg-primary text-white text-[12px] tracking-[-5%] font-medium px-2 py-[3px] rounded-[4px] mb-2">
            as low as $19.19/mo
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] leading-5 text-[#6F7882] line-through font-medium">
              {totalPrice}
            </span>
            <span className="text-[24px] font-bold text-primary leading-8 tracking-tight">
              $187.89
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-[12px] font-medium text-success mb-1.5 tracking-[-0.06px]">
          Congrats! You're saving $50.92 on your security bundle!
        </p>
        <button className="cursor-pointer w-full bg-primary text-white rounded-[5px] py-[13px] px-4 text-[17px] font-bold mb-2.5! shadow-sm">
          Checkout
        </button>
        <button className="cursor-pointer text-[12px] text-[#484848] italic underline hover:text-[#333] transition-colors leading-[120%] font-normal">
          Save my system for later
        </button>
      </div>
    </section>
  );
};

export default Review;
