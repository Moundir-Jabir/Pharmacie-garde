import { View, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import '../languges/i18n'
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';



const Langue = ({ setShowLangue }) => {


  const { t, i18n } = useTranslation();

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => console.log(value))
      .catch(err => console.log(err));
  };



  return (
    <TouchableOpacity style={styles.langueScreen} onPress={() => setShowLangue(false)}>
      <View style={styles.langueScreen}>
        <View style={styles.langues}>
          <Pressable style={styles.circle} onPress={
            () => {
              setShowLangue(false)
              changeLanguage('en')
            }}>
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
          </Pressable>
          <TouchableOpacity style={styles.circle} onPress={
            () => {
              setShowLangue(false)
              changeLanguage('ar')
            }}>
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle} onPress={
            () => {
              setShowLangue(false)
              changeLanguage('fr')
            }}>
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
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  langueScreen: {
    position: "absolute",
    backgroundColor: "rgba(10,10,10,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  langues: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // position: "absolute",
    // top: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "80%",
    height: "15%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
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

export default Langue;
