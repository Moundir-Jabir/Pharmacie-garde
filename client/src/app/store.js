import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentification/authentificationSlice";
import pharmReducer from "../features/pharmacie/pharmacieSlice"

import reviewReducer from "../features/pharmacie/reviewSlice";

import commentReducer from  "../features/pharmacie/commentSlide"


const store = configureStore({
  reducer: {
    pharmacie : pharmReducer,
    auth: authReducer,
    review : reviewReducer,
    comment : commentReducer
    

  }
});

export default store

