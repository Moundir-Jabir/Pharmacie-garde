import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
import Search from "../components/Search";
import Api from "../Utils/Api";
import * as Location from "expo-location";
import * as Expo from "expo";
import { green } from "../../assets/styles/Colors";
import { getDistance } from "geolib";
import MapViewDirections from "react-native-maps-directions";
import ApiKey from "../Utils/ApiKey";
import Loading from "../components/Loading";
import { StateGlobal } from "../Utils/StateProvider";

export default function Maps({ navigation }) {

  const { location, getPermessionLocation } = useContext(StateGlobal);

  const [pharmacies, setPharmacies] = useState([]);


  const [showMenu, setshowMenu] = useState(false);

  const [search, setsearch] = useState("");

  const [showDirection, setshowDirection] = useState(false);

  const [destination, setDestination] = useState({});

  const [filterFarmacies, setfilterFarmacies] = useState([]);

  const { width, height } = Dimensions.get("window");

  const aspectRatio = width / height;

  const getPharmacies = () => {
    Api.get("pharmacie/getAllPharmacie")
      .then((response) => {
        setPharmacies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDestances = async () => {
    try {
      let destances = [];
      pharmacies.map((item) => {
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

      const index = await destances.findIndex(
        (item) => item == Math.min(...destances)
      );
      setDestination(pharmacies[index]);
    } catch (error) {
      console.log(error);
    }
  };

  const showDirections = async (pharmacie) => {
    if (pharmacie) {
      setDestination(pharmacie);
      setsearch("");
    } else {
      setDestination(showMenu);
    }
    setshowDirection(true);
    setshowMenu(false);
  };

  const showDetail = async () => {
    navigation.navigate("DetailsPharmacies", { id: showMenu._id });
    setshowMenu(false);
  };

  const filterPharmacies = async () => {
    const pharmacieFilter = await pharmacies.filter((value, index, array) => {
      return value.Nom.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
    setfilterFarmacies(pharmacieFilter);
  };

  useEffect(() => {
    getPermessionLocation();
    getPharmacies();
  }, []);

  useEffect(() => {
    filterPharmacies();
  }, [search]);

  if (!showDirection) {
    getDestances();
  }

  return (
    <>
      <View style={styles.container}>
        {location && pharmacies[0] && (
          <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: aspectRatio * 0.0922,
              }}
              title={"Your location"}
              pinColor={"red"}
              key={1}
            />
            {pharmacies[0] &&
              pharmacies.map((pharmacie) => {
                return (
                  <Marker
                    coordinate={{
                      latitude: Number(pharmacie.Lat),
                      longitude: Number(pharmacie.Lon),
                      latitudeDelta: 0.0922,
                      longitudeDelta: aspectRatio * 0.0922,
                    }}
                    title={pharmacie.Nom}
                    description={pharmacie.NumeroTele}
                    pinColor={green}
                    key={pharmacie._id}
                    onPress={() => {
                      setshowMenu(pharmacie);
                    }}
                  />
                );
              })}

            {destination && (
              <MapViewDirections
                style={styles.mapDirect}
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={{
                  latitude: Number(destination.Lat),
                  longitude: Number(destination.Lon),
                }}
                apikey={ApiKey}
                strokeWidth={8}
                strokeColor="#3181EA"
                optimizeWaypoints={true}
              />
            )}
          </MapView>
        )}
      </View>

      {!location && <Loading />}

      {showMenu && (
        <View style={styles.detaill}>
          <TouchableOpacity
            style={[styles.button, { marginEnd: 5 }]}
            onPress={() => showDetail()}
          >
            <Text style={{ color: "#fff" }}>show Detaill</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginStart: 5 }]}
            onPress={() => showDirections()}
          >
            <Text style={{ color: "#fff" }}>show Direction</Text>
          </TouchableOpacity>
        </View>
      )}

      {search && (
        <View style={styles.filterPharmacies}>
          {filterFarmacies.map((pharmacy) => {
            return (
              <TouchableOpacity
              key={pharmacy._id}
                style={styles.pharmacie}
                onPress={() => showDirections(pharmacy)}
              >
                <Text>{pharmacy.Nom}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <Search setsearch={setsearch} search={search} />
    </>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapDirect: {
    borderWidth: 3,
    borderColor: "black",
  },
  detaill: {
    position: "absolute",
    width: "100%",
    top: "13%",
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    backgroundColor: green,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterPharmacies: {
    position: "absolute",
    width: "100%",
    top: "15%",
    alignItems: "center",
  },
  pharmacie: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    marginTop: 3,
  },
});
