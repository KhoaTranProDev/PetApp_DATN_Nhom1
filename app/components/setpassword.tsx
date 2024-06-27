import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SetPassword = () => {
    const navigation = useNavigation();

    const [showPassword, setshowPassword] = useState(false);
    const [showRetypePassword, setshowRetypePassword] = useState(false);

    const toggleShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const toggleShowRetypePassword = () => {
        setshowRetypePassword(!showRetypePassword);
    }

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
        }}>Back to Verify</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Set Password</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <View style={styles.approvedLine}>
            <Image style={{width: 80, height: 80, tintColor:"#50C878"}} source={require("../(tabs)/img/check-mark.png")}/>
            <Text style={styles.titleContent}>Code Verified</Text>
          </View>
        </View>

        <View style={styles.containerPassword}> 
                <TextInput  
                    secureTextEntry={!showPassword} 
                    style={styles.input} 
                    placeholder="Enter New Password"
                    placeholderTextColor="#aaa"
                /> 
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                /> 
            </View>

            <View style={styles.containerPassword}> 
                <TextInput  
                    secureTextEntry={!showRetypePassword} 
                    style={styles.input} 
                    placeholder="Re-type New Password"
                    placeholderTextColor="#aaa"
                /> 
                <MaterialCommunityIcons 
                    name={showRetypePassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowRetypePassword} 
                /> 
            </View>

          <TouchableOpacity 
          style={styles.submitButton}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000"
            }}>Set Password</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default SetPassword

const styles = StyleSheet.create({
    container:{
        flex: 1,
      },
    title:{
        marginTop: 50,
        marginHorizontal: 20,
        fontSize: 35,
        fontWeight: "900"
    },
    headerContent:{
      marginHorizontal: 15,
      marginTop: 20
    },
    titleContent:{
        fontSize: 16,
        color:"#fff",
        fontWeight: "300",
        fontStyle: 'italic'
    },
    box:{
        marginHorizontal: 15,
        marginTop: 20,
        height: "40%",
        backgroundColor: '#900C3F',
        borderRadius: 15,
    },
    backButton:{
      flexDirection: 'row',
      gap: 10,
      marginHorizontal: 15,
      marginTop: 70,
    },
    textInput:{
      height: 50,
      marginHorizontal: 15,
      marginTop: 25,
      backgroundColor: '#fff',
      color:"#333",
      fontSize: 16,
      borderWidth: 0.5,
      borderRadius: 10,
      padding: 14,
    },
    submitButton:{
      height: 50,
      marginHorizontal: 15,
      marginTop: 15,
      backgroundColor: "#FFC300",
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    approvedLine:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    containerPassword: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: 50, 
        backgroundColor: '#f3f3f3', 
        borderRadius: 10,
        borderWidth: 0.5, 
        padding: 14, 
        marginHorizontal: 15,
        marginTop: 15,
    }, 
    input: { 
        flex: 1, 
        color: '#333', 
        fontSize: 16, 
    }, 
    icon: { 
        marginLeft: 10, 
    }, 
})