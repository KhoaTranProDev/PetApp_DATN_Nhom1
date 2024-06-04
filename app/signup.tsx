import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,
      }}/>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <Text>Looks like you don't have an account.</Text>
          <Text>Let's create a new account for you</Text>
        </View>
        <TextInput style={styles.textInput} placeholder='Email'/>
        <TextInput style={styles.textInput} placeholder='Password'/>
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
                fontWeight: "400",
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

export default SignUp

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  title:{
    marginTop: 200,
    marginHorizontal: 20,
    fontSize: 32,
    fontWeight: "700"
},
headerContent:{
  marginHorizontal: 15,
  marginTop: 20
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
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
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