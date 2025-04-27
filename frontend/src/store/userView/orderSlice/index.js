import {
  captureUserProductOrderService,
  cretaeUserProductOrderService,
  getallOrderByUserService,
  getOrderDetailsService,
} from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const CreateOrder = createAsyncThunk(
  "/payment/createOrder",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await cretaeUserProductOrderService(formdata);
      return res;
    } catch (error) {
      // Send error message as payload
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong!"
      );
    }
  }
);
export const CaptureOrder = createAsyncThunk(
  "/payment/captureOrder",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const res = await captureUserProductOrderService({
        paymentId,
        payerId,
        orderId,
      });
      return res;
    } catch (error) {
      // Send error message as payload
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong!"
      );
    }
  }
);
export const getallOrderByUser = createAsyncThunk(
  "/user/getAllOrder",
  async ({userId}) => {
    const res = await getallOrderByUserService({userId});
    return res;
  }
);

export const getallOrderDetails = createAsyncThunk(
  "/get/orderDetails",
  async (id) => {
    const res = await getOrderDetailsService(id);
    return res;
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    resetorderAndApprovalUrl: (state) => {
      state.approvalURL = "";
      state.orderId = "";
    },
    resetOrderDetails : (state)=>{
          state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.orderId = action.payload.orderId),
          (state.approvalURL = action.payload.approvalURL);
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        (state.isLoading = false),
          (state.approvalURL = null),
          (state.orderId = null);
      })
      .addCase(getallOrderByUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getallOrderByUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload.data);
      })
      .addCase(getallOrderByUser.rejected, (state, action) => {
        (state.isLoading = false), (state.orderList = null);
      }).addCase(getallOrderDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getallOrderDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderDetails = action.payload.data);
      })
      .addCase(getallOrderDetails.rejected, (state, action) => {
        (state.isLoading = false), (state.orderDetails = null);
      });
  },
});

export const { resetorderAndApprovalUrl , resetOrderDetails } = OrderSlice.actions;

export default OrderSlice.reducer;
