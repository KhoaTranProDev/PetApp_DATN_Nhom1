import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { sendNewPost } from "@/app/components/services/pet";

interface SendNewPostModalProps {
  cloneModal: any;
}

const SendNewPostModal: React.FC<SendNewPostModalProps> = (props) => {
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueAlike, setInputValueAlike] = useState("");
  const [inputValueYearOld, setInputValueYearOld] = useState("");
  const [inputValuePrice, setInputValuePrice] = useState("");
  const [inputValueWeight, setInputValueWeight] = useState("");
  const [inputValueDescribe, setInputValueDescribe] = useState("");

  const handleSubmit = async () => {
    const postData = {
      name: inputValueName,
      alike: inputValueAlike,
      yearold: inputValueYearOld,
      price: inputValuePrice,
      weight: inputValueWeight,
      describe: inputValueDescribe,
    };

    const response = await sendNewPost(postData);

    if (response.status === 1) {
      ToastAndroid.show("Bài viết đang chờ duyệt !", ToastAndroid.SHORT);
      props.cloneModal();
    } else {
      console.log("Lỗi khi gửi bài viết");
    }
  };

  return (
    <View style={styles.modalViewNewPost}>
      <Text style={styles.titleText}>Nhập thông tin thú cưng</Text>
      {/* name */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên thú cưng của bạn"
        value={inputValueName}
        onChangeText={setInputValueName}
      />
      {/* alike */}
      <TextInput
        style={styles.input}
        placeholder="Nhập giống thú cưng của bạn"
        value={inputValueAlike}
        onChangeText={setInputValueAlike}
      />
      {/* year old */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi của thú cưng"
        value={inputValueYearOld}
        onChangeText={setInputValueYearOld}
        keyboardType="numeric"
      />
      {/* price */}
      <TextInput
        style={styles.input}
        placeholder="Nhập giá của thú cưng"
        value={inputValuePrice}
        onChangeText={setInputValuePrice}
        keyboardType="numeric"
      />
      {/* weight */}
      <TextInput
        style={styles.input}
        placeholder="Nhập cân nặng của thú cưng"
        value={inputValueWeight}
        onChangeText={setInputValueWeight}
      />
      {/* describe */}
      <TextInput
        style={styles.input}
        placeholder="Nhập mô tả thú cưng của bạn"
        value={inputValueDescribe}
        onChangeText={setInputValueDescribe}
      />
      {/* up image */}
      <TouchableOpacity style={styles.btnUpImage}>
        <Text>Thêm ảnh thú cưng</Text>
      </TouchableOpacity>
      <View style={styles.freamUpCan}>
        {/* button cancel */}
        <TouchableOpacity onPress={props.cloneModal} style={styles.btnCancel}>
          <Text style={{ color: "#fff" }}>Hủy</Text>
        </TouchableOpacity>
        {/* button upload */}
        <TouchableOpacity onPress={handleSubmit} style={styles.btnUpload}>
          <Text style={{ color: "#fff" }}>Đăng bài</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendNewPostModal;

const styles = StyleSheet.create({
  modalViewNewPost: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: "#F7F7F7",
  },
  subtitleText: {
    marginBottom: 10,
    color: "#555",
    fontWeight: "500",
  },
  btnUpImage: {
    width: "100%",
    height: 40,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  freamUpCan: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnUpload: {
    width: "40%",
    height: 40,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  btnCancel: {
    width: "40%",
    height: 40,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
});
