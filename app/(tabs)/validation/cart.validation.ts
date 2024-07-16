import { ToastAndroid } from "react-native";

export const validatePostData = (postData: any): boolean => {
  if (!postData.name) {
    ToastAndroid.show("Vui lòng nhập tên thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.alike) {
    ToastAndroid.show("Vui lòng nhập giống thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.yearold) {
    ToastAndroid.show("Vui lòng nhập tuổi thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.price) {
    ToastAndroid.show("Vui lòng nhập giá thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.weight) {
    ToastAndroid.show("Vui lòng nhập cân nặng thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.describe) {
    ToastAndroid.show("Vui lòng nhập mô tả thú cưng", ToastAndroid.SHORT);
    return false;
  }

  if (!postData.image) {
    ToastAndroid.show("Vui lòng chọn ảnh của thú cưng để dễ bán nhé !", ToastAndroid.SHORT);
    return false;
  }

  return true;
};
