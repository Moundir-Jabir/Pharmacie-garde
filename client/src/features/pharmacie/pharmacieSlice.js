import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
      state = action.payload;
    },
    addItem: (state, action) => {
      state.push(action.payload);
    },
    deleteItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      state.splice(index, 1);
    },
    updateItem: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      state[index] = action.payload;
    }
  }
});

export const { setItems, addItem, deleteItem, updateItem } = itemSlice.actions;

export const fetchItems = () => async (dispatch) => {
    const response = await axios.get("https:/items");
    dispatch(setItems(response.data));
}

export const postItem = (item) => async (dispatch) => {
    await axios.post("http://localhost:8000/api/pharmacie/createPharmacie", item);
    dispatch(addItem(item));
}

export const putItem = (item) => async (dispatch) => {
    await axios.put(`https://your-api.com/items/${item.id}`, item);
    dispatch(updateItem(item));
}

export const deleteItemApi = (id) => async (dispatch) => {
    await axios.delete(`https://your-api.com/items/${id}`);
    dispatch(deleteItem(id));
}

export default itemSlice.reducer;
