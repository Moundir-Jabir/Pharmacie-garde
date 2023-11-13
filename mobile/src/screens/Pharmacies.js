import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import { getDistance } from "geolib";

import { Card } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../components/Search";
import Api from "../Utils/Api";
import { AddToFavorites } from "../Utils/AddToFavorites";
import onShare from "../Utils/SharePharmacy.js";
import { StateGlobal } from "../Utils/StateProvider";
import { green } from "../../assets/styles/Colors";

export default function Pharmacies({ navigation }) {
  const [pharmacies, setPharmacies] = useState([]);

  const { location, getPermessionLocation } = useContext(StateGlobal);

  const [search, setsearch] = useState("");

  const [isIn, setIsIn] = useState([]);

  const [filterFarmacies, setfilterFarmacies] = useState([]);

  const [activeBtnFilter, setActiveBtnFilter] = useState(true);

  // const [destances, setdestances] = useState([]);

  const url = "http://192.168.137.1:5050/";

  const getPharmacies = () => {
    Api.get("pharmacie/getAllPharmacie")
      .then((response) => {
        getDestances(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDestances = async (data) => {
    let destances = [];
    data.map(async (item) => {
      destances.push(
        getDistance(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          { latitude: item.Lat, longitude: item.Lon }
        )
      );
    });

    setPharmacies(
      data.map((item, index) => ({
        ...item,
        destance: destances[index],
      }))
    );
    setfilterFarmacies(
      data.map((item, index) => ({
        ...item,
        destance: destances[index],
      }))
    );
  };

  let isInFavorite = [];

  const CheckIsInFavorite = async () => {
    try {
      let storage = await AsyncStorage.getItem("favorites");
      let isin = false;
      if (storage !== null) {
        storage = await JSON.parse(storage);
        pharmacies.map((item) => {
          storage.map((phar) => {
            if (phar._id === item._id) {
              isin = true;
              return;
            } else {
              isin = false;
            }
          });

          isInFavorite.push(isin);
        });
      }

      setIsIn(isInFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const filterPharmacies = async () => {
    const pharmacieFilter = await pharmacies.filter((value, index, array) => {
      return value.Nom.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
    setfilterFarmacies(pharmacieFilter);
  };

  const afficherAllPharmacy = () => {
    setfilterFarmacies(pharmacies);
    setActiveBtnFilter(true);
  };

  const afficherPharmacyGarde = async () => {
    const pharmacieFilter = await pharmacies.filter((value, index, array) => {
      return value.Status == "open";
    });

    setfilterFarmacies(pharmacieFilter);
    setActiveBtnFilter(false);
  };

  useEffect(() => {
    getPermessionLocation();
    getPharmacies();
  }, []);

  useEffect(() => {
    filterPharmacies();
  }, [search]);

  return (
    <>
      <View style={styles.filter}>
        {activeBtnFilter ? (
          <TouchableOpacity
            onPress={() => afficherAllPharmacy()}
            style={[
              styles.button,
              {
                backgroundColor: green,
                borderBottomLeftRadius: 15,
                
              },
            ]}
          >
            <Text style={{ color: "white" }}>All pharmacie</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => afficherAllPharmacy()}
            style={[
              styles.button,
              {
                backgroundColor: "white",
                borderBottomLeftRadius: 15,
              },
            ]}
          >
            <Text style={{ color: green }}>All pharmacie</Text>
          </TouchableOpacity>
        )}

        {!activeBtnFilter ? (
          <TouchableOpacity
            onPress={() => afficherPharmacyGarde()}
            style={[
              styles.button,
              { backgroundColor: green, borderTopRightRadius: 15 },
            ]}
          >
            <Text style={{ color: "white" }}>pharmacy garde</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => afficherPharmacyGarde()}
            style={[
              styles.button,
              { backgroundColor: "white", borderTopRightRadius: 15 },
            ]}
          >
            <Text style={{ color: green }}>pharmacy garde</Text>
          </TouchableOpacity>
        )}
      </View>
      {!filterFarmacies[0] && (
        <View>
          <ActivityIndicator
            style={{ marginTop: "50%" }}
            size="large"
            color="green"
          />
          <Text style={{ textAlign: "center", fontSize: 24 }}>Wait...</Text>
        </View>
      )}
      {filterFarmacies[0] && (
        <View style={styles.container}>
          <FlatList
            style={{ marginBottom: 95, marginTop: 10 }}
            data={filterFarmacies}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <Pressable
                style
                onPress={() =>
                  navigation.navigate("DetailsPharmacies", { id: item._id })
                }
              >
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
                            {item.destance && item.destance} m
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
                        <Text>{isInFavorite[0]}</Text>
                        <TouchableOpacity onPress={() => AddToFavorites(item)}>
                          {isIn[index] ? (
                            <MaterialIcons
                              name="favorite"
                              size={30}
                              color="red"
                            />
                          ) : (
                            <FontAwesome
                              name="heart-o"
                              size={26}
                              color="#534D4D"
                            />
                          )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onShare(item._id)}>
                          <Entypo
                            name="share"
                            size={26}
                            color="#534D4D"
                            style={{ marginLeft: 3 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card.Content>
                </View>
              </Pressable>
            )}
          />
        </View>
      )}

      <Search setsearch={setsearch} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: "3%",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    elevation: 6,
  },
  filter: {
    marginTop: "18%",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    border: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: green,
  },
});
