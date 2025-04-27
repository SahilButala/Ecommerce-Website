import {
  addToCartService,
  DeleteCartItemService,
  fetchAllCartItemsService,
  updateCartItemQuantityService,
} from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "create/addToCart",
  async ({ userId, productId, quantity }) => {
    const res = await addToCartService({ userId, productId, quantity });
    return res?.cart;
  }
);
export const fetchAllCartItems = createAsyncThunk(
  "fetch/getCartItems",
  async (userId) => {
    const res = await fetchAllCartItemsService(userId);
    console.log("fetch----",res)
    return res;
  }
);
export const DeleteCartItem = createAsyncThunk(
  "delete/cartItem",
  async ({ userId, productId }) => {
    const res = await DeleteCartItemService({ userId, productId });
    return res;
  }
);
export const updateCartItemQuantity = createAsyncThunk(
  "update/cartItems",
  async ({ userId, productId, quantity }) => {
    const res = await updateCartItemQuantityService({
      userId,
      productId,
      quantity,
    });
    return res;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart : (state)=>{
           state.cartItems = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(fetchAllCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload);
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(updateCartItemQuantity.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        (state.isLoading = false), (state.cartItems = []);
      })
      .addCase(DeleteCartItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(DeleteCartItem.fulfilled, (state, action) => {
        (state.isLoading = false), (state.cartItems = action.payload);
      })
      .addCase(DeleteCartItem.rejected, (state, action) => {
        (state.isLoading = false), (state.cartItems = []);
      });
  },
});

export const {clearCart} = CartSlice.actions

export default CartSlice.reducer;
