import { Dimensions, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AxiosHelper from '../util/AxiosHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();
    const [showPassword, setshowPassword] = useState(false);
    const [userName, setUserName] = useState("");
    const [passwordUser, setPasswordUser] = useState("");

    const toggleShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const handleLogin = async() => {
        try {
            const response = await AxiosHelper.post("/users/login", {
                username: userName,
                password: passwordUser
            });
            
            if(response.data.status == 1){
                await AsyncStorage.setItem('userId', response.data.user._id);
                ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
                navigation.navigate("HomeScreen");
            } else {
                ToastAndroid.show("Đăng nhập thất bại!", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.box}>
        <TextInput
        style={styles.textInput} 
        onChangeText={setUserName}
        value={userName}
        placeholder='Enter Username'/>
        <View style={styles.containerPassword}> 
                <TextInput  
                    secureTextEntry={!showPassword} 
                    style={styles.input} 
                    onChangeText={setPasswordUser}
                    value={passwordUser}
                    placeholder="Enter Password"
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
        <TouchableOpacity 
        onPress={handleLogin}
        style={styles.ContinueButton}>
            <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#000'
            }}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPass")}>
            <Text style={{
            fontSize: 15,
            fontWeight: '400',
            alignSelf: 'center',
            marginTop: 10,
            color: '#fff'
        }}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>
        <TouchableOpacity style={styles.fbButton}>
            <Image 
            style={{width: 30, height: 30, margin: 10}}
            source={require('../(tabs)/img/facebook.png')}/>
            <Text style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 50,
            }}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggButton}>
            <Image 
            style={{width: 30, height: 30, margin: 10}}
            source={require('../(tabs)/img/google.png')}/>
            <Text style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 50,
            }}>Login with Google</Text>
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

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        marginTop: 150,
        marginHorizontal: 20,
        fontSize: 35,
        fontWeight: "900"
    },
    box:{
        marginHorizontal: 15,
        marginTop: 20,
        height: "60%",
        backgroundColor: '#900C3F',
        borderRadius: 15,
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
    ContinueButton:{
        height: 50,
        marginHorizontal: 15,
        marginTop: 25,
        backgroundColor: '#FFC300',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontalLine:{
        marginTop: 25,
        marginHorizontal: 15,
        borderWidth: 0.5,
    },
    fbButton:{
        height: 50,
        marginHorizontal: 15,
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
    },
    ggButton:{
        height: 50,
        marginHorizontal: 15,
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
    },
    bottomItem:{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 25,
        gap: 5,
    }
})