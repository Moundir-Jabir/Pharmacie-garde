import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
import axios from "axios"




const commentcieSlice = createSlice({
    name :"comment",
    initialState : { 
    comments :[],
} ,
reducers :{},
extraReducers : {},


})

export default commentcieSlice.reducer
