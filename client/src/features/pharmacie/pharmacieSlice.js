import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getPharmacie = createAsyncThunk("pharmacie/getPharmacie",async ()=>{
    const res = await axios.get("http://localhost:8080/api/pharmacie/getAllPharmacie")
  return res.data.pharmacie
})
const pharmacieSlice = createSlice({
    name :"pharmacie",
    initialState : { 
    pharmacies :[],
    loading :false
},
    reducers :{},
    extraReducers : {
        [getPharmacie.pending]:(state)=>{
            state.loading = true
            console.log("pending",state.loading);
        },
        [getPharmacie.fulfilled]: (state,{payload})=>{
            return{
                ...state,
                pharmacies : payload,
                loading: false
            }
        },
        [getPharmacie.rejected]:()=>{
            console.log("response rejected");
        }
    }
})

export default pharmacieSlice.reducer

