import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default Details = ({ route, navigation }) => {

  const { itemId } = route.params;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    const url = `http://192.168.137.1:8080/api/pharmacie/getPharmacieById/${itemId}`;
    // console.log(url);
    axios.get(url)
      .then((response) => {
        setData(response.data.pharmacie);
        console.log(response);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  // comment
  useEffect(() => {
    const url = `http://192.168.137.1:8080/api/comment/getComment/${itemId}`;
    // console.log(url);
    axios.get(url)
      .then((response) => {
        setComment(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [comment]);

  //review
  useEffect(() => {
    const url = `http://192.168.137.1:8080/api/review/getAllReviewByIdPharmacie/${itemId}`;
    // console.log(url);
    axios.get(url)
      .then((response) => {
        setReview(response.data.getAllReview);
        // console.log(response.data.getAllReview);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [review]);

  // console.log(review.avgRating);


  return (
    <SafeAreaView style={styles.container}>
      <Card style={{ width: 320, height: 'auto', marginTop: 20, }}>
        <ScrollView>
          <Card.Cover source={{ uri: 'https://t3.ftcdn.net/jpg/05/34/98/78/240_F_534987837_g99uQvRqz46rI89gBbSC411UmdIuTG2t.jpg' }} style={{ height: 150 }} />
          <Card.Content>
            <Title style={styles.namePharmacie}>{data.name}</Title>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 10 }}>
              <MaterialCommunityIcons name="google-maps" size={18} color="#00608d" style={{ marginRight: 10 }} />
              <Paragraph> {data.address}</Paragraph>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <MaterialCommunityIcons name="cellphone-check" size={18} color="#00608d" style={{ marginRight: 10 }} />
              <Paragraph>{data.phone}</Paragraph>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <MaterialCommunityIcons name="calendar-clock-outline" size={18} color="#00608d" style={{ marginRight: 10 }} />
              <Paragraph>{data.date_start}</Paragraph>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <MaterialCommunityIcons name="calendar-lock" size={18} color="#00608d" style={{ marginRight: 10 }} />
              <Paragraph>{data.date_end}</Paragraph>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Title style={styles.namePharmacie}>Comment</Title>
              <Title style={styles.namePharmacie}>
                {review[0]?.avgRating.toString().slice(0, 3)} 
                <Text style={{ fontSize: 14, color: '#00608d' }}>/5</Text>
              </Title>
            </View>
            {comment.map((e) => {
              return (
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                    <Avatar.Image size={24} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2miryS9jI6tmMZG9SZeModWQqdXwRM8TkNA&usqp=CAU' }} style={{ marginRight: 5 }} />
                    <Title style={{ color: '#00608d', textTransform: 'capitalize' }}>{e.clientname}</Title>
                  </View>
                  <Paragraph style={{ marginLeft: 20 }}>{e.clientcomment}</Paragraph>
                </Card.Content>
              )
            })}
          </Card.Content>

          <Card.Actions>
            <Button onPress={() => navigation.navigate('review', { itemId: itemId })}>Review</Button>
            <Button onPress={() => navigation.navigate('comment', { itemId: itemId })}>Comment</Button>
          </Card.Actions>

        </ScrollView>
      </Card>
    </SafeAreaView>


  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  card: {
    width: 320,
    height: 300,
    marginTop: 20
  },
  namePharmacie: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00608d'
  }

})