import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.quantity += quantity; // Increment the quantity
      } else {
        state.push({ ...action.payload });
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.findIndex((product) => product.id === id);
      if (existingProductIndex !== -1) {
        if (state[existingProductIndex].quantity === 1) {
          // If quantity is 1, remove the product from the cart
          state.splice(existingProductIndex, 1);
        } else if (state[existingProductIndex].quantity > 0) {
          // If quantity is greater than 0, decrement the quantity
          state[existingProductIndex].quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
