import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'


const SearchFilter = ({ data, search, route, navigation }) => {

  return (
    <View>
      <FlatList
        data={data} renderItem={({ item }) => {
          if (search === '') {
            return (

              <ScrollView style={{}}>
                <View style={styles.cardContainer} key={item._id}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardaddress}>{item.address} </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Entypo name="old-phone" size={17} color="#4d8a78" />
                      <Text style={styles.cardPhone}> {item.phone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('details', {
                      itemId: item._id
                    });
                  }}>
                    <Text style={styles.itemO}>
                      <AntDesign name="creditcard" size={35} color="#4d8a78" />
                    </Text>

                  </TouchableOpacity>
                </View>
              </ScrollView>

            )
          }

          if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return (
              <ScrollView style={{}}>
                <View style={styles.cardContainer} key={item._id}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardaddress}>{item.address} </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <Entypo name="old-phone" size={17} color="#4d8a78" />
                      <Text style={styles.cardPhone}> {item.phone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => console.log(item._id)}>
                    <Text style={styles.itemO}>
                      <AntDesign name="creditcard" size={35} color="#4d8a78" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )
          }
        }}
      />
    </View>
  )
}

export default SearchFilter

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    color: '#4d8a78',
    marginBottom: 5,
  },
  cardaddress: {
    fontSize: 15,
    marginBottom: 5,
  },
  cardPhone: {
    fontSize: 17,
    marginLeft: 5,
  },



})