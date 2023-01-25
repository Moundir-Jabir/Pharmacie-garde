import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Action } from "@remix-run/router"
import axios from "axios"

export const getPharmacie = createAsyncThunk("pharmacie/getPharmacie",async ()=>{
    const res = await axios.get("http://localhost:8080/api/pharmacie/getAllPharmacie")
  return res.data.pharmacie
})

export const postPharmacie = createAsyncThunk('pharmacie/postPharmacie', async (data) => {
    const response = await axios.post('http://localhost:8080/api/pharmacie/createPharmacie', data);
    return response.data.pharmacie;
  
})


export const deletePharmacie = createAsyncThunk('pharmacie/deletePharmacie', async (id) => {
   const res = await axios.delete(`http://localhost:8080/api/pharmacie/deletePharmacie/${id}`);
//    console.log(res.data.pharmacie);
    return id;
});



const pharmacieSlice = createSlice({
    name :"pharmacie",
    initialState : { 
    pharmacies :[],
    loading :false
},
    reducers :{},
    extraReducers : {
        //getPharmacie
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
        },


        //addPharmacie
        [postPharmacie.pending]:(state)=>{
            state.loading = true
            console.log("pending",state.loading);
        },
        [postPharmacie.fulfilled]: (state,{payload})=>{
            return{
                ...state,
                pharmacies : [...state.pharmacies, payload],
                loading: false
            }
        },
        [postPharmacie.rejected]:()=>{
            console.log("response rejected");
        },

        //deletePharmacie

        [deletePharmacie.pending]:(state)=>{
            state.loading = true
            console.log("pending",state.loading);
        },
        [deletePharmacie.fulfilled]: (state,{payload})=>{
            console.log(payload);
            return{
                ...state,
              pharmacies:state.pharmacies.filter(phar => phar._id !== payload ),
                loading: false
            }
        },
        [deletePharmacie.rejected]:()=>{
            console.log("response rejected");
        }

    }
})

export default pharmacieSlice.reducer

