import {
  add_AddressService,
  DeleteAddressService,
  fetchallAddressService,
  updateUserAddressService,
} from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  address: [],
};

export const Add_address = createAsyncThunk(
  "/add_address",
  async ({ city, address, pincode, phone, notes, userId }) => {
    const res = await add_AddressService({
      city,
      address,
      pincode,
      phone,
      notes,
      userId,
    });
    return res;
  }
);
export const get_address = createAsyncThunk("/get_address", async ({ userId }) => {
  const res = await fetchallAddressService({ userId });
  return res?.data;
});
export const delete_address = createAsyncThunk(
  "/get_address",
  async ({ userId, addressId }) => {
    const res = await DeleteAddressService({ userId, addressId });
    return res;
  }
);
export const update_address = createAsyncThunk(
  "/update_address",
  async ({ userId, addressId , formdata}) => {
    const res = await updateUserAddressService({ userId, addressId , formdata });
    return res?.data;
  }
);

const Address_Slice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Add_address.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(Add_address.fulfilled, (state, action) => {
        (state.isLoading = false), (state.address = action.payload);
      })
      .addCase(Add_address.rejected, (state, action) => {
        (state.isLoading = false), (state.address = []);
      })  
      .addCase(get_address.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(get_address.fulfilled, (state, action) => {
        (state.isLoading = false), (state.address = action.payload);
      })
      .addCase(get_address.rejected, (state, action) => {
        (state.isLoading = false), (state.address = []);
      })
  },
});

export default Address_Slice.reducer;
