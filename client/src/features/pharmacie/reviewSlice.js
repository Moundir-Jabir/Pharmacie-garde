import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
import axios from "axios"


export const getReview = createAsyncThunk("review/getReview",async (id)=>{
    try {
        const res = await axios.get(`http://localhost:8080/api/review/getAllReviewByIdPharmacie/${id}`)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
})







const reviewSlice = createSlice({
    name :"review",
    initialState : { 
    reviews :[],
    loading: false,
} ,
reducers :{},

extraReducers: {
    [getReview.pending]: (state) => {
      state.loading = true
    },
    [getReview.fulfilled]: (state,{payload}) => {
            return{
                // ...state,
                reviews : [...state.reviews, payload],
                loading: false
            }
    

    },
    [getReview.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default reviewSlice.reducer
