import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login'
import SignUp from './components/signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './(tabs)/home';
import Favourite from './(tabs)/favourite';
import Profile from './(tabs)/profile';
import ProfileDetails from './components/profiledetails';
import WelcomApp from './components/welcomapp';
import Payment from './components/payment';
import ForgotPass from './components/forgotpass';
import VerifyOTP from './components/verifyotpcode';
import SetPassword from './components/setpassword';
import Cart from './components/cart';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen (){
  return (
    <Tab.Navigator 
    initialRouteName='Home'
    screenOptions={{headerShown: false}}>
      <Tab.Screen name='Home' component={Home}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name='home' size={28} color={color} />
        )
      }}/>
      <Tab.Screen name='Favourite' component={Favourite}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name='favorite' size={28} color={color}/>
        )
      }}/>
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
    <WelcomApp/>
    // <NavigationContainer independent={true}>
    //   <Stack.Navigator initialRouteName='WelcomApp' screenOptions={{headerShown: false}}>
    //   <Stack.Screen name='Welcom' component={WelcomApp}/>
    //     <Stack.Screen name='Login' component={Login}/>
    //     <Stack.Screen name='SignUp' component={SignUp}/>
    //     <Stack.Screen name='ForgotPass' component={ForgotPass}/>
    //     <Stack.Screen name='VerifyOTP' component={VerifyOTP}/>
    //     <Stack.Screen name='SetPassword' component={SetPassword}/>
    //     <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default Page

const styles = StyleSheet.create({})