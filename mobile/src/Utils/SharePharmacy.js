import { Share, Alert } from "react-native"
import Api from './Api'
// share pharmacy
let pharmacie = {};
const getonepharmacie = async (id) => {
    Api.get(`pharmacie/getonepharmacie/${id}`)
        .then((response) => {
            pharmacie = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

const onShare = async (id) => {

    getonepharmacie(id);

    setTimeout(async () => {
        console.log(pharmacie);
        try {
            const result = await Share.share({
                message: `Pharmacie: ${pharmacie.pharmacie.Nom} \n Adresse: ${pharmacie.pharmacie.Adresse}`,
            });
            u;
        } catch (error) {
            console.log(error.message);
            Alert.alert("can't share this pharmacy");
        }
    }, 500);
};

export default onShare