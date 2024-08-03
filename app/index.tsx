import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login'
import SignUp from './components/signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './(tabs)/home';
import Profile from './(tabs)/profile';
import ProfileDetails from './components/profiledetails';
import Payment from './components/payment';
import ForgotPass from './components/forgotpass';
import VerifyOTP from './components/verifyotpcode';
import SetPassword from './components/setpassword';
import DetailsScreen from './components/DetailsScreen';
import DetailsItemList from './components/DetailsItemList';
import CartScreen from './(tabs)/cart';
import PayScreen from './components/HomePay/payscreen';
import { GetRouteCat } from './components/routeCat';
import DetailProduct from './components/HomePay/products/DetailProduct';
import MainPaymentType from './components/HomePay/paymentType/main';
import AddDress from './components/HomePay/addDress/main';
import UpdateAddress from './components/HomePay/addDress/updateAddress';
import AddAddress from './components/HomePay/addDress/addAddress';
import Cart from './(tabs)/cart'
import DetailCatList from './components/DetailCatList';
import WebView from 'react-native-webview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen (){
  return (
    <Tab.Navigator 
    initialRouteName='HomeFragment'
    screenOptions={{headerShown: false}}>
      <Tab.Screen name='HomeFragment' component={HomeFragment}
      options={{
        title: "Home",
        tabBarIcon: ({color}) => (
          <Ionicons name='home' size={28} color={color} />
        )
      }}/>
      <Tab.Screen name='CatStack' component={CatStack}
        options={({ route }) => ({
        title: "Cart",
        tabBarIcon: ({color}) => (
          <Feather name='shopping-cart' size={28} color={color}/>
        ),
        tabBarStyle: { display: GetRouteCat(route) },
        headerShown: false,
      })}/>
      <Tab.Screen name='ProfileScreen' component={ProfileScreen}
      options={{
        title: "Profile",
        tabBarIcon: ({color}) => (
          <FontAwesome name='user' size={28} color={color} />
        )
      }}/>
    </Tab.Navigator>
  )
}

function HomeFragment (){
  return(
    <Stack.Navigator
    initialRouteName='Home'
    screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='DetailsItemList' component={DetailsItemList}/>
      <Stack.Screen name='DetailCatList' component={DetailCatList}/>
      {/* <Stack.Screen name='DetailHamList' component={DetailHamList}/> */}
      <Stack.Screen name='CartScreen' component={CatStack}/>
      <Stack.Screen name='DetailsScreen' component={DetailsScreen}/>
    </Stack.Navigator>
  )
}

function CatStack (){
  return(
    <Stack.Navigator
    initialRouteName='CartScreen'
    screenOptions={{headerShown: false}}>
      <Stack.Screen name='CartScreen' component={CartScreen}/>
      <Stack.Screen name='PayScreen' component={PayScreen}/>
      <Stack.Screen name='DetailProduct' component={DetailProduct}/>
      <Stack.Screen name='MainPaymentType' component={MainPaymentType}/>
      <Stack.Screen name='AddDress' component={AddDress}/>
      <Stack.Screen name='UpdateAddress' component={UpdateAddress}/>
      <Stack.Screen name='AddAddress' component={AddAddress}/>
      <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}

function ProfileScreen (){
  return(
    <Stack.Navigator
    initialRouteName='Profile'
    screenOptions={{headerShown: false}}>
      <Stack.Screen name='Profile' component={Profile}/>
      <Stack.Screen name='ProfileDetails' component={ProfileDetails}/>
      <Stack.Screen name='Payment' component={Payment}/>
    </Stack.Navigator>
  )
}

const Page = () => {
  return (
    // <App/>
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='ForgotPass' component={ForgotPass}/>
        <Stack.Screen name='VerifyOTP' component={VerifyOTP}/>
        <Stack.Screen name='SetPassword' component={SetPassword}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Page

const styles = StyleSheet.create({})