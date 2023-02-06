import { StyleSheet, Text, View, SafeAreaView, Platform, Image, TouchableWithoutFeedback, Button, Alert, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




export default function Profile({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Welcome to the Profile</Text>
            <Button title="Go to Home Page" onPress={() => navigation.navigate('home')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});