import { configureStore } from "@reduxjs/toolkit";
import pharmReducer from "../features/pharmacie/pharmacieSlice"

const store = configureStore({
  reducer: {
    pharmacie : pharmReducer
    
  }
});

export default store

