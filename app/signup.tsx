import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignUp = () => {

    const [showPassword, setshowPassword] = useState(false);

    const toggleShowPassword = () => {
        setshowPassword(!showPassword);
    }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,
      }}/>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <Text style={styles.titleContent}>Looks like you don't have an account.</Text>
          <Text style={styles.titleContent}>Let's create a new account for you.</Text>
        </View>
        <TextInput style={styles.textInput} placeholder='Name'/>
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
        <Text style={styles.textContent}>By selecting Create Account below, i agree to</Text>
        <Text style={styles.textBoldContent}>Terms of Service & Privacy Policy</Text>
        <TouchableOpacity style={styles.CreateButton}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#000'
                }}>Create Account</Text>
            </TouchableOpacity>
        <View style={styles.bottomItem}>
            <Text style={{
                fontSize: 15,
                fontWeight: "300",
                color: "#fff"
            }}>Already have an account?</Text>
            <Link href={'login'} asChild>
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFC300"
                    }}>Login</Text>
                </TouchableOpacity>
            </Link>
        </View>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
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
  container:{
    flex: 1,
  },
  title:{
    marginTop: 200,
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
textContent:{
    fontSize: 16,
    color:"#fff",
    fontWeight: "300",
    marginHorizontal: 20,
    marginTop: 10
},
textBoldContent:{
    fontSize: 16,
    color:"#FFC300",
    fontWeight: "600",
    marginHorizontal: 20,
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
    padding: 15,
},
inputPass:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
CreateButton:{
    height: 50,
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: '#FFC300',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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