import { SearchProductsService } from "@/services"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialstate = {
      isLoading  : false,
      SearchResult : []
}

export const SearchProducts = createAsyncThunk('/searchProducts/results',async (keyword)=>{
     const res = await SearchProductsService(keyword)
     return res
})

const SearchProductsSlice = createSlice({
   name : 'searchProducts',
   initialState : initialstate,
   reducers : {
    resetSearchResult : (state)=>{
          state.SearchResult = []
    }
   },
   extraReducers : (builder)=>{
       builder.addCase(SearchProducts.pending , (state,action)=>{
             state.isLoading = true
       }).addCase(SearchProducts.fulfilled , (state,action)=>{
          state.SearchResult = action.payload.data,
          state.isLoading = false
       }).addCase(SearchProducts.rejected , (state,action)=>{
          state.isLoading = false,
          state.SearchResult = []
       })
   }
})

export const {resetSearchResult} = SearchProductsSlice.actions

export default SearchProductsSlice.reducer