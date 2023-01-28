import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getReview = createAsyncThunk('review/getAllReview', async (id) => {
    const res = await axios.get('http://localhost:8080/api/review/getAllReviewByIdPharmacie/'+ id)
    console.log(res);
    return res
})



const reviewSlice = createSlice({
    name : 'review',
    initialState : {
        review : [],
        loading : false
    },
    reducers : {},
    extraReducers : {
        [getReview.pending]: (state) => {
            state.loading = true
            console.log("pending", state.loading);
        },
        [getReview.fulfilled]: (state,{payload})=>{
            console.log("response fulfilled", payload);
            return{
                ...state,
                review : payload,
                loading: false
            }
        },
        [getReview.rejected]:()=>{
            console.log("response rejected")
        },
    }
})


export default reviewSlice.reducer