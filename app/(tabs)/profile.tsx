import { Alert, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useNavigation } from 'expo-router'

const Profile = () => { 
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
        <View style={styles.headerOption}>
            <Text style={styles.title}>Account</Text>
        </View>
      <View style={styles.boxAccount}>
        <Image
        style={{width: 80, height: 80, borderRadius: 50}}
        source={{uri:"https://i.pinimg.com/736x/56/3f/0b/563f0b714e90f9195c1d63b09f5fb8e1.jpg"}}/>
        <View style={styles.middleBoxAccount}>
            <Text style={styles.nameText}>Khoa Trần</Text>
            <Text style={styles.emailText}>khoatldps24667@fpt.edu.vn</Text>
        </View>
      </View>

      <TouchableOpacity 
      onPress={() => navigation.navigate("ProfileDetails")}
      style={styles.boxProfileDetail}>
            <View style={styles.boxUser}>
                <Image style={{width:30, height: 30}} source={require('./img/userIcon.png')}/>
            </View>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 10,
                marginLeft: 20
            }}>Profile Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> navigation.navigate("Payment")}
        style={styles.boxPaymentDetail}>
            <View style={styles.boxUser}>
                <Image style={{width:30, height: 30}} source={require('./img/credit-card.png')}/>
            </View>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                marginTop: 10,
                marginLeft: 20
            }}>Payment</Text>
        </TouchableOpacity>

      

      <TouchableOpacity style={styles.boxOrderDetail}>
        <View style={styles.boxUser}>
            <Image style={{width:30, height: 30}} source={require('./img/oderIcon.png')}/>
        </View>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20
        }}>My Order</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine}></View>

      <TouchableOpacity style={styles.boxFeedbackDetail}>
        <View style={styles.boxUser}>
            <Image style={{width:30, height: 30}} source={require('./img/feedback.png')}/>
        </View>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20
        }}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boxFeedbackDetail}
       onPress={() => setModalVisible(true)}>
        <View style={styles.boxUser}>
            <Image style={{width:30, height: 30}} source={require('./img/selling.png')}/>
        </View>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20
        }}>My Selling Request Order</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Giống </Text>
            <Text style={styles.modalText}>Tên </Text>
            <Text style={styles.modalText}>Tuổi </Text>
            <Text style={styles.modalText}>Cân Nặng </Text>
            <TouchableOpacity style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity 
      onPress={() => navigation.navigate("Login")}
      style={styles.boxLogout}>
        <View style={styles.boxUser}>
            <Image style={{width:30, height: 30}} source={require('./img/logout.png')}/>
        </View>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20
        }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    headerOption:{
        marginTop: 130,
        marginLeft: 20,
        marginBottom: 20,
        width: 100,
        borderColor: '#0047AB',
        borderBottomWidth: 2,
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold'
    },
    boxAccount:{
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: 100,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderColor: "#CFCFCF"
    },
    middleBoxAccount:{
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 15,
    },
    nameText:{
        fontSize: 20,
        fontWeight: "700"
    },
    emailText:{
        fontSize: 16,
        fontWeight: "300"
    },
    boxProfileDetail:{
        flex: 0,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 60,
    },
    boxPaymentDetail:{
        flex: 0,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 60,
    },
    boxOrderDetail:{
        flex: 0,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 60,
    },
    boxUser:{
        width: 50,
        height: 50,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    horizontalLine:{
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
        marginHorizontal: 20,
        marginTop: 20,
    },
    boxFeedbackDetail:{
        flex: 0,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 60,
    },
    boxLogout:{
        flex: 0,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        width: Dimensions.get('window').width,
        height: 60,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
      marginBottom: 15,
      textAlign: 'center',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})