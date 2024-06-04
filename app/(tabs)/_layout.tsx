import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

const Layout = () => {

  return (
    <Tabs screenOptions={{
      headerTransparent: true,
      headerTitle: "",
      tabBarActiveTintColor: '#BA68C8',
      tabBarInactiveTintColor: '#BFBFBF'
    }}>
      <Tabs.Screen name='home' options={{
        title: 'Home',
        tabBarIcon: ({color}) => (
        <Ionicons name='home' size={28} color={color} />
      )}}/>
      <Tabs.Screen name='favourite' options={{
        title: 'Favorite',
        tabBarIcon: ({color}) => (
        <MaterialIcons name='favorite' size={28} color={color}/>
      )}}/>
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
        tabBarIcon: ({color}) => (
        <FontAwesome name='user' size={28} color={color} />
      )}}/>
    </Tabs>
  )
}

export default Layout