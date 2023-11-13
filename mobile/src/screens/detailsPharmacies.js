import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Card } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { green } from "../../assets/styles/Colors";
import AddReview from "./addReview";
import { useTranslation } from "react-i18next";
import Api from "../Utils/Api";
import { AddToFavorites } from "../Utils/AddToFavorites";
import { MaterialIcons } from "@expo/vector-icons";
import onShare from "../Utils/SharePharmacy.js";

import { ShowImage } from "../components/ShowImage";

export default function DetailsPharmacies({ route }) {
  const url = "http://192.168.137.1:5050/";

  const [showModel, setShowModel] = useState(false);

  const [showImages, setshowImages] = useState(false);

  const [isInFavorite, setisInFavorite] = useState(false);
  const { t } = useTranslation();

  const currentId = route.params.id;

  //get one pharmacie
  const [pharmacie, setPharmacie] = useState({});

  const getonepharmacie = async () => {
    Api.get(`pharmacie/getonepharmacie/${currentId}`)
      .then((response) => {
        setPharmacie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckIsInFavorite = async (id) => {
    let isInFavorite = false;
    try {
      let storage = await AsyncStorage.getItem("favorites");
      if (storage !== null) {
        storage = await JSON.parse(storage);
        storage.map((item) => {
          if (item._id === id) {
            isInFavorite = true;
          }
        });
        console.log(isInFavorite);
        setisInFavorite(isInFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getonepharmacie();
    CheckIsInFavorite(currentId);
  }, []);

  return (
    <>
      {!pharmacie.pharmacie && (
        <View>
          <ActivityIndicator
            style={{ marginTop: "50%" }}
            size="large"
            color="green"
          />
          <Text style={{ textAlign: "center", fontSize: 24 }}>{t("wait")}</Text>
        </View>
      )}
      {pharmacie.pharmacie && (
        <View style={styles.container}>
          <Text style={styles.title}>{pharmacie.pharmacie.Nom}</Text>

          {/* Image de pharmacie */}
          <View>
            <ScrollView
              contentContainerStyle={{ marginTop: 20, marginHorizontal: 10 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {pharmacie.pharmacie.Images[0] &&
                  pharmacie.pharmacie.Images.map((item) => {
                    return (
                      <TouchableOpacity onPress={() => setshowImages(true)}>
                        <Image
                          style={{ width: 100, height: 100, borderRadius: 5 }}
                          source={{ uri: url + item }}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
          </View>

          {/* information */}
          <View>
            <Card style={styles.card}>
              <Card.Content style={styles.mini_card}>
                <FontAwesome
                  name="phone"
                  size={25}
                  color={green}
                  style={{ paddingLeft: 7 }}
                />
                <Text
                  variant="bodyMedium"
                  style={{ paddingLeft: 10, color: "#807C7C", fontSize: 19 }}
                >
                  {pharmacie.pharmacie.NumeroTele}
                </Text>
              </Card.Content>

              <Card.Content style={styles.mini_card}>
                <Entypo
                  name="location-pin"
                  size={30}
                  color={green}
                  style={{ marginTop: -5 }}
                />
                <Text
                  variant="bodyMedium"
                  style={{ paddingLeft: 10, color: "#807C7C", fontSize: 19 }}
                >
                  {pharmacie.pharmacie.Adresse}
                </Text>
              </Card.Content>

              <Card.Content style={styles.mini_card}>
                {pharmacie.pharmacie.Status === 'no' ? <FontAwesome
                  name="circle"
                  size={25}
                  color={"red"}
                  style={{ paddingLeft: 7 }}
                /> : <FontAwesome
                  name="circle"
                  size={25}
                  color={green}
                  style={{ paddingLeft: 7 }}
                />}
              
                <Text
                  variant="bodyMedium"
                  style={{ paddingLeft: 10, color: "#807C7C", fontSize: 19 }}
                >
                  {pharmacie.pharmacie.Status}
                </Text>
              </Card.Content>

              <Card.Content style={[styles.mini_card, styles.mini_card_flex]}>
                <TouchableHighlight
                  style={[styles.addReview, { width: 100 }]}
                  onPress={() => setShowModel(true)}
                >
                  <Text style={{ color: "white" }}>{t("addReview")}</Text>
                </TouchableHighlight>

                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        AddToFavorites(pharmacie.pharmacie);
                        setisInFavorite(true);
                      }}
                    >
                      {isInFavorite ? (
                        <MaterialIcons name="favorite" size={30} color="red" />
                      ) : (
                        <FontAwesome name="heart-o" size={30} color="#534D4D" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onShare(currentId)}>
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
            </Card>
          </View>

          {/* Comments */}
          <FlatList
            style={{ marginBottom: 95, paddingBottom: 10 }}
            data={pharmacie.commentair}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Card style={styles.card}>
                  <Card.Content
                    style={[styles.mini_card_flex, { paddingVertical: 5 }]}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingRight: 40,
                        }}
                      >
                        <Image
                          style={{ borderRadius: 50, width: 60, height: 60 }}
                          source={{
                            uri: "https://intercesseur.org/wp-content/uploads/2020/03/avatar-user-teacher-312a499a08079a12-512x512-1-300x300.png",
                          }}
                        />
                        <View style={{ paddingLeft: 5 }}>
                          <Text
                            style={{ fontWeight: "bold", color: "#4D4847" }}
                          >
                            {item.Name}
                          </Text>
                          <Text style={{ size: 12, color: "#4D4847" }}>
                            {item.Commentair}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          alignSelf: "flex-end",
                          marginTop: 10,
                        }}
                      >
                        {[...Array(item.Review)].map((element) => {
                          return (
                            <FontAwesome
                              key={element}
                              name="star"
                              size={15}
                              color="#FECE00"
                              style={{ paddingLeft: 7 }}
                            />
                          );
                        })}

                        {[...Array(5 - item.Review)].map((item) => {
                          return (
                            <FontAwesome
                              key={item}
                              name="star"
                              size={15}
                              color="#B7B7B7"
                              style={{ paddingLeft: 7 }}
                            />
                          );
                        })}
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            )}
          />
        </View>
      )}
      {showModel && (
        <AddReview
          setShowModel={setShowModel}
          id={currentId}
          getonepharmacie={getonepharmacie}
        />
      )}

      {showImages && (
        <ShowImage
          showImages={showImages}
          setshowImages={setshowImages}
          AllImages={pharmacie.pharmacie.Images}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#0A0A0A",
    textAlign: "center",
    marginTop: 20,
  },
  img: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  card: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  mini_card: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 10,
  },
  addReview: {
    backgroundColor: green,
    padding: 12,
    borderRadius: 12,
  },
  mini_card_flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
