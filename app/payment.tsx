import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Payment = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        title: "Payment",
      }}/>
      <Text style={styles.title}>Add payment medthod</Text>
      <Text style={{
        marginHorizontal: 15,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
      }}>Add a payment medthod right now to immediately own your own pets!</Text>
      <View style={styles.CardNamebox}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600"
        }}>Cardholder Name</Text>
        <TextInput autoCapitalize='words' style={styles.inputStyle} placeholder='John Smith'/>
      </View>

      <View style={styles.CardNumberbox}>
        <Text style={{
            fontSize: 18,
            fontWeight: "600"
        }}>Card Number</Text>
        <View style={styles.CardNumberStyle}>
            <TextInput keyboardType='number-pad' style={styles.inputNumberStyle} placeholder='**** **** **** ****'/>
            <Image 
            style={{
                marginLeft: 10,
                marginTop: 2
            }}
            source={require('./(tabs)/img/visa.png')}/>
        </View>
      </View>

      <View style={styles.textStyle}>
        <Text style={{
                fontSize: 18,
                fontWeight: "600"
        }}>Expiration date</Text>
        <Text style={{
                fontSize: 18,
                fontWeight: "600"
        }}>CCV</Text>
      </View>
      <View style={styles.boxInputStyle}>
        <TextInput keyboardType='number-pad' style={styles.inputCCVStyle} placeholder='dd/mm/yyyy'/>
        <TextInput keyboardType='number-pad' style={styles.inputCCVStyle} placeholder='118'/>
      </View>
      <TouchableOpacity style={styles.paymentButton}>
        <Text style={{
            fontSize: 18,
            color: '#fff',
            fontWeight: '600'
        }}>Add Payment Medthod</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontSize: 24,
        fontWeight: "600",
        marginTop: 15,
        marginHorizontal: 15,
        color: "#C70039"
      },
      CardNamebox:{
        marginHorizontal: 15,
        marginTop: 40
      },
      inputStyle:{
        borderWidth: 1,
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        padding: 15,
      },
      inputNumberStyle:{
        flex: 1,
        borderWidth: 1,
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        padding: 15,
      },
      CardNumberbox:{
        marginHorizontal: 15,
        marginTop: 20
      },
      CardNumberStyle:{
        flexDirection: 'row',
      },
      textStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10
      },
      boxInputStyle:{
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      inputCCVStyle:{
        borderWidth: 1,
        height: 50,
        width: 120,
        marginTop: 10,
        borderRadius: 10,
        padding: 15,
      },
      paymentButton:{
        borderWidth: 1,
        height: 50,
        marginHorizontal: 15,
        marginTop: 100,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0047AB'
      }
})