import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Favourite = () => {
  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
          <View style={styles.headerOption}>
            <Text style={styles.title}>Favorites</Text>
            <View style ={styles.iconHeaderOption}>
                <TouchableOpacity>
                    <Image style={{width: 24, height: 24}} source={require('./img/lucide_dog.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{width: 24, height: 24}} source={require('./img/solar_cat-linear.png')}/>
                </TouchableOpacity>
            </View>
          </View>
        )
      }}/>
    </>
  )
}

export default Favourite

const styles = StyleSheet.create({
    title:{
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    headerOption:{
        flex: 0,
        flexDirection: 'row',
        gap: 40
    },
    iconHeaderOption:{
        width: 100,
        flex: 0,
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 5
    }
})