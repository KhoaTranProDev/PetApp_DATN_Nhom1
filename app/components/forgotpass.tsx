import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AxiosHelper from '../util/AxiosHelper';
import Toast from 'react-native-toast-message';

const ForgotPass = () => {
  const navigation = useNavigation();

  const [emailUser, setEmailUser] = useState("");

  const showSuccessToast = () => {
    Toast.show({
      type: "success", //error, info
      text1: "Notification:",
      text2: "Successfully sending OTP code to your Email!",
      autoHide: true,
      visibilityTime: 2500,

    });
  }

  const showErrorToast = () => {
    Toast.show({
      type: "error", //error, info
      text1: "Warning:",
      text2: "Cannot sending OTP code to your Email ! Please check.",
      autoHide: true,
      visibilityTime: 2500,

    });
  }

  const handleSubmit = async() => {
    try {
      const response = await AxiosHelper.post("/users/send-otp",{
        email: emailUser
      });
      if(response.data.success == true){
        showSuccessToast();
        navigation.navigate("VerifyOTP", {data: emailUser, otp: response.data.OTP});
      } else  if (response.data.success == false){
        showErrorToast();
      }
    } catch (error) {
      console.log(error);
    }
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
        }}>Back to Login</Text>
      </TouchableOpacity>
      <Toast/>
      <Text style={styles.title}>Recover Password</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <Text style={styles.titleContent}>Forgot your password? Don't worry, enter your</Text>
          <Text style={styles.titleContent}>email to reset your current passord.</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmailUser}
          value={emailUser} 
          placeholder='Enter Email'/>
          <TouchableOpacity 
          onPress={handleSubmit}
          style={styles.submitButton}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000"
            }}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.bottomItem}>
            <Text style={{
                fontSize: 15,
                fontWeight: "300",
                color: "#fff"
            }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFC300"
                    }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ForgotPass

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
title:{
    marginTop: 80,
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
},
box:{
    marginHorizontal: 15,
    marginTop: 20,
    height: "30%",
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
bottomItem:{
  flexDirection: 'row',
  alignSelf: 'center',
  marginTop: 25,
  gap: 5,
}
})