import { StyleSheet, Text, View, SafeAreaView, Platform, Image, Modal, Button, Alert, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from 'react';




export default function Menu({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.model}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={ [{backgroundColor:'#00eda6', color:'#00608d', padding:10, fontWeight: 'bold', fontSize:20},styles.modalText]}>Nous aider !</Text>
                        <Text style={[{lineHeight:23, fontSize: 15}, styles.modalText]}>
                            Bienvenue dans l'Application Pharmacies de garde :
                            Nous avons pour Objectif dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
                        </Text>
                        <TouchableHighlight
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close Modal</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>

            
            <View style={styles.items}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('home')}>
                <Image
                    onPress={() => navigation.navigate('profile')}
                    source={require('../assets/Logo_png.png')}
                    style={{ width: 170, height: 170 }}
                />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemsA}>
                <View style={[{}, styles.item]}>
                    <MaterialIcons name="local-hospital" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('pharmacie')}
                    >
                        <Text style={styles.itemO}>
                            Pharmacies de garde
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={[{}, styles.item]}>
                    <Entypo name="location" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('maptwo')}
                    >
                        <Text style={styles.itemO}>
                            Pharmacies à proximité
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={[{}, styles.item]}>

                    <MaterialIcons name="live-help" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.itemO}>
                            Votre aide est la bienvenue
                        </Text>
                    </TouchableHighlight>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    items: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemsA: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'android' ? 100 : 100,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
        height: 50,
        backgroundColor: '#00608d',
        padding: 10,
        borderRadius: 5,
        marginTop: Platform.OS === 'android' ? 10 : 10,
    },
    itemO: {
        color: '#00eda6',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#00608d',
        padding: 10,
        borderRadius: 5,
    },
    modalView: {
        marginTop: 150,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        lineHeight: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 230,
        height: 50,
        backgroundColor: '#00608d',
        padding: 10,
        borderRadius: 5,
        
    },




});
