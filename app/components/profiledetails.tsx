import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useNavigation } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileDetails = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [avatarUser, setAvatarUser] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmailUser = await AsyncStorage.getItem('email');
      const storedAvatarUser = await AsyncStorage.getItem('avatar');
      const storedDOB = await AsyncStorage.getItem('dob');
      const storedPhone = await AsyncStorage.getItem('sdt');
      setPhone(String(storedPhone));
      setDateOfBirth(String(storedDOB));
      setAvatarUser(String(storedAvatarUser));
      setUsername(String(storedUsername));
      setEmailUser(String(storedEmailUser));
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
        <Image style={{width: 40,height: 40}} source={require("../(tabs)/img/goBack.png")}/>
        <Text style={{
          fontSize: 16,
          lineHeight: 34,
          fontWeight: "500"
        }}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Profile Details</Text>
      <TouchableOpacity style={{
        alignItems: 'center',
        marginTop:30
      }}>
        <Image 
        style={{width: 120, height: 120, borderRadius: 60}}
        source={{uri: avatarUser}}/>
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
          }}>{username}</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('../(tabs)/img/forward.png')}/>
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
          }}>{emailUser}</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('../(tabs)/img/forward.png')}/>
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
          }}>{dateOfBirth}</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('../(tabs)/img/forward.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Text style={{
          fontSize: 16,
          fontWeight: "400",
        }}>Contact:</Text>
        <TouchableOpacity style={styles.infobox}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
          }}>{phone}</Text>
          <Image 
          style={{width: 25, height: 25}}
          source={require('../(tabs)/img/forward.png')}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    backButton:{
      flexDirection: 'row',
      gap: 10,
      marginHorizontal: 15,
    },
    title:{
      fontSize: 28,
      fontWeight: "700",
      marginTop: 15,
      textAlign: 'center'
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