import { StyleSheet, Text, View, SafeAreaView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'



export default function Menu({navigation}) {

    const createTwoButtonAlert = () =>
    Alert.alert('Nous aider', 
    "Bienvenue dans l'Application Pharmacies de garde : Nous avons pour Objectif dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.items}>
                <Image
                    onPress={() => navigation.navigate('profile')}
                    source={require('../assets/Logo_png.png')}
                    style={{ width: 170, height: 170 }}
                />
            </View>
            <View style={styles.itemsA}>
                <View style={[{}, styles.item]}>
                    <MaterialIcons name="local-hospital" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('pharma')}
                    >
                        <Text style={styles.itemO}>
                            Pharmacies à proximité
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={[{}, styles.item]}>
                    <Entypo name="location" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('profile')}
                    >
                        <Text style={styles.itemO}>
                            Votre aide est la bienvenue
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={[{  }, styles.item]}>
                    <MaterialIcons name="live-help" size={30} color="#00eda6" />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={createTwoButtonAlert}
                    >
                        <Text style={styles.itemO}>
                            Pharmacies de garde
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
        marginTop: Platform.OS === 'android' ? 100 : 0,
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
        marginTop: Platform.OS === 'android' ? 10 : 0,
    },
    itemO: {
        color: '#00eda6',
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    




});
