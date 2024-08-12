import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

// css
import { styles } from "../styles/payScreen";

// data
import { DataAddress, DataCart } from "../Data/main";
import { getListPayIdUser } from "../services/address";
import { addPay } from "../services/pay";
import { deleteIdCart, deleteManyCart } from "../services/cart";
import * as WebBrowser from 'expo-web-browser';

interface Props {
  route: any;
  navigation: any;
}

const PayScreen: React.FC<Props> = ({ route, navigation }) => {
  const {
    selectedOption = "cash",
    totalPriceTxt,
    listPickPet,
    user,
  } = route?.params ?? {};
  const [paymentOption, setPaymentOption] = useState<string | null>(
    selectedOption
  );
  const [addAddress, setAddAddress] = useState<any>([]);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const ship = 15000;
  const total = totalPriceTxt + ship;
  const listPayPet = listPickPet.map((item: any) => item.idPet._id);
  const idCart = listPickPet.map((item: any) => item._id);

  // console.log("selectedOption in PayScreen", paymentOption);

  useEffect(() => {
    if (route?.params?.selectedOption) {
      setPaymentOption(route?.params?.selectedOption);
    } else {
      setPaymentOption("cash");
    }
  }, [route?.params?.selectedOption]);

  const paymentOptionConvert = (option: string | null) => {
    switch (option) {
      case "cash":
        return "Thanh toán tiền mặt";
      case "app":
        return "Thanh toán qua ứng dụng";
      case "atm":
        return "Thanh toán qua thẻ ATM";
      case "credit":
        return "Thanh toán bằng thẻ tín dụng";
      case "wallet":
        return "Thanh toán bằng VN Pay";
      default:
        return option;
    }
  };

  const formatNumberTT = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const handlePay = async () => {
    if (!addAddress[0]?.address) {
      ToastAndroid.show(
        "Vui lòng thêm địa chỉ nhận hàng trước khi thanh toán !",
        ToastAndroid.SHORT
      );
      return;
    }
  
    Alert.alert(
      `Cảnh báo !!!`,
      "Bạn xác nhận muốn thanh toán đơn hàng này không ?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Chấp nhận",
          onPress: async () => {
            if (paymentOption === "wallet") {
              const result = await WebBrowser.openBrowserAsync(
                "https://sandbox.vnpayment.vn/tryitnow/Home/CreateOrder"
              );
              if (result.type === "cancel" || result.type === "dismiss") {
                handleCloseWebViewHuy();
              } else {
                handleCloseWebView();
              }
            } else {
              const data = {
                total,
                idUser: user._id,
                moneyType: paymentOption,
                petId: listPayPet,
              };
              await addPay(data);
              await deleteManyCart(idCart);
              ToastAndroid.show("Thanh toán thành công", ToastAndroid.SHORT);
              navigation.replace("Home");
            }
          },
        },
      ]
    );
  };
  

  const handleCloseWebView = async () => {
    const data = {
      total,
      idUser: user._id,
      moneyType: paymentOption,
      petId: listPayPet,
    };
    const res = await addPay(data);
    await deleteManyCart(idCart);
    ToastAndroid.show("Thanh toán thành công", ToastAndroid.SHORT);
    navigation.replace("Home");
  };

  const handleCloseWebViewHuy = async () => {
    setShowWebView(false);
    setWebViewUrl(null);
  };

  const onGetListPayIdUser = async () => {
    const res = await getListPayIdUser(user._id);
    res.sort((a: any, b: any) =>
      a.defaultA === b.defaultA ? 0 : a.defaultA ? -1 : 1
    );
    setAddAddress(res);
  };

  useEffect(() => {
    onGetListPayIdUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onGetListPayIdUser();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.ContainerMain}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imgSize28Header}
            source={require("../image/back_to_50px.png")}
          />
        </TouchableOpacity>
        <Text style={styles.txtThanhToan}>Thanh toán</Text>
        <TouchableOpacity onPress={() => Linking.openURL("tel:0900332211")}>
          <Image
            style={styles.imgCall}
            source={require("../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={styles.body}>
        {/* Frame Product */}
        <View style={styles.frameProduct}>
          <View style={styles.frameImg}>
            <Image
              style={styles.imgProduct}
              source={{ uri: listPickPet[0]?.idPet?.image[0] }}
            />
          </View>
          <View style={styles.frameInfo}>
            <View style={styles.showProduct}>
              <Text style={styles.txtNameProduct}>
                {listPickPet[0]?.idPet?.name}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailProduct", { listPickPet, user })
                }
              >
                <Text style={styles.txtShowMore}>
                  Xem thêm ({listPickPet?.length})
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtUser}>
              {listPickPet[0]?.idPet?.idUser?.name ?? "Khác"}
            </Text>
            <View style={styles.framePrice}>
              <Text style={styles.txtPrice}>
                {formatNumberTT(totalPriceTxt)} Đ
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DetailProduct", { listPickPet, user })
                }
              >
                <Text style={styles.txtQuantity}>x{listPickPet?.length}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Frame Offers */}
        <View style={styles.frameOffers}>
          <Text style={styles.txtOffers}>Thanh toán bằng:</Text>
          <TouchableOpacity
            style={styles.addPayOffers}
            onPress={() =>
              navigation.navigate("MainPaymentType", {
                selectedOption: paymentOption,
                totalPriceTxt,
                listPickPet,
                user,
              })
            }
          >
            <Text style={styles.txtAddPayOffers}>
              {paymentOption
                ? paymentOptionConvert(paymentOption)
                : "Thêm hình thức thanh toán"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Order Product */}
        <View style={styles.frameOrderProduct}>
          <View style={styles.frameTxtOrder}>
            <Text style={styles.txtOrder}>Chi tiết đơn hàng</Text>
          </View>
          <View style={styles.frameDetailProduct}>
            <View style={styles.frameDetail}>
              <Text style={styles.txtDetail}>Tạm tính</Text>
              <Text style={styles.txtDetail}>
                {formatNumberTT(totalPriceTxt)} Đ
              </Text>
            </View>
            <View style={styles.frameDetail}>
              <Text style={styles.txtDetail}>Phí giao hàng</Text>
              <Text style={styles.txtDetail}>{formatNumberTT(ship)} Đ</Text>
            </View>
            <View style={styles.frameDetail}>
              <Text style={styles.txtDetail}>Giảm giá</Text>
              <Text style={styles.txtDetail}>0 Đ</Text>
            </View>
            <View style={styles.frameTotal}>
              <Text style={styles.txtDetail}>Tổng cộng</Text>
              <Text style={styles.txtDetail}>{formatNumberTT(total)} Đ</Text>
            </View>
          </View>
        </View>
        {/* Adress User */}
        <View style={styles.frameAdress}>
          <View style={styles.frameTxtAdress}>
            <Text style={styles.txtAdress}>Địa chỉ nhận hàng</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddDress", { listPickPet, user })
              }
            >
              <Text style={styles.txtAdressUpdate}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.frameDetailAdress}>
            {addAddress[0]?.address[0]?.name &&
            addAddress[0]?.address[1]?.name &&
            addAddress[0]?.address[2]?.name ? (
              <Text style={styles.txtDetailAdress}>
                {addAddress[0]?.address[0]?.name},
                {addAddress[0]?.address[1]?.name},
                {addAddress[0]?.address[2]?.name}
              </Text>
            ) : (
              <Text style={styles.txtDetailAdress}>
                Vui lòng thêm địa chỉ nhận hàng
              </Text>
            )}
          </View>
        </View>
      </View>
      {/* footer */}
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={styles.btnCheckout} onPress={handlePay}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {showWebView && webViewUrl && (
        <View style={styles.viewCloseWebView}>
          <View style={styles.btnBack}>
            <TouchableOpacity onPress={handleCloseWebViewHuy}>
              <Text style={styles.txtText}>HỦY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseWebView}>
              <Text style={styles.txtText}>LƯU</Text>
            </TouchableOpacity>
          </View>
          <WebB source={{ uri: webViewUrl }} style={{ flex: 1 }} />
        </View>
      )} */}
    </View>
  );
};

export default PayScreen;
