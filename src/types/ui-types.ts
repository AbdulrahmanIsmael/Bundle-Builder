import type { T_product } from "./api-types";

export type T_ReviewItem = {
  id: string;
  title: string;
  quantity: number;
  image: string;
  originalPrice?: number;
  price: number;
  priceText?: string;
  section: "cameras" | "plans" | "sensors" | "accessories";
  selectedItem: {
    productId: number;
    quantity: number;
    variant: string;
  };
  hasVariants: boolean;
  product: T_product;
};
