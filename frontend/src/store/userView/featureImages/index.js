import { addFeatureImageService, getFeatureImageService } from "@/services"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialstate = {
    isLoading : false,
    images : []
}

export const addFeatureImage = createAsyncThunk('/add/feature',async({image})=>{
    const res  = await addFeatureImageService({image})
    return res
})
export const getFeatureImage = createAsyncThunk('/get/feature',async()=>{
    const res  = await getFeatureImageService()
    return res
})
const FeatureImageSlice = createSlice({
    name : "feature",
    initialState : initialstate,
    reducers : {},
    extraReducers : (builder)=>{
         builder.addCase(addFeatureImage.pending , (state,action)=>{
             state.isLoading = true
         }).addCase(addFeatureImage.fulfilled , (state,action)=>{
              state.images = action.payload.data,
              state.isLoading = false
         }).addCase(addFeatureImage.rejected , (state,action)=>{
              state.isLoading = false,
              state.images = []
         }).addCase(getFeatureImage.pending , (state,action)=>{
            state.isLoading = true
        }).addCase(getFeatureImage.fulfilled , (state,action)=>{
             state.images = action.payload.data,
             state.isLoading = false
        }).addCase(getFeatureImage.rejected , (state,action)=>{
             state.isLoading = false,
             state.images = []
        })
    }
})


export default FeatureImageSlice.reducer