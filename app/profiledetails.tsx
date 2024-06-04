import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Ionicons } from '@expo/vector-icons'

const ProfileDetails = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: 'Back',
      }}/>
      <Text style={styles.title}>Profile Details</Text>
      <TouchableOpacity style={{
        alignItems: 'center',
        marginTop:30
      }}>
        <Image 
        style={{width: 120, height: 120, borderRadius: 60}}
        source={{uri: "https://i.pinimg.com/736x/56/3f/0b/563f0b714e90f9195c1d63b09f5fb8e1.jpg"}}/>
        <Text style={{
          marginTop: 10,
          fontSize: 14,
          fontStyle: 'italic',
          color: "#C70039"
        }}>Change profile picture</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
      
      <View style={styles.box}>
        <Text style={{
          fontSize: 16,
          fontWeight: "400",
        }}>Your Name</Text>
        <TouchableOpacity style={styles.infobox}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
          }}>Khoa Tran</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('./(tabs)/img/forward.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={{
          fontSize: 16,
          fontWeight: "400",
        }}>Email</Text>
        <TouchableOpacity style={styles.infobox}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
          }}>khoatldps24667@fpt.edu.vn</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('./(tabs)/img/forward.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={{
          fontSize: 16,
          fontWeight: "400",
        }}>Date of Birth</Text>
        <TouchableOpacity style={styles.infobox}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
          }}>10 February, 2003</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('./(tabs)/img/forward.png')}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
      fontSize: 24,
      fontWeight: "600",
      marginTop: 15,
      marginHorizontal: 15,
    },
    horizontalLine:{
      borderWidth: 0.8,
      marginHorizontal: 15,
      marginTop: 20,
      borderColor: "#C4CCCC"
    },
    box:{
      marginHorizontal: 15,
      marginTop: 20,
    },
    infobox:{
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'space-between',
      padding: 10,
      marginTop: 10,
      flexDirection: 'row'
    }
})