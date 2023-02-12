import { StyleSheet, Text, View, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Card,Title,Button } from 'react-native-paper';
import axios from 'axios';



const ReviewForm = ({route,navigation}) => {

    const { itemId } = route.params;
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    
    function messageToast(mess){
        ToastAndroid.show(mess, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }


    const addReview = () => {
        const url = `http://192.168.137.1:8080/api/review/createReview/${itemId}`
        if (name == '' || review == '') {
            messageToast('Please Add all the fields');
            return;
        }
        if(review > 5){
            messageToast('Review must be between 0 and 5');
            return;
        }
        axios.post(url, {
            name: name,
            review: review,
        })
            .then((response) => {
                console.log(response.data.mess);
                messageToast(response.data.mess);
                navigation.navigate('details', { itemId: itemId });
            })
            .catch((error) => { console.log(error)});
    }


    

  return (
    <SafeAreaView style={styles.container}>
        <Card style={{ width: 320, height: 'auto', marginTop: 20, }}>
            <Card.Content>
                <Title style={{ color: '#00eda6', fontWeight: 'bold', fontSize: 30, }}>Review</Title>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                    <TextInput style={{ width: 300, height: 50, marginTop: 20, }} label="Name"  mode="outlined" value={name} onChangeText={(text) => setName(text)}/>
                    <TextInput style={{ width: 300, height: 50, marginTop: 20, }} label="Review" mode="outlined" placeholder='0 -> 5' value={review} onChangeText={(text)=>setReview(text)} />
                </View>
                <Card.Actions style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, }}>
                    <Button style={{ width: 100, height: 50, }} mode="contained" onPress={addReview}>
                        Submit
                    </Button>
                    {/* <Button style={{ width: 100, height: 50, }} mode="contained" onPress={() => navigation.navigate('Home')}>
                        Cancel
                    </Button> */}
                </Card.Actions>
            </Card.Content>
        </Card>
    </SafeAreaView>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 100 : 100,
    },
})