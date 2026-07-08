import type { T_cameraState } from "../../types/products-types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface I_productsState {
  cameras: T_cameraState[];
  totalPrice: number;
}

const initialState: I_productsState = {
  cameras: [],
  totalPrice: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addCamera: (state, action: PayloadAction<T_cameraState>) => {
      const camera = state.cameras.find(
        (c) => c.cameraId === action.payload.cameraId,
      );
      if (camera) {
        camera.quantity += 1;
      } else {
        state.cameras.push(action.payload);
      }
    },
    removeCamera: (state, action: PayloadAction<number>) => {
      const camera = state.cameras.find((c) => c.cameraId === action.payload);
      if (camera) {
        camera.quantity -= 1;
      }
      if (camera?.quantity === 0) {
        state.cameras = state.cameras.filter(
          (c) => c.cameraId !== action.payload,
        );
      }
    },
    deleteCamera: (state, action: PayloadAction<number>) => {
      state.cameras = state.cameras.filter(
        (c) => c.cameraId !== action.payload,
      );
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice += action.payload;
    },
    subtractTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice -= action.payload;
    },
  },
});

export const {
  addCamera,
  removeCamera,
  deleteCamera,
  setTotalPrice,
  subtractTotalPrice,
} = productsSlice.actions;
export default productsSlice.reducer;
