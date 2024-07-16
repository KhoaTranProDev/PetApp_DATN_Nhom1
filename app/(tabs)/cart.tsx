import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

// data
import { DataCart } from "./Data";

// css
import { styles } from "./styles/cartScreen";

// Lib
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CheckBox from "expo-checkbox";
import { getCartAll, getCartIdUser } from "../components/services/cart";
import SendNewPostModal from "./modals/cart.newposts";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDetailUser } from "./services/cart";

const groupItemsByUser = (data: any) => {
  const grouped = data.reduce((acc: any, item: any) => {
    const userId = item?.idPet?.idUser?._id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(item);
    return acc;
  }, {});
  return Object.entries(grouped).map(([idUser, items]) => ({
    idUser,
    items,
  }));
};

const calculateTotalPrice = (cartData: any) => {
  let total = 0;
  cartData.forEach((item: any) => {
    total += item.idPet.price;
  });
  return total;
};

const CartScreens: React.FC<{ navigation: any }> = (props) => {
  const { navigation } = props;
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [totalPriceTxt, setTotalPriceTxt] = useState(0);
  const [cartData, setCartData] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cartData));
  const [modalVisibleNewPost, setModalVisibleNewPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>({});

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      `Sản phẩm ${name}`,
      "Bạn có chắc muốn xóa sản phẩm này không ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setCartData((prev: any) =>
              prev.filter((item: any) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  const toggleCheckbox = (id: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[id] = !prev[id];

      if (id === "all") {
        Object.keys(updatedItems).forEach((itemId) => {
          updatedItems[itemId] = updatedItems[id];
        });
      } else {
        updatedItems["all"] = Object.keys(updatedItems).every(
          (itemId) => updatedItems[itemId]
        );
      }

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = cartData.find((item: any) => item._id === itemId);
          totalPrice += selectedItem ? Number(selectedItem.idPet.price) : 0;
        }
      });

      setTotalPrice(totalPrice);
      setTotalPriceTxt(totalPrice);

      return updatedItems;
    });
  };

  const formatNumber = (num: number) => {
    let formattedNum = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    if (formattedNum.length > 6) {
        formattedNum = formattedNum.slice(0, formattedNum.length - 3) + ".";
    }
    return formattedNum;
};

const formatNumberTT = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

  const toggleGroupCheckbox = (idUser: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      const allChecked = !prev[idUser];

      updatedItems[idUser] = allChecked;

      cartData.forEach((item: any) => {
        if (item.idPet.idUser._id === idUser) {
          updatedItems[item._id] = allChecked;
        }
      });

      updatedItems["all"] = Object.keys(updatedItems).every(
        (itemId) => updatedItems[itemId]
      );

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = cartData.find((item: any) => item._id === itemId);
          totalPrice += selectedItem ? Number(selectedItem.idPet.price) : 0;
        }
      });

      setTotalPrice(totalPrice);
      setTotalPriceTxt(totalPrice);

      return updatedItems;
    });
  };

  const renderProduct = (product: any) => (
    <Swipeable
      key={product._id}
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => handleDelete(product._id, product?.idPet?.name)}
          style={styles.btnDelete}
        >
          <Image
            style={styles.imgDelete}
            source={require("./img/Delete_25px.png")}
          />
        </TouchableOpacity>
      )}
    >
      {product?.idPet?.idUser._id !== user?._id && (
        <View style={styles.frameProduct}>
          <Image
            style={styles.imgProduct}
            source={{ uri: product?.idPet?.image[0] }}
          />
          <View>
            <View
              style={{
                width: "88%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.nameProduct}>{product?.idPet?.name}</Text>
              <CheckBox
                value={checkedItems[product._id] || false}
                onValueChange={() => toggleCheckbox(product._id)}
                style={{ width: 20, height: 20, marginTop: 10 }}
              />
            </View>
            <Text style={styles.nameGram}>
              Tuổi: {product?.idPet?.yearold} | Nặng: {product?.idPet?.weight}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.txtAlike}>Loài: {product?.idPet?.alike}</Text>
              <Text style={styles.txtPrice}>
                {formatNumber(product?.idPet?.price)} VNĐ
              </Text>
            </View>
          </View>
        </View>
      )}
    </Swipeable>
  );

  const renderGroup = ({ item }: { item: any }) => {
    return (
      <View key={item.items[0].idPet.idUser._id}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={styles.frameCheckBoxAll}>
            <Text style={styles.userHeader}>{item?.items[0].idPet?.idUser?.name}</Text>
            <CheckBox
              value={checkedItems[item.items[0].idPet.idUser._id] || false}
              onValueChange={() => toggleGroupCheckbox(item.items[0].idPet.idUser._id)}
              style={styles.checkBoxAll}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.txtUpdatePdAll}>Sửa</Text>
          </TouchableOpacity>
        </View>
        {item.items.map((product: any) => renderProduct(product))}
      </View>
    );
  };

  const onGetUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const resIdUser = await getDetailUser(userId);
      setUser(resIdUser.user);
      setIsLoading(true);
      const resCart = await getCartIdUser(resIdUser.user._id);
      setCartData(resCart);
      setIsLoading(false);
    } catch (error) {
      console.log("Lỗi onGetUserId ở cart (tabs): ", error);
    }
  };

  // console.log("cartData: ", cartData.map((item: any) => item?.idPet.idUser));

  useEffect(() => {
    onGetUserId();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cartData));
  }, [cartData]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#22b6c0" style={{ flex: 1 }} />
      ) : (
        <>
          <View style={styles.ContainerMain}>
            {/* header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{ marginTop: 15, width: 28, height: 28 }}
                  source={require("./img/back_to_50px.png")}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#6D3805",
                  marginTop: 15,
                }}
              >
                Giỏ hàng
              </Text>
              <TouchableOpacity onPress={() => setModalVisibleNewPost(true)}>
                <Image
                  style={{ marginTop: 15, width: 35, height: 35 }}
                  source={require("./img/goodnotes_50px.png")}
                />
              </TouchableOpacity>
            </View>

            {/* body */}
            <FlatList
              style={{ height: "70%" }}
              data={groupItemsByUser(cartData)}
              renderItem={renderGroup}
              keyExtractor={(item) => item.idUser}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={3000}
              removeClippedSubviews={true}
              onEndReachedThreshold={0.5}
            />

            {/* footer */}
            <View>
              <View style={styles.frameTotal}>
                <View style={styles.frameCheckBoxAll}>
                  <Text style={styles.userHeader}>Tất cả</Text>
                  <CheckBox
                    value={checkedItems["all"] || false}
                    onValueChange={() => toggleCheckbox("all")}
                    style={styles.checkBoxAll}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.txtTotal}>Tạm tính:</Text>
                  <Text style={styles.txtPriceTT}>
                    {formatNumberTT(totalPrice)} VNĐ
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.btnCheckout}
                  onPress={() => navigation.navigate("PayScreen")}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}
                  >
                    Thanh toán: {formatNumberTT(totalPriceTxt)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleNewPost}
            onRequestClose={() => {
              setModalVisibleNewPost(!modalVisibleNewPost);
            }}
          >
            <SendNewPostModal
              cloneModal={() => setModalVisibleNewPost(false)}
            />
          </Modal>
        </>
      )}
    </GestureHandlerRootView>
  );
};

export default CartScreens;
