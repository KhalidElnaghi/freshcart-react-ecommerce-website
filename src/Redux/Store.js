import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { productsReducer } from "./ProductSlice";

let store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
  },
});

export default store;
