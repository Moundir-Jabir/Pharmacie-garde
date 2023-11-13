import { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import { green, white } from "../../assets/styles/Colors";
import { Link } from "@react-navigation/native";
import { StateGlobal } from "../Utils/StateProvider";
import { useTranslation } from "react-i18next";

export default function Home({ navigation }) {
  const { t } = useTranslation();

  const { cashHeaderNav, setcashHeaderNav } = useContext(StateGlobal);

  useEffect(() => {
    setcashHeaderNav(false);
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.Logo}>
        <Image
          style={{ width: 150, height: 175 }}
          source={require("../../assets/images/logopharmacie.png")}
        />
      </View>
      <View style={styles.Img}>
        <Image
          style={{ width: 230, height: 215 }}
          source={require("../../assets/images/HomeImg.png")}
        />
      </View>
      <View style={styles.infoButton}>
        <Text style={{ textAlign: "center", paddingHorizontal: 50 }}>
          {t("desc")}
        </Text>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            navigation.navigate("Pharmacies");
            setcashHeaderNav(true);
          }}
        >
          <Text style={styles.Text}>{t("btnStart")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Logo: {
    flex: 1,
    marginTop: "20%",
  },
  Img: {
    flex: 1,
    marginTop: "8%",
  },
  infoButton: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20%",
  },
  Button: {
    backgroundColor: green,
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: "5%",
  },
  Text: {
    color: white,
  },
});
