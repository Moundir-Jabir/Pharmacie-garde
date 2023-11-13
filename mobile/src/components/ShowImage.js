import { Modal, Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign } from '@expo/vector-icons';



export const ShowImage = ({AllImages, showImages, setshowImages}) => {

  const images = [];
  const url = "http://192.168.137.1:5050/";
  AllImages.map((item)=>{
    images.push({url : url + item})
  })  
  return (
    <>
    <View style={styles.container}>
      <ImageViewer imageUrls={images} backgroundColor="rgba(10,10,10,0.5)" menus={true}/>
    </View>
    <TouchableOpacity style={styles.close} onPress={()=>setshowImages(false)}>
      <AntDesign name="closecircle" size={50} color="white" style={{left: (Dimensions.get("window").width - 50) / 2}} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    position:"absolute",
  },
  close:{
    width:"100%",
    position:"absolute",
    bottom:"15%",
  }
});
