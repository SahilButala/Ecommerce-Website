import {
  addProductToPageService,
  DeleteProductFromPageService,
  editProductService,
  getAllProductsService,
} from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addNewProducts = createAsyncThunk(
  "/product/addProducts",
  async (formdata) => {
    const res = await addProductToPageService(formdata);
    return res;
  }
);
export const DeleteProducts = createAsyncThunk(
  "/products/deleteProducts",
  async (id) => {
    const res = await DeleteProductFromPageService(id);
    console.log(res);
    return res;
  }
);
export const editProducts = createAsyncThunk(
  "/products/editProducts",
  async ({formdata,id}) => {
    const res = await editProductService(formdata,id);
    console.log(res)
    return res;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const res = await getAllProductsService();
    return res;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    product: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.products;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.product = []);
      });
  },
});

export default productSlice.reducer;
