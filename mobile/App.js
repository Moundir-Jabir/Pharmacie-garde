import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Menu from './app/Menu';
import Profile from './app/Profile';
import HomePage from './home/HomePage';
import Pharmac from './app/Pharmac';
import Details from './components/Details';
import Header from './components/Header';
import MapProxemity from './app/ProxemityScreen'
import MapGarde from './app/PharmacyGardeScreen'
import ReviewForm from './components/ReviewForm';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="home" component={HomePage} options={{ headerShown: false}} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="menu" component={Menu} options={{ headerShown: false}} />
          <Stack.Screen name="pharmacie" component={Pharmac} options={{ headerShown: false}}/>
          <Stack.Screen name="details" component={Details} options={{ headerShown: false}} />
          <Stack.Screen name="header" component={Header} options={{ headerShown: false}}/>
          <Stack.Screen name="pharma" component={Pharmac} />
          <Stack.Screen name="map" component={MapProxemity} options={{ headerShown: false}} />
          <Stack.Screen name="maptwo" component={MapGarde} options={{ headerShown: false}} />
          <Stack.Screen name="review" component={ReviewForm} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
