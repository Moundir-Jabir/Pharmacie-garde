
import { configureStore } from "@reduxjs/toolkit";
import item, {fetchItems, postItem, putItem, deleteItemApi} from "./itemSlice";

const store = configureStore({
  reducer: {
    item
  }
});

export const {dispatch} = store;

export const {fetchItems, postItem, putItem, deleteItemApi} = {fetchItems, postItem, putItem, deleteItemApi}

export default store;