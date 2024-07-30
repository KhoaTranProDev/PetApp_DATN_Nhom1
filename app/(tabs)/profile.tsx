import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosHelper from "../util/AxiosHelper";
import axios from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Profile = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [avatarUser, setAvatarUser] = useState("");
  const [userData, setUserData] = useState({});
  const [googleUser, setGoogleUser] = useState({});
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //Kiem tra dang nhap voi google
        const googleData = await AsyncStorage.getItem("ggUserData");
        if (googleData) {
          setGoogleUser(JSON.parse(googleData));
          setIsGoogleLogin(true);
        }
        //kiem tra dang nhap voi user thong thuong
        const idUser = await AsyncStorage.getItem("userId");
        if (idUser) {
          const response = await AxiosHelper.get(`/users/get-user/${idUser}`);
          setUserData(response.data.user);
          setIsGoogleLogin(false);
          setAvatarUser(response.data.user.avatar);
          setEmailUser(response.data.user.email);
          setUsername(response.data.user.name);
        } else {
          console.error("UserId not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      setIsLogout(true);
      googleLogout();
      navigation.navigate("Login", {
        isLogout: isLogout,
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const googleLogout = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerOption}>
        <Text style={styles.title}>Account</Text>
      </View>
      <View style={styles.boxAccount}>
        {isGoogleLogin ? (
          <Image
            style={{ width: 80, height: 80, borderRadius: 50 }}
            source={require("./img/defaultpic.jpg")}
          />
        ) : (
          <Image
            style={{ width: 80, height: 80, borderRadius: 50 }}
            source={{ uri: avatarUser }}
          />
        )}
        <View style={styles.middleBoxAccount}>
          <Text style={styles.nameText}>
            {isGoogleLogin ? googleUser.user.name : username}
          </Text>
          <Text style={styles.emailText}>
            {isGoogleLogin ? googleUser.user.email : emailUser}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileDetails")}
        style={styles.boxProfileDetail}
      >
        <View style={styles.boxUser}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./img/userIcon.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          Profile Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Payment")}
        style={styles.boxPaymentDetail}
      >
        <View style={styles.boxUser}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./img/credit-card.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          Payment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boxOrderDetail}>
        <View style={styles.boxUser}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./img/oderIcon.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          My Order
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine}></View>

      {/* <TouchableOpacity style={styles.boxFeedbackDetail}>
        <View style={styles.boxUser}>
            <Image style={{width:30, height: 30}} source={require('./img/selling.png')}/>
        </View>
        <Text style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20
        }}>My Selling Request Order</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={handleLogout} style={styles.boxLogout}>
        <View style={styles.boxUser}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("./img/logout.png")}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerOption: {
    marginTop: 130,
    marginLeft: 20,
    marginBottom: 20,
    width: 100,
    borderColor: "#0047AB",
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  boxAccount: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    height: 100,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  middleBoxAccount: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
  },
  emailText: {
    fontSize: 16,
    fontWeight: "300",
  },
  boxProfileDetail: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
  boxPaymentDetail: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
  boxOrderDetail: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
  boxUser: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
    marginHorizontal: 20,
    marginTop: 20,
  },
  boxFeedbackDetail: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
  boxLogout: {
    flex: 0,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
});
