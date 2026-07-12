import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";

const loadProductsState = () => {
  const productsState = localStorage.getItem("productsState");

  if (!productsState) return;

  return JSON.parse(productsState);
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: {
    products: loadProductsState(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
