import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight, TextInput } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import SearchFilter from '../components/SearchFilter';
import Header from '../components/Header';






export default function Pharmac({ navigation }) {

    const [pharma, setPharma] = useState([]);
    const [search, setSearch] = useState('');
    

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
            <Header/> 
            
            <View style={{ marginTop: 20  }}>
                <TextInput value={search} onChangeText={text => setSearch(text)} style={{ height: 45, borderColor: 'gray', borderWidth: 2, width: 320, borderRadius: 10, padding: 15, marginBottom: 10 }} placeholder="Search ... " />
                <SearchFilter navigation={navigation} data={pharma} search={search} setSearch={setSearch} />
            </View>

          

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
   


});