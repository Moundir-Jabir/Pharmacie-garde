import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Langue from "../components/Langue";
import { StateGlobal } from "../Utils/StateProvider";

import { useTranslation } from 'react-i18next';



export default function Setting({navigation}) {

  const { t, i18n } = useTranslation();
  const { notification, setNotification } = useContext(StateGlobal);
  const [ShowLangue, setShowLangue] = useState(false);

  const ChangeNotification = () => {
    if (notification) {
      setNotification(false);
    } else {
      setNotification(true);
    }
  };


  return (
    <View style={styles.setting}>
      <View style={styles.topSetting}>
        <Ionicons style={styles.icon} name="settings" size={60} color="black" />
        <Text style={styles.iconText}> {t('Setting')}</Text>

      </View>
      <View style={styles.bottomSetting}>
        <View style={styles.circleText}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setShowLangue(true)}
          >


            {i18n.language === 'en' ? (

              <Image
                style={[
                  {
                    width: 60,
                    height: 60,
                  },
                  styles.icon,
                ]}
                source={require("../../assets/images/english.png")}
              />
            )
              : i18n.language === 'fr' ? (
                <Image
                  style={[
                    {
                      width: 60,
                      height: 60,
                    },
                    styles.icon,
                  ]}
                  source={require("../../assets/images/french.png")}
                />
              ) : (
                <Image
                  style={[
                    {
                      width: 60,
                      height: 60,
                    },
                    styles.icon,
                  ]}
                  source={require("../../assets/images/arab.png")}
                />
              )
            }


          </TouchableOpacity>
          <Text style={styles.text}>{t('langue')}</Text>
        </View>
        <View style={styles.circleText}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => ChangeNotification()}
          >
            {notification ? (
              <Ionicons name="notifications" size={35} color="black" />
            ) : (
              <Ionicons
                name="notifications-off"
                style={styles.icon}
                size={35}
                color="black"
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>{t('notification')}</Text>
        </View>
        <View style={styles.circleText}>
          <TouchableOpacity style={styles.circle} onPress={()=>{navigation.navigate("Favorite")}}>
            <MaterialIcons
              style={styles.icon}
              name="favorite"
              size={35}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styles.text}>{t('favorite')}</Text>
        </View>
      </View>
      {ShowLangue && <Langue setShowLangue={setShowLangue} />}
    </View>
  );
}

const styles = StyleSheet.create({
  setting: {
    flex: 1,
    alignItems: "center",
  },
  topSetting: {
    marginTop: "20%",
    alignItems: "center",
  },
  iconText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  bottomSetting: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleText: {
    marginHorizontal: "4%",
    alignItems: "center",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 60,
    width: 60,
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
});
