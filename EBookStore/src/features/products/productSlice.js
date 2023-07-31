import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};
//Bringing products to the Async Thunk system via the Axios library.
export const productsFatching = createAsyncThunk(
  "products/productsFatching",
  async () => {
    const res = await axios.get(
      'https://localhost:5001/api/Products/paging?LanguageId=vi-VN&PageIndex=1&PageSize=10'
    );
    return res.data;
  }
);

// Some case for products slice
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  // Need extra reducers for promise type functions
  extraReducers: (builder) => {
    builder.addCase(productsFatching.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(productsFatching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });

    builder.addCase(productsFatching.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default productsSlice.reducer;
