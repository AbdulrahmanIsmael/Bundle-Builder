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
    <div className="flex items-center gap-1.5 mt-2 w-15.75 h-6.5">
      {product.variants.map((variant, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setActiveVariant(i);
          }}
          className={`flex items-center gap-1.5 px-0.75 py-px rounded-xs tracking-[0.6px] font-medium text-[10px] cursor-pointer transition-all duration-150 ease-in-out border
                  ${
                    activeVariant === i
                      ? "border-[#0aa288] bg-[#1DF0BB0A] text-[#1F1F1F]"
                      : "border-[#e0e0e0] bg-white text-[#555]"
                  }`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
            style={{ background: variant.color.toLowerCase() }}
          />
          {variant.color}
        </button>
      ))}
    </div>
  );
}

export default ProductVariants;
