import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AxiosHelper from "../util/AxiosHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUpDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, username, password } = route.params;
  const defaultImage =
    "https://i.pinimg.com/564x/e5/9e/51/e59e51dcbba47985a013544769015f25.jpg";

  const [imageURL, setImageURL] = useState(defaultImage);
  const [Name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [Address, setAddress] = useState("");
  const [Contact, setContact] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setshowPicker] = useState(false);

  function toggleDatePicker() {
    setshowPicker(!showPicker);
  }

  function onDateChange({ type }, selectedDate) {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  }

  async function captureImage() {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        //save Image
        await saveImage(result.assets[0].uri);
        setmodalVisible(false);
      }
    } catch (error) {
      alert("Error uploading image: " + error);
      setmodalVisible(false);
    }
  }

  async function openGalleryImage() {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        //save Image
        await saveImage(result.assets[0].uri);
        setmodalVisible(false);
      }
    } catch (error) {
      alert("Error uploading image: " + error);
      setmodalVisible(false);
    }
  }

  async function saveImage(image: string) {
    try {
      //update display image
      setImageURL(image);
    } catch (error) {
      throw error;
    }
  }

  async function removeImage() {
    try {
      setImageURL(defaultImage);
      setmodalVisible(false);
    } catch (error) {
      alert("Error removing image: " + error);
      setmodalVisible(false);
    }
  }

  const handleRegisterAccount = async () => {
    try {
      const response = await AxiosHelper.post("/users/add", {
        name: Name,
        addressUser: Address,
        email: email,
        sdt: Contact,
        username: username,
        password: password,
        avatar: imageURL,
        birthDayOf: dateOfBirth,
      });
      console.log(response);
      if (response.data.status == 1) {
        ToastAndroid.show("Đăng ký tài khoản thành công!", ToastAndroid.SHORT);
        navigation.navigate("Login");
      } else {
        ToastAndroid.show("Đăng ký tài khoản thất bại!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../(tabs)/img/goBack.png")}
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 34,
            fontWeight: "500",
          }}
        >
          Back to Sign Up
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.box}>
        <View style={styles.headerContent}>
          <Text style={styles.titleContent}>
            Wow, Thank you for creating an account on our platform! Just a few
            more steps to complete.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setmodalVisible(true)}
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            style={{ width: 120, height: 120, borderRadius: 60 }}
            source={{ uri: imageURL }}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              fontStyle: "italic",
              color: "#fff",
            }}
          >
            Change profile photo
          </Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TextInput
            style={styles.textInput}
            value={Name}
            onChangeText={setName}
            placeholder="Enter Your Name"
          />
          <View>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onDateChange}
              />
            )}
            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={styles.textInput}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="Enter Your Born"
                  editable={false}
                />
              </Pressable>
            )}
          </View>
          <TextInput
            style={styles.textInput}
            value={Address}
            onChangeText={setAddress}
            placeholder="Enter Your Address"
          />
          <TextInput
            style={styles.textInput}
            value={Contact}
            onChangeText={setContact}
            keyboardType="number-pad"
            placeholder="Enter Your Contact"
          />
        </KeyboardAwareScrollView>
        <Text style={styles.textContent}>
          By selecting Create Account below, i agree to
        </Text>
        <Text style={styles.textBoldContent}>
          Terms of Service & Privacy Policy
        </Text>
        <TouchableOpacity
          onPress={handleRegisterAccount}
          style={styles.CreateButton}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#000",
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 180,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => setmodalVisible(!modalVisible)}
                style={{
                  alignSelf: "flex-end",
                  marginRight: 25,
                }}
              >
                <Text>x</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 24, color: "#000", fontWeight: "700" }}>
                Profile Photo
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 15,
                gap: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => captureImage()}
                style={{
                  width: 70,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E5E4E2",
                  borderRadius: 10,
                }}
              >
                <Image
                  style={{ tintColor: "#C70039" }}
                  source={require("./image/camera.png")}
                />
                <Text>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openGalleryImage()}
                style={{
                  width: 70,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E5E4E2",
                  borderRadius: 10,
                }}
              >
                <Image
                  style={{ tintColor: "#C70039" }}
                  source={require("./image/gallery.png")}
                />
                <Text>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeImage()}
                style={{
                  width: 70,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E5E4E2",
                  borderRadius: 10,
                }}
              >
                <Image
                  style={{ tintColor: "#808080" }}
                  source={require("./image/trash.png")}
                />
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignUpDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 35,
    fontWeight: "900",
  },
  headerContent: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  titleContent: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "300",
  },
  textContent: {
    flex: 0,
    fontSize: 16,
    color: "#fff",
    fontWeight: "300",
    marginHorizontal: 20,
  },
  textBoldContent: {
    flex: 0,
    fontSize: 16,
    color: "#FFC300",
    fontWeight: "600",
    marginHorizontal: 20,
  },
  box: {
    marginHorizontal: 15,
    marginTop: 20,
    height: "78%",
    backgroundColor: "#900C3F",
    borderRadius: 15,
  },
  textInput: {
    height: 50,
    marginHorizontal: 15,
    marginTop: 25,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 15,
  },
  inputPass: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  CreateButton: {
    flex: 0,
    height: 60,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 15,
    backgroundColor: "#FFC300",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 15,
    marginTop: 70,
  },
});
