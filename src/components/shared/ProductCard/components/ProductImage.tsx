import type { T_camera } from "../../../../types/api-types";
import placeholderImage from "../../../../assets/images/placeholder.webp";

function ProductImage({
  hasDiscount,
  hasVariants,
  activeVariant,
  product,
}: {
  hasDiscount: boolean;
  hasVariants: boolean;
  activeVariant: number;
  product: T_camera;
}) {
  return (
    <div
      className={`w-[80px] sm:w-[100px] shrink-0 flex items-center justify-center ${hasDiscount ? "mt-[32px]" : "mt-2"}`}
    >
      {hasVariants && product.variants[activeVariant]?.image ? (
        <img
          src={product.variants[activeVariant]?.image || placeholderImage}
          alt={`${product.title} - ${product.variants[activeVariant].color}`}
          className="w-full h-auto object-contain"
        />
      ) : (
        <span className="text-[#bbb] text-xs">No image</span>
      )}
    </div>
  );
}

export default ProductImage;
