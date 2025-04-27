import { addReviewService, getAllReviewsService } from "@/services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  review: [],
};

export const addReview = createAsyncThunk(
  "/addReview/product",
  async ({ userId, text, productId, userName, reviewValue },{ rejectWithValue }) => {
   try {
    const res = await addReviewService({ userId, text, productId, userName, reviewValue });
    return res;
   } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong!"
      )
   }
  }
);
export const getAllReviews = createAsyncThunk(
  "/getAllReviews/product",
  async (productId) => {
    const res = await getAllReviewsService(productId);
    return res;
  }
);

const ReviewSlice = createSlice({
  name: "review",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.review = action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        (state.isLoading = false), (state.review = []);
      })
      .addCase(getAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        (state.isLoading = false), (state.review = action.payload.data);
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        (state.isLoading = false), (state.review = []);
      });
  },
});


export default ReviewSlice.reducer