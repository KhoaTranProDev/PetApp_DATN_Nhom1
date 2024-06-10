import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Login = () => {
    const [showPassword, setshowPassword] = useState(false);

    const toggleShowPassword = () => {
        setshowPassword(!showPassword);
    }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,
      }}/>
      <Text style={styles.title}>Login</Text>
      <View style={styles.box}>
        <TextInput style={styles.textInput} placeholder='Email'/>
        <View style={styles.containerPassword}> 
                <TextInput 
                    // Set secureTextEntry prop to hide  
                    //password when showPassword is false 
                    secureTextEntry={!showPassword} 
                    style={styles.input} 
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
        <Link href={'home'} asChild>
            <TouchableOpacity style={styles.ContinueButton}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#000'
                }}>Continue</Text>
            </TouchableOpacity>
        </Link>
        <TouchableOpacity>
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
            source={require('./(tabs)/img/facebook.png')}/>
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
            source={require('./(tabs)/img/google.png')}/>
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
            <Link href={'signup'} asChild>
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFC300"
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </Link>
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
        marginTop: 200,
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