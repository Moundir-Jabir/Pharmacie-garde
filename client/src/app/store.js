import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentification/authentificationSlice";
import pharmReducer from "../features/pharmacie/pharmacieSlice"
import reviewReducer from "../features/review/reviewSlice";

const store = configureStore({
  reducer: {
    pharmacie : pharmReducer,
    auth: authReducer,
    review : reviewReducer
  }
});

export default store

