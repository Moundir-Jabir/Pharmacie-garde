import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentification/authentificationSlice";
import pharmReducer from "../features/pharmacie/pharmacieSlice"

const store = configureStore({
  reducer: {
    pharmacie : pharmReducer,
    auth: authReducer
  }
});

export default store

