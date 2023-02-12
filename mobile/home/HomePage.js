import { StyleSheet, Text, View, SafeAreaView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




export default function HomePage({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.items}>

                <View>
                    <Image
                        onPress={() => navigation.navigate('profile')}
                        source={require('../assets/Logo_png.png')}
                        style={{ width: 300, height: 300 }}
                    />
                    <Text style={styles.title}>
                        Welcome to Farmacies de garde
                    </Text>
                </View>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => navigation.navigate('menu')}
                >
                    <Text style={{ color: '#00eda6', fontWeight: 'bold' }}>
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
        paddingTop: Platform.OS === 'android' ? 100 : 100,
    },
    items: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 230,
        height: 50,
        backgroundColor: '#00608d',
        padding: 10,
        borderRadius: 5,
        fontSize: 20,
        marginTop: Platform.OS === 'android' ? 100 : 100,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00608d',
    }


});




