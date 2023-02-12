
//////////////////////////////
import React, {useState, useEffect} from 'react';
import {StyleSheet,Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MainScreen = () => {  




  const [position, setPosition] = useState();
  const [data, setData] = useState([]);

  // const [errorMsg, setErrorMsg] = useState(null);

// const { width, height } = Dimensions.get("window")

// const ASPECT_RATIO = width / height
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.137.1:8080/api/pharmacie/getAllPharmacie');
      setData((response.data.pharmacie));
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();

}, []);
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let place = await Location.getCurrentPositionAsync();
      setPosition(
        {
          latitude: place.coords.latitude,
          longitude: place.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922,
        }
      );
    })();
  }, []);

//    // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //    location
  

  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}>
       {data.map((item) => {
        return (
           <Marker 
               coordinate={{
                   latitude: item.latitude,
                   longitude: item.longtitude,
               }}
               title={item.name}
               description={item.address}
               pinColor={"#008000"}
          />
        )
    })}
       </MapView>
  );
}



const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});






export default MainScreen;



