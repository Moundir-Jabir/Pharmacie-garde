import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/images/logoHeader1.png";
import { StateGlobal } from "../Utils/StateProvider";
import Search from "./Search";
export default function Header() {
  const window = Dimensions.get("window");
   const {notification} = useContext(StateGlobal)
  return (
    <View style={styles.Header}>
      <View style={styles.HeaderContainer}>
        <View>
          <Image source={Logo} style={styles.Logo} />
        </View>
        <View style={styles.notification}>
        {/* <Search/> */}
        {notification ? (
              <Ionicons name="notifications" size={30} color="black" />
            ) : (
              <Ionicons
                name="notifications-off"
                style={styles.icon}
                size={30}
                color="black"
              />
            )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Header: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  Logo: {
    width: 140,
    height: 45,
    resizeMode: "stretch",
  },
  notification: {
    flexDirection: "row"
  }
});
