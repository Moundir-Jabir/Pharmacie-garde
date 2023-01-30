import { configureStore } from "@reduxjs/toolkit";
import pharmReducer from "../features/pharmacie/pharmacieSlice"
import commentReducer from  "../features/pharmacie/commentSlide"

const store = configureStore({
  reducer: {
    pharmacie : pharmReducer,
    Comment : commentReducer
    
  }
});

export default store

