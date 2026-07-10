export type T_productState = {
  quantity: number;
  productId: number;
  variant: string;
};

export type T_productPayload = {
  productId: number;
  variant: string;
  hasVariants: boolean;
  section: string;
};

export type T_totalPricePayload = {
  price: number;
  quantity: number;
};

export type T_priceAfterDiscountPayload = {
  price: number;
  discount: number;
  quantity: number;
};
