import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React from 'react'

const cart = () => {
  return (
    <View>
    <View >
      <h1 style={{backgroundColor: "FFEFE0",width:428,height:89,margin:20,fontSize:30}}>Giỏ Hàng</h1>
    </View>
    <TouchableOpacity style={styles.idea1}>
        <Image style={styles.img} source={require('./img/selling.png')} />
        <Text >Sản phẩm 1</Text>
    </TouchableOpacity>
    </View>
  )
}

export default cart

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    idea1:{
        width:433,
        height:133,
        marginTop:10
    },
    img:{
      width:130,
      height:133
    },
    txt1:{
      width:187,
      height:36,
      fontSize:24,
      marginLeft:10,
      marginTop:10,
      
    }
})