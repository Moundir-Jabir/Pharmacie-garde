import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Link } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { green, white } from "../../assets/styles/Colors";

export default function Navbar() {
  return (
    <View style={styles.navBar}>
      <View style={styles.icons}>
        <Link to={{ screen: "Pharmacies" }}>
          <View style={styles.circle}>
            <Entypo name="home" style={styles.icon} size={26} color={white} />
          </View>
        </Link>

        <Link to={{ screen: "maps" }}>
          <View style={styles.circle}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="google-maps"
              size={26}
              color={white}
            />
          </View>
        </Link>

        <Link to={{ screen: "Favorite" }}>
          <View style={styles.circle}>
            <MaterialIcons
              style={styles.icon}
              name="favorite"
              size={26}
              color={white}
            />
          </View>
        </Link>

        <Link to={{ screen: "Setting" }}>
          <View style={styles.circle}>
            <Ionicons
              style={styles.icon}
              name="settings"
              size={26}
              color={white}
            />
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: white,
    borderRadius: 30,
    position: "absolute",
    height: 70,
    width: 300,
    bottom: 10,
    left: (Dimensions.get("window").width - 300) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  circle: {
    backgroundColor: green,
    height: 50,
    width: 50,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  icon: {
    textAlign: "center",
    marginTop: 10,
  },
});
