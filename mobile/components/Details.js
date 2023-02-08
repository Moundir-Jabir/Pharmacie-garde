import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';


export default Details = ({route, navigation}) => {

  const { itemId } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://192.168.137.1:8080/api/pharmacies/getPharmacieById/${itemId}}`;
    console.log(url);
    axios.get(url)
        .then((response) => {
            setPharma(response.data.pharmacie);
            console.log(response.data.pharmacie);
        })
        .catch((error) => {
            console.log(error);
        });
}, []);




  return (
    <View>
      <Text>Detaile</Text>
      
    </View>
  )
}

 

const styles = StyleSheet.create({})