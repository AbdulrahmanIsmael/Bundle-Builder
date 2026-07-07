import type { T_camera } from "../../../../types/api-types";
import type { Dispatch, SetStateAction } from "react";

function ProductVariants({
  product,
  activeVariant,
  setActiveVariant,
}: {
  product: T_camera;
  activeVariant: number;
  setActiveVariant: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-1.5 mt-2 w-[63px] h-[26px]">
      {product.variants.map((variant, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setActiveVariant(i);
          }}
          className={`flex items-center gap-1.5 px-[3px] py-px rounded-[2px] tracking-[0.6px] font-medium text-[10px] cursor-pointer transition-all duration-150 ease-in-out border
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
