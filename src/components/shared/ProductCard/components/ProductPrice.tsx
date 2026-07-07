import type { T_camera } from "../../../../types/api-types";

function ProductPrice({
  hasDiscount,
  product,
  discountedPrice,
  //   quantity,
}: {
  hasDiscount: boolean;
  product: T_camera;
  discountedPrice: number;
  //   quantity: number;
}) {
  return (
    <div className="flex flex-col items-end leading-none">
      {hasDiscount && (
        <span className="text-[14px] text-[#D8392B] line-through font-normal tracking-[0.6px] mb-1">
          {/* ${(product.price * quantity).toFixed(2)} */}$
          {product.price.toFixed(2)}
        </span>
      )}
      <span className="text-[14px] font-medium text-[#575757] tracking-[0.6px]">
        {/* ${(discountedPrice * quantity).toFixed(2)} */}$
        {discountedPrice.toFixed(2)}
      </span>
    </div>
  );
}

export default ProductPrice;
