
//////////////////////////////
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
const MainScreen = () => {

  const [position, setPosition] = useState();
  // const [errorMsg, setErrorMsg] = useState(null);


  
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
          longitudeDelta: 0.03,
        }
      );
    })();
  }, []);
  console.log(position);


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
       {/* <Marker
       title='Yor are here'
       description='This is a description'
       coordinate={position}
       /> */}
       </MapView>
  );
}



const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});






export default MainScreen;



