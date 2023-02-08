
//////////////////////////////
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
const MainScreen = () => {

  const [place, setPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

const data =[{
  latitude: 10,
  longitude: 10,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
},{
  latitude: 11,
  longitude: 11,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
}]
  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let place = await Location.getCurrentPositionAsync({});
      setPosition(place);
    })();
  }, []);
  


  console.log(place);
  return (

    <MapView
      style={styles.map}
      initialRegion={place}
  
      pitchEnabled={true}
      rotateEnabled={true}>

{data && data.length ? data.map((item) => {
            return (
               <Marker 
                   coordinate={{
                       latitude: item.latitude,
                       longitude: item.longitude,
                   }}
                   title="Test Title"
                   description="This is the test description"
              />
            )
        }) : null}

       </MapView>
  );
}


const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});






export default MainScreen;



