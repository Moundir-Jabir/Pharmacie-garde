import { StyleSheet, Text, View, SafeAreaView, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Link } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Header = ({ navigation }) => {
    return (
        <SafeAreaView style={{}}>
            <View style={[{}, styles.container]}>
                <Link to={'/menu'}>
                    <Text style={{ color: '#00eda6', fontWeight: 'bold', flexDirection: 'row', }}>
                        <AntDesign name="leftcircle" size={30} color="#00eda6" />
                    </Text>
                </Link>
                <Link to={'/map'} style={{}}>
                    <FontAwesome5 name="map-marked-alt" size={30} color="#00eda6" />
                </Link>
                    {/* <Image source={require('../assets/Logo_png.png')} style={{ width: 40, height: 40 }} /> */}

            </View>

        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 320,
        backgroundColor: '#fff',
    },
})