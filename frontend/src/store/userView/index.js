import { fetchUserShopingProductsService, getProductDetailsByIdService } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  productList: [],
  productDetails : null
};

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductsDetails",
  async (id) => {
    const res = await getProductDetailsByIdService(id);
    return res.product;
  }
)

export const fetchUserShopingProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filter,sortParams}) => {
    const res = await fetchUserShopingProductsService({filter,sortParams});
    return res.products || [];
  }
);

 const ShopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserShopingProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserShopingProducts.fulfilled, (state, action) => {
          (state.isLoading = false), (state.productList = action.payload);
      })
      .addCase(fetchUserShopingProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        (state.isLoading = true)
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productDetails = action.payload);
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        (state.isLoading = false), (state.productDetails = null);
      });
  },
});

export default ShopProductSlice.reducer
