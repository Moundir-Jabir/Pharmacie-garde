import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { Action } from "@remix-run/router"
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
   await axios.delete(`http://localhost:8080/api/pharmacie/deletePharmacie/${id}`);
//    console.log(res.data.pharmacie);
    return id;
});


export const updatePharmacie = createAsyncThunk('pharmacie/updatePharmacie', async (id) => {
    const phaID = id.id
    const data = id.dataUp
    
    const res = await axios.put(`http://localhost:8080/api/pharmacie/updatePharmacie/${phaID}`,data);
    console.log(res);
     return res.data.pharmacie;
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
        [getPharmacie.rejected]:(state)=>{
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
        [postPharmacie.rejected]:(state)=>{
            console.log("response rejected");
        },

        //deletePharmacie

        [deletePharmacie.pending]:(state)=>{
            state.loading = true
            console.log("pending",state.loading);
        },
        [deletePharmacie.fulfilled]: (state,{payload})=>{
            return{
                ...state,
              pharmacies:state.pharmacies.filter(phar => phar._id !== payload ),
                loading: false
            }
        },
        [deletePharmacie.rejected]:(state)=>{
            console.log("response rejected");
        },

         //updatePharmacie

         [updatePharmacie.pending]:(state)=>{
            state.loading = true
            console.log("pending",state.loading);
        },
        [updatePharmacie.fulfilled]: (state,{payload})=>{
            return{
             
              pharmacies:state.pharmacies.map(phar => {
                if(phar._id == payload._id){
                    phar.adress = payload.adress;
                    phar.date = payload.date;
                    phar.name = payload.name;
                    phar.phone = payload.phone;
                    
                }
              } ),
                loading: false
            }
        },
        [updatePharmacie.rejected]:(state)=>{
            
            console.log("response rejected");
         }

    }
})

export default pharmacieSlice.reducer

