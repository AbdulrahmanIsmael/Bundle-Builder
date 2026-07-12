import type { T_product } from "../../../../types/api-types";

function ProductPrice({
  hasDiscount,
  product,
  discountedPrice,
  //   quantity,
}: {
  hasDiscount: boolean;
  product: T_product;
  discountedPrice: number;
  //   quantity: number;
}) {
  return (
    <div className="flex flex-col 2xl:flex-row items-end 2xl:items-center 2xl:gap-1 leading-none">
      {hasDiscount && (
        <span className="text-sm md:text-base text-[#D8392B] line-through font-normal tracking-[0.6px]">
          ${product.price.toFixed(2)}
        </span>
      )}
      <span className="text-sm md:text-base text-[#575757] tracking-[0.6px]">
        {discountedPrice !== 0 ? `$${discountedPrice.toFixed(2)}` : "Free"}
      </span>
    </div>
  );
}

export default ProductPrice;
