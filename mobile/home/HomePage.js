import { StyleSheet, Text, View, SafeAreaView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




export default function HomePage({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.items}>
                {/* <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 50 }}>
                    Welcome to Farmacie Finder
                </Text> */}
                <Image
                    source={require('../assets/Logo_png.png')}
                    style={{ width: 300, height: 300}}
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('profile')}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Click Here to continue
                    </Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 100 : 0,
    },
    items: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#00BFFF',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 100 : 0,
    },


});




