import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'




export default function Pharmac({ navigation }) {

    const [pharma, setPharma] = useState([]);

    useEffect(() => {
        const url = 'http://192.168.137.1:8080/api/pharmacie/getAllPharmacie';
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
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {pharma && pharma.map((e) => {
                    return (
                        <View style={styles.cardContainer} key={e._id}>
                            <Text style={styles.cardTitle}>{e.name}</Text>
                            <Text style={styles.cardaddress}>{e.address} </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Entypo name="old-phone" size={17} color="#4d8a78" />
                                <Text style={styles.cardPhone}> {e.phone}</Text>
                            </View>
                            
                        </View>
                    );

                })}
            </ScrollView>
            <Button title="Go to Home Page" onPress={() => navigation.navigate('home')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
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
        width: 300,
    },
    cardTitle: {
        fontSize: 18,
        color: '#4d8a78',
        marginBottom: 5,
    },
    cardaddress: {
        fontSize: 16,
        marginBottom: 5,
    },
    cardPhone: {
        fontSize: 17,
        marginLeft: 5,
    },


});