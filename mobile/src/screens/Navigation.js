import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Maps from "./Maps";
import Home from "./Home";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import DetailsPharmacies from "./detailsPharmacies";
import Favorite from "./Favorite";
import Setting from "./Setting";
import { bgColor } from "../../assets/styles/Colors";
import StateProvider, { StateGlobal } from "../Utils/StateProvider";
import Pharmacies from "./Pharmacies";

export default function Navigation() {
  const { cashHeaderNav, setcashHeaderNav } = useContext(StateGlobal);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: bgColor,
    },
  };
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyTheme}>
      {cashHeaderNav && <Header />}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          data={"ddd"}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="maps"
          component={Maps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pharmacies"
          component={Pharmacies}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DetailsPharmacies"
          component={DetailsPharmacies}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {cashHeaderNav && <Navbar />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
});
