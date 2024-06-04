import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => {}} style={{marginLeft: 20}}>
            <Image source={require('./img/drawnavigationIcon.png')}/>
          </TouchableOpacity>
        )
      }}/>
      <View>
        <Text style={{
          fontSize: 24,
          fontWeight: "400",
        }}>Pet App Manager</Text>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})