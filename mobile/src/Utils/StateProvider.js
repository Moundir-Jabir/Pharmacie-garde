import React, {useState, createContext} from "react";
import * as Location from "expo-location";


 export const StateGlobal = createContext();

 const StateProvider = (props) => {
    const [notification, setNotification] = useState(true)
    const [showSearch, setShowSearch] = useState(false);
    const [cashHeaderNav, setcashHeaderNav] = useState(false)

    const [location, setLocation] = useState(null);


    // permession for get localisation device
    const getPermessionLocation = async() =>{
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }


    return (
      <StateGlobal.Provider value={{notification,setNotification,showSearch,setShowSearch, cashHeaderNav, setcashHeaderNav, getPermessionLocation, location}}>
        {props.children}
      </StateGlobal.Provider>
    );
  }

  export default StateProvider

