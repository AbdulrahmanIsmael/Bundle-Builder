import type {
  T_productState,
  T_priceAfterDiscountPayload,
  T_productPayload,
  T_totalPricePayload,
} from "../../types/products-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface I_productsState {
  cameras: T_productState[];
  plans: T_productState[];
  sensors: T_productState[];
  accessories: T_productState[];
  totalPrice: number;
  totalPriceWithDiscount: number;
}

const initialState: I_productsState = {
  cameras: [],
  plans: [],
  sensors: [],
  accessories: [],
  totalPrice: 0,
  totalPriceWithDiscount: 0,
};

const getSectionKey = (section: string) => {
  const normalizedSection = section.toLowerCase();
  if (normalizedSection === "plans") return "plans";
  if (normalizedSection === "sensors") return "sensors";
  if (normalizedSection === "accessories") return "accessories";
  return "cameras";
};

const getSectionItems = (state: I_productsState, section: string) => {
  const targetKey = getSectionKey(section);
  return state[targetKey];
};

const resetTotalsIfEmpty = (state: I_productsState) => {
  if (
    state.cameras.length === 0 &&
    state.plans.length === 0 &&
    state.sensors.length === 0 &&
    state.accessories.length === 0
  ) {
    state.totalPrice = 0;
    state.totalPriceWithDiscount = 0;
  }
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<T_productPayload>) => {
      const { productId, variant, hasVariants, section } = action.payload;
      const sectionItems = getSectionItems(state, section);
      const product = sectionItems.find((item) => {
        if (hasVariants) {
          return item.productId === productId && item.variant === variant;
        }

        return item.productId === productId;
      });

      if (product) {
        product.quantity++;
      } else {
        sectionItems.push({
          productId,
          variant,
          quantity: 1,
        });
      }

      if (
        section.toLowerCase() === "cameras" &&
        !state.sensors.some((item) => item.productId === 1)
      ) {
        state.sensors.push({
          productId: 1,
          variant: "",
          quantity: 1,
        });
      }
    },

    removeProduct: (state, action: PayloadAction<T_productPayload>) => {
      const { productId, variant, hasVariants, section } = action.payload;
      const sectionItems = getSectionItems(state, section);
      const product = sectionItems.find((item) => {
        if (hasVariants) {
          return item.productId === productId && item.variant === variant;
        }

        return item.productId === productId;
      });

      if (product) {
        product.quantity--;
      }

      if (product?.quantity === 0) {
        const filteredItems = sectionItems.filter((item) => {
          if (hasVariants) {
            return !(item.productId === productId && item.variant === variant);
          }

          return item.productId !== productId;
        });

        if (section === "plans" || section.toLowerCase().includes("plan")) {
          state.plans = filteredItems as T_productState[];
        } else if (
          section === "sensors" ||
          section.toLowerCase().includes("sensor")
        ) {
          state.sensors = filteredItems as T_productState[];
        } else if (
          section === "accessories" ||
          section.toLowerCase().includes("accessorie")
        ) {
          state.accessories = filteredItems as T_productState[];
        } else {
          state.cameras = filteredItems as T_productState[];
        }
      }

      resetTotalsIfEmpty(state);
    },

    deleteProduct: (state, action: PayloadAction<T_productPayload>) => {
      const { productId, variant, hasVariants, section } = action.payload;
      const sectionItems = getSectionItems(state, section);
      const filteredItems = sectionItems.filter((item) => {
        if (hasVariants) {
          return !(item.productId === productId && item.variant === variant);
        }

        return item.productId !== productId;
      });

      if (section === "plans" || section.toLowerCase().includes("plan")) {
        state.plans = filteredItems as T_productState[];
      } else if (
        section === "sensors" ||
        section.toLowerCase().includes("sensor")
      ) {
        state.sensors = filteredItems as T_productState[];
      } else if (
        section === "accessories" ||
        section.toLowerCase().includes("accessorie")
      ) {
        state.accessories = filteredItems as T_productState[];
      } else {
        state.cameras = filteredItems as T_productState[];
      }

      resetTotalsIfEmpty(state);
    },

    increaseTotalPrice: (state, action: PayloadAction<T_totalPricePayload>) => {
      const { price, quantity } = action.payload;
      state.totalPrice += price * quantity;
    },
    decreaseTotalPrice: (state, action: PayloadAction<T_totalPricePayload>) => {
      const { price, quantity } = action.payload;
      state.totalPrice -= price * quantity;

      if (state.totalPrice < 0) {
        state.totalPrice = 0;
      }
    },
    increaseTotalPriceWithDiscount: (
      state,
      action: PayloadAction<T_priceAfterDiscountPayload>,
    ) => {
      const { price, discount, quantity } = action.payload;
      const priceAfterDiscount = price - (price * discount) / 100;
      state.totalPriceWithDiscount += priceAfterDiscount * quantity;
    },
    decreaseTotalPriceWithDiscount: (
      state,
      action: PayloadAction<T_priceAfterDiscountPayload>,
    ) => {
      const { price, discount, quantity } = action.payload;
      const priceAfterDiscount = price - (price * discount) / 100;
      state.totalPriceWithDiscount -= priceAfterDiscount * quantity;

      if (state.totalPriceWithDiscount < 0) {
        state.totalPriceWithDiscount = 0;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  deleteProduct,
  increaseTotalPrice,
  decreaseTotalPrice,
  increaseTotalPriceWithDiscount,
  decreaseTotalPriceWithDiscount,
} = productsSlice.actions;

export default productsSlice.reducer;
