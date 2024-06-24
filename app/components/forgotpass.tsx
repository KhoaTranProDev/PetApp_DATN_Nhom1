import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ForgotPass = () => {
  return (
    <View style={styles.container}>
      <Text>ForgotPass</Text>
    </View>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})