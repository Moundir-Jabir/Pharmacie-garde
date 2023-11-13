import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { green } from "../../assets/styles/Colors";
import { useTranslation } from 'react-i18next';

function Search({setsearch}) {
  const [showSearch, setShowSearch] = useState(false);

  const { t, i18n } = useTranslation();


  const ShowSearch = () => {
    setShowSearch(true);
  };

  const setSearch = (text)=>{
    setsearch(text)
  }

  const CloseSearch = () => {
    setShowSearch(false);
    setSearch("")
  };
  
  return (
    <View style={styles.screenSearch}>
      {!showSearch && (
        <TouchableOpacity style={styles.iconShow} onPress={() => ShowSearch()}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      )}
      {showSearch && (
        <View style={styles.search}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setSearch(text)}
            placeholder={t('search')}
          />
          <TouchableOpacity onPress={CloseSearch}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenSearch: {
    top: 8,
    position: "absolute",
    alignItems:"center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 10,
    width: 290,
    left: (Dimensions.get("window").width - 290) / 2,
    top: 50,
    marginTop:-50,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  input: {
    padding: 10,
    width: "80%",
    // fontSize:24
    
  },
  iconShow: {
    justifyContent: "center",
    alignItems: "center",
    left: (Dimensions.get("window").width - 50) / 2,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    shadowColor: "#",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
});
export default Search;
