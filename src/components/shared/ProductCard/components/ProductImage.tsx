import type { T_product } from "../../../../types/api-types";
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
  product: T_product;
}) {
  return (
    <div
      className={`w-20 2xl:w-full shrink-0 flex items-center justify-center ${hasDiscount ? "mt-8 md:mt-6 2xl:mt-8" : "mt-2"}`}
    >
      {hasVariants &&
      product.variants &&
      product.variants[activeVariant]?.image ? (
        <img
          src={product.variants[activeVariant]?.image || placeholderImage}
          alt={`${product.title} - ${product.variants[activeVariant].color}`}
          className="w-full h-auto object-contain"
        />
      ) : product?.image ? (
        <img
          src={product?.image || placeholderImage}
          alt={`${product.title} image`}
          className="w-full h-auto object-contain"
        />
      ) : (
        <span className="text-[#bbb] text-xs">No image</span>
      )}
    </div>
  );
}

export default ProductImage;
