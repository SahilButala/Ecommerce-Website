import { AdmingetallOrderByUserService, AdmingetOrderDetailsService, updateOrderStatusService } from "@/services"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading  : false,
    orders : [],
    getDetails : null
}

export const AdmingetOrders = createAsyncThunk('/admin/getOrders', async ()=>{
      const res = await AdmingetallOrderByUserService()
      return res
})
export const AdmingetDetailsOrders = createAsyncThunk('/admin/getDetailsOrders', async (id)=>{
      const res = await AdmingetOrderDetailsService(id)
      return res
})
export const updateStatusOrder = createAsyncThunk('/admin/updateOrderStatus', async ({id,orderStatus})=>{
      const res = await updateOrderStatusService({id,orderStatus})
      return res
})



const adminOrders = createSlice({
   name : 'adminorders',
   initialState : initialState,
   reducers : {
       AdminResetOrders : (state,action)=>{
           state.getDetails = null
       }
   },
   extraReducers : (builder)=>{
       builder.addCase(AdmingetOrders.pending , (state,action)=>{
            state.isLoading = true
       }).addCase(AdmingetOrders.fulfilled , (state,action)=>{
           state.isLoading = false,
           state.orders = action.payload.data
       }).addCase(AdmingetOrders.rejected , (state,action)=>{
             state.isLoading = false,
             state.orders = []
       }).addCase(AdmingetDetailsOrders.pending , (state,action)=>{
        state.isLoading = true
   }).addCase(AdmingetDetailsOrders.fulfilled , (state,action)=>{
       state.isLoading = false,
       state.getDetails = action.payload.data
   }).addCase(AdmingetDetailsOrders.rejected , (state,action)=>{
         state.isLoading = false,
         state.getDetails = null
   })
   }
})

export const  {AdminResetOrders}  = adminOrders.actions
export default adminOrders.reducer