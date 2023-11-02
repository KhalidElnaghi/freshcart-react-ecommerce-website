import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  counter: 0,
};

export let counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => {
      state.counter++;
    },
    decrease: (state) => {
      state.counter--;
    },
  },
});

export let counterReducer = counterSlice.reducer;
export let { increase, decrease } = counterSlice.actions;
