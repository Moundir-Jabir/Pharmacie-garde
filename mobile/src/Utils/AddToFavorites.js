import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AddToFavorites = async (pharmacie) => {
  let favorites = [];
  try {
    const value = await AsyncStorage.getItem("favorites");
    if (value !== null) {
      favorites = JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }

  let isAdded = false;
  favorites.map((item) => {
    if (item._id === pharmacie._id) {
      isAdded = true;
    }
  });

  try {
    if (!isAdded) {
      favorites.push(pharmacie);
      ToastAndroid.show("Pharmacy added successfully!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Pharmacy already exist in Favorite!",
        ToastAndroid.SHORT
      );
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.log(error);
  }
};
