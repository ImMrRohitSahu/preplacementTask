// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload.map((product) => ({
        ...product,
        quantity: 0,
      }));
    }
  },
});

export const { setProducts, incrementQuantity, decrementQuantity } = productsSlice.actions;

export default productsSlice.reducer;
