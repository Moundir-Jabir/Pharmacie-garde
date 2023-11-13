import { Text, StyleSheet, View, TextInput, TouchableHighlight, Pressable } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { green } from '../../assets/styles/Colors';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Api from '../Utils/Api';


export default function AddReview({ setShowModel, id, getonepharmacie }) {
    const { t } = useTranslation();

    const [comments, setComments] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(1);

    const [errorName, setErrorName] = useState("")
    const [errorComment, setErrorComment] = useState("")



    const AddComment = async () => {

        console.log("API DATA", name, comments, rating)

        // validation
        if (name === "") {
            setErrorName("name is required")
            return
        }
        if (comments === "") {
            setErrorComment("comment is required")
            return
        }

        setErrorName("")
        setErrorComment("")

        console.log("errors", errorName, errorComment)

        const data = {
            Name: name,
            Commentair: comments,
            Review: rating,
            Pharmacie: id
        }

        Api.post('commentair/add', data)
            .then((response) => {
                console.log("RESPONSE", response.data)
                console.log("Add successufully")
                setShowModel(false)
                getonepharmacie();
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <>
            <Pressable onPress={() => setShowModel(false)} style={styles.container}>
            </Pressable>
            <View style={styles.addreview}  >
                <View>
                    <Text style={{ color: '#0A0A0A', paddingLeft: 5, fontSize: 20 }}>{t('addReview')}</Text>
                    <TextInput
                        style={styles.username}
                        placeholder={t('username')}
                        name="Name"
                        onChangeText={setName}
                    />
                    <Text style={styles.errorMessage}>{errorName}</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textArea}
                        placeholder={t('placeholderReview')}
                        name="Commentair"
                        onChangeText={setComments}
                    />
                    <Text style={styles.errorMessage}>{errorComment}</Text>
                </View>
                <View style={styles.review} >
                    <FontAwesome name="star" size={24} style={styles.stars} onPress={() => setRating(1)} color={rating >= 1 ? '#FFAD21' : '#D2D6D9'} />
                    <FontAwesome name="star" size={24} style={styles.stars} onPress={() => setRating(2)} color={rating >= 2 ? '#FFAD21' : '#D2D6D9'} />
                    <FontAwesome name="star" size={24} style={styles.stars} onPress={() => setRating(3)} color={rating >= 3 ? '#FFAD21' : '#D2D6D9'} />
                    <FontAwesome name="star" size={24} style={styles.stars} onPress={() => setRating(4)} color={rating >= 4 ? '#FFAD21' : '#D2D6D9'} />
                    <FontAwesome name="star" size={24} style={styles.stars} onPress={() => setRating(5)} color={rating >= 5 ? '#FFAD21' : '#D2D6D9'} />
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight style={styles.addReview} onPress={() => setShowModel(false)}>
                        <Text style={{ color: 'white' }}>{t('cancel')}</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.addReview} onPress={AddComment}>
                        <Text style={{ color: 'white' }}>{t('add')}</Text>
                    </TouchableHighlight>
                </View>


            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,

    },
    addreview: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 10,
        position: 'absolute',
        top: "35%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -150 }],
    },
    textArea: {
        width: 250,
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderColor: '#00A651',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,

    },
    username: {
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderColor: '#00A651',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    review: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    stars: {
        fontSize: 35,
        marginHorizontal: 5
    },
    addReview: {
        backgroundColor: green,
        padding: 12,
        borderRadius: 12,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
    }

});