import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { sendNewPost, uploadImageStatus } from "@/app/components/services/pet";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

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
  const [imagePath, setImagePath] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const postData = {
      name: inputValueName,
      alike: inputValueAlike,
      yearold: inputValueYearOld,
      price: inputValuePrice,
      weight: inputValueWeight,
      describe: inputValueDescribe,
      image: uploadedImages,
    };

    const response = await sendNewPost(postData);

    if (response.status === 1) {
      ToastAndroid.show("Bài viết đang chờ duyệt !", ToastAndroid.SHORT);
      props.cloneModal();
    } else {
      console.log("Lỗi khi gửi bài viết");
    }
  };

  useEffect(() => {
    if (imagePath.length > 0) {
      uploadImages();
    }
  }, [imagePath]);

  const openLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    const picker = pickerResult as any;
    if (!picker.cancelled) {
      const selectedImages = picker.assets.map((asset: any) => asset.uri);
      setImagePath(selectedImages);
    }
  };

  const uploadImages = async () => {
    try {
      const uploadPromises = imagePath.map(async (uri, index) => {
        const parts = uri.split(".");
        const fileType = parts[parts.length - 1];
  
        const formData = new FormData();
        const form = formData as any;
        form.append("image", {
          uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`,
        });
  
        const response = await uploadImageStatus(formData);
        return response.data.urls[0];
      });
  
      setLoading(true);
      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(uploadedUrls);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
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
        keyboardType="numeric"
      />
      {/* Nhập mô tả */}
      <TextInput
        style={styles.inputDescription}
        placeholder="Nhập mô tả"
        value={inputValueDescribe}
        onChangeText={setInputValueDescribe}
        multiline={true}
      />
      {/* up image */}
      <TouchableOpacity style={styles.btnUpImage} onPress={openLibrary}>
        <Text>Thêm ảnh thú cưng</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#22b6c0" />
      ) : (
        <>
          {uploadedImages?.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {uploadedImages?.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.selectedImage} />
              ))}
            </ScrollView>
          )}
        </>
      )}
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
  inputDescription: {
    width: "100%",
    borderColor: "#DFDFDF",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingBottom: 100,
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
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
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
