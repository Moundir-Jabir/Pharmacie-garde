import { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Search from "../components/Search";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import ConfirmDelete from "../components/ConfirmDelete";

export default function Favorite() {
  const { t} = useTranslation();

  const url = "http://192.168.137.1:5050/";

  const [pharmacies, setPharmacies] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const getPharmacies = async () => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        setPharmacies(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePharmacie = async (id) => {
    let indexOfPharmacie = 0;
    const value = await AsyncStorage.getItem("favorites");
    let newValue = JSON.parse(value);
    newValue.map((item) => {
      indexOfPharmacie = pharmacies.findIndex((item) => item._id == id);
      return;
    });
    newValue.splice(indexOfPharmacie, 1);
    await AsyncStorage.setItem("favorites", JSON.stringify(newValue));
    getPharmacies();
  };

  useEffect(() => {
    getPharmacies();
  }, []);

  return (
    <>
      <>
        <View style={styles.container}>
          <Text style={styles.title}>{t("favorite")}</Text>
          <FlatList
            style={{ marginBottom: 95, marginTop: 10 }}
            data={pharmacies}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Pressable>
                <View style={styles.card}>
                  <Card.Content
                    style={{
                      paddingVertical: 10,
                      width: Dimensions.get("window").width - 20,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Image
                        style={{
                          borderRadius: 5,
                          width: 65,
                          height: 65,
                          alignSelf: "center",
                        }}
                        source={{ uri: url + item.Images[0] }}
                      />

                      <View style={{ paddingLeft: 7, flexWrap: "nowrap" }}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            color: "#4D4847",
                            padding: 3,
                          }}
                        >
                          {item.Nom}
                        </Text>

                        <Text
                          style={{ fontSize: 17, color: "#6E7174", padding: 4 }}
                        >
                          {item.Adresse}
                        </Text>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <FontAwesome
                            name="map-marker"
                            size={18}
                            color="#6E7174"
                          />

                          <Text
                            style={{
                              paddingLeft: 5,
                              fontSize: 17,
                              color: "#6E7174",
                            }}
                          >
                            45km
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "flex-end",
                          alignSelf: "flex-end",
                          marginTop: 10,
                          position: "absolute",
                          right: 0,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setShowModel(item._id);
                          }}
                        >
                          <AntDesign name="delete" size={26} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card.Content>
                </View>
              </Pressable>
            )}
          />
        </View>
        <Search />
        {showModel && (
          <ConfirmDelete
            deletePharmacie={deletePharmacie}
            showModel={showModel}
            setShowModel={setShowModel}
          />
        )}
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#019267",
    marginTop: 53,
  },
});
