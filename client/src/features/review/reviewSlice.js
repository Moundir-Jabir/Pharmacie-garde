import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getReview = createAsyncThunk('review/getAllReview', async () => {
    const res = await axios.get('http://localhost:8080/api/review/getAllReviewByIdPharmacie/:id')
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
            state.loading = true,
            console.log("pending", state.loading);
        }
    }
})


export default reviewSlice.reducer