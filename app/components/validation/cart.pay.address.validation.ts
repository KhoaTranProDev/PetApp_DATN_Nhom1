import { ToastAndroid } from "react-native";

export const validateCartPayAdress = (vali: any): boolean => {
  if (!vali.name) {
    ToastAndroid.show("Vui lòng nhập tên người nhận", ToastAndroid.SHORT);
    return false;
  }

  if (!vali.phone) {
    ToastAndroid.show("Vui lòng nhập số điện thoại", ToastAndroid.SHORT);
    return false;
  }

  if (!vali.address) {
    ToastAndroid.show("Vui lòng nhập địa chỉ", ToastAndroid.SHORT);
    return false;
  }

  return true;
};
