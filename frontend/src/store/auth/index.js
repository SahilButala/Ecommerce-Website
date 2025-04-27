
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    user : null,
}


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser: (state, action) => {
             state.user = action.payload
        },
        setauth : (state,action)=>{
                   state.isAuthenticated = action.payload
        }
    }
})

export const {setUser,setauth} = authSlice.actions
export default authSlice.reducer