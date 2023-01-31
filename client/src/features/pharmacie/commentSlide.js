import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
import axios from "axios"


export const getComment = createAsyncThunk("comment/getComment",async (id)=>{
    try {
        const res = await axios.get(`http://localhost:8080/api/comment/getComment/${id}`)
        return res.data
    } catch (error) {
        throw new Error(error.message)
    }
});



export const deleteComme = createAsyncThunk('comment/deleteComme', async (id) => {
   await axios.delete(`http://localhost:8080/api/comment/deleteComment/${id}`);
//    console.log(res.data);
     return id;
 });
 



const commentcieSlice = createSlice({
    name :"comment",
    initialState : { 
    comments :[],
    loading: false,
} ,
reducers :{},

extraReducers: {
    [getComment.pending]: (state) => {
      state.loading = true
    },
    [getComment.fulfilled]: (state,{payload}) => {
            return{
                    ...state,
                    comments : payload,
                    loading: false
            }

    },
    [getComment.rejected]: (state, action) => {
      state.loading = false
    },
    //delete
     //deletePharmacie

     [deleteComme.pending]:(state)=>{
        state.loading = true
        console.log("pending",state.loading);
    },
    [deleteComme.fulfilled]: (state,{payload})=>{

        return{
            ...state,
          comments:state.comments.filter(com => com._id !== payload ),
            loading: false,
            
        }
    },
    [deleteComme.rejected]:(state)=>{
        console.log("response rejected");
    },
  },
})

export default commentcieSlice.reducer
