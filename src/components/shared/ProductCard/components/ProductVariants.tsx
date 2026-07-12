import type { Dispatch, SetStateAction } from "react";

import type { T_product } from "../../../../types/api-types";

function ProductVariants({
  product,
  activeVariant,
  setActiveVariant,
}: {
  product: T_product;
  activeVariant: number;
  setActiveVariant: Dispatch<SetStateAction<number>>;
}) {
  if (!product.variants?.length) return null;

  return (
    <div className="flex items-center gap-1.5 mt-2 md:w-full overflow-x-auto">
      {product.variants.map((variant, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setActiveVariant(i);
          }}
          className={`flex items-center px-0.75 md:px-1 py-px md:py-0.5 rounded-xs tracking-[0.6px] font-semibold text-[10px]! cursor-pointer transition-all duration-150 ease-in-out border overflow-hidden! whitespace-nowrap text-ellipsis
                  ${
                    activeVariant === i
                      ? "border-[#0aa288] bg-[#1DF0BB0A] text-[#1F1F1F]"
                      : "border-[#e0e0e0] bg-white text-[#555]"
                  }`}
        >
          <img src={variant.image} alt="" className="max-w-100% w-3 md:w-5.5" />
          {variant.color}
        </button>
      ))}
    </div>
  );
}

export default ProductVariants;
