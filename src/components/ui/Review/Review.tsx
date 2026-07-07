import ReviewSection from "./components/ReviewSection";
import ReviewItem from "./components/ReviewItem";
import shieldIcon from "../../../assets/icons/shield.svg";
import freeShippingIcon from "../../../assets/images/free-shipping.svg";
import reviewBadge from "../../../assets/images/review-badge.png";

// Placeholder images
import camV4 from "../../../assets/images/placeholder.webp";
import camPanV3 from "../../../assets/images/placeholder.webp";
import senseMotion from "../../../assets/images/placeholder.webp";
import senseHub from "../../../assets/images/placeholder.webp";
import sdCard from "../../../assets/images/placeholder.webp";

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
  return (
    <section className="bg-[#EDF4FF] px-[15px] py-8 w-full box-border">
      <div className="mb-6">
        <p className="text-[10px] tracking-[1px] text-[#666] uppercase mb-2 font-medium">
          Review
        </p>
        <h2 className="text-[22px] font-bold text-[#111] mb-1.5 leading-tight">
          Your security system
        </h2>
        <p className="text-[13px] text-[#555] leading-[1.4]">
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
          image={
            <img src={shieldIcon} alt="Shield" className="w-5 h-5 opacity-80" />
          }
          title={
            <span className="flex items-center gap-1">
              <span className="font-bold text-[#111]">Cam</span>
              <span className="font-bold text-[#4e2fd2]">Unlimited</span>
            </span>
          }
          originalPriceText="$12.99/mo"
          priceText="$9.99/mo"
        />
      </ReviewSection>

      <div className="mb-6 border-b border-[#e5e7eb] pb-3">
        <ReviewItem
          image={
            <img src={freeShippingIcon} alt="Shipping" className="w-7 h-7" />
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
          <div className="bg-[#4e2fd2] text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px] mb-2">
            as low as $19.19/mo
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[16px] text-[#777] line-through font-medium">
              $238.81
            </span>
            <span className="text-[26px] font-bold text-[#4e2fd2] leading-none tracking-tight">
              $187.89
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-[13px] font-semibold text-[#0aa288] mb-4">
          Congrats! You're saving $50.92 on your security bundle!
        </p>
        <button className="w-full bg-[#4e2fd2] text-white rounded-[8px] py-3.5 text-[16px] font-bold mb-4 shadow-sm">
          Checkout
        </button>
        <button className="text-[13px] text-[#777] italic underline hover:text-[#333] transition-colors">
          Save my system for later
        </button>
      </div>
    </section>
  );
};

export default Review;
