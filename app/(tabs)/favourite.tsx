import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Favourite = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})