import { Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OTPInput from "./OTP/OTPInput"
import AxiosHelper from '../util/AxiosHelper'
import Toast from 'react-native-toast-message'

const VerifyOTP = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { data, otp } = route.params;

    const [otpCode, setOtpCode] = useState("");
    const [otpFromBase, setOtpFromBase] = useState(otp);
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 6;

    const showSuccessToast = () => {
      Toast.show({
        type: "success", //error, info
        text1: "Notification",
        text2: "Successfully sending OTP code to your Email !",
        autoHide: true,
        visibilityTime: 3000,
  
      });
    }
  
    const showErrorToast = () => {
      Toast.show({
        type: "error", //error, info
        text1: "Notification",
        text2: "Cannot verify your OTP code ! Please check again.",
        autoHide: true,
        visibilityTime: 3000,
  
      });
    }

    const showErrorOTPToast = () => {
      Toast.show({
        type: "error", //error, info
        text1: "Notification",
        text2: "OTP nhập không trùng khớp, vui lòng kiểm tra lại!",
        autoHide: true,
        visibilityTime: 3000,
  
      });
    }


    const handleVerifyCode = async() => {
      console.log(data, otpFromBase);
      if(otpFromBase == otpCode){
        navigation.navigate("SetPassword",{ email: data, otpReset: otpFromBase });
      } else {
        showErrorOTPToast();
      }
    }

    const resendOTP = async() => {
      try {
        const response = await AxiosHelper.post("/users/send-otp",{
          email: data
        });
        if(response.data.success == true){
          showSuccessToast();
          setOtpFromBase(response.data.OTP);
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
        <Toast/>
        <Image style={{width: 40,height: 40}} source={require("../(tabs)/img/goBack.png")}/>
        <Text style={{
          fontSize: 16,
          lineHeight: 34,
          fontWeight: "500"
        }}>Back to Recovery</Text>
      </TouchableOpacity>
      <Toast/>
      <Text style={styles.title}>Verify OTP Code</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <Text style={styles.titleContent}>An authentication code has been sent to your</Text>
          <Text style={styles.titleContent}>email.</Text>
        </View>
        <Pressable 
        onPress={Keyboard.dismiss}
        style={{marginTop: 10}}>
          <OTPInput
          code={otpCode}
          setCode={setOtpCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setIsPinReady}/>
        </Pressable>
          <TouchableOpacity 
          onPress={handleVerifyCode}
          style={styles.submitButton}>
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000"
            }}>Verify</Text>
          </TouchableOpacity>
          <View style={styles.bottomItem}>
            <Text style={{
                fontSize: 15,
                fontWeight: "300",
                color: "#fff"
            }}>Don't receive a code?</Text>
            <TouchableOpacity 
            onPress={resendOTP}
            style={{flexDirection: 'row'}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFC300"
                    }}>Resend</Text>
                    <Image style={{width: 20, height: 20, marginLeft: 2, tintColor:"#FFC300"}} source={require("../(tabs)/img/refresh.png")}/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default VerifyOTP

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
        height: "35%",
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