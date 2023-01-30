import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentification/authentificationSlice";
import pharmReducer from "../features/pharmacie/pharmacieSlice"
import commentReducer from  "../features/pharmacie/commentSlide"

const store = configureStore({
  reducer: {
    pharmacie : pharmReducer,
    auth: authReducer,
    comment : commentReducer
    
  }
});

export default store

