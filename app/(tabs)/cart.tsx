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
  ToastAndroid,
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
import {
  deleteIdCart,
  getCartAll,
  getCartIdUser,
} from "../components/services/cart";
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
  const [listPickPet, setListPickPet] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const checkSoldItems = () => {
    for (let item of cartData) {
      if (item.idPet.status === "sold") {
        ToastAndroid.show(
          `Sản phẩm có tên "${item.idPet.name}" đã bán vui lòng xóa`,
          ToastAndroid.SHORT
        );
        return true;
      }
    }
    return false;
  };

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
          onPress: async () => {
            try {
              await deleteIdCart(id);
              const resCart = await getCartIdUser(user?._id);
              setCartData(resCart);
            } catch (error) {
              console.log("Lỗi handleDelete ở cart (tabs): ", error);
            }
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
        cartData.forEach((item: any) => {
          updatedItems[item?._id] = updatedItems[id];
        });
      } else {
        updatedItems["all"] = Object.keys(updatedItems).every(
          (itemId) => updatedItems[itemId]
        );
      }

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = cartData.find(
            (item: any) => item?._id === itemId
          );
          totalPrice += selectedItem ? Number(selectedItem.idPet.price) : 0;
        }
      });

      setTotalPrice(totalPrice);
      setTotalPriceTxt(totalPrice);

      const listPickPetTemp = cartData.filter(
        (item: any) => updatedItems[item?._id]
      );
      setListPickPet(listPickPetTemp);

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
  };

  const toggleGroupCheckbox = (idUser: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      const allChecked = !prev[idUser];

      updatedItems[idUser] = allChecked;

      cartData.forEach((item: any) => {
        if (item.idPet.idUser?._id === idUser) {
          updatedItems[item?._id] = allChecked;
        }
      });

      updatedItems["all"] = Object.keys(updatedItems).every(
        (itemId) => updatedItems[itemId]
      );

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = cartData.find(
            (item: any) => item?._id === itemId
          );
          totalPrice += selectedItem ? Number(selectedItem.idPet.price) : 0;
        }
      });

      setTotalPrice(totalPrice);
      setTotalPriceTxt(totalPrice);

      const listPickPetTemp = cartData.filter(
        (item: any) => updatedItems[item?._id]
      );
      setListPickPet(listPickPetTemp);

      return updatedItems;
    });
  };

  const handleNotifiTT = () => {
    ToastAndroid.show(
      "Vui lòng chọn một em pet để thanh toán nhé ! ^^",
      ToastAndroid.SHORT
    );
  };

  const renderProduct = (product: any) => (
    <Swipeable
      key={product._id}
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => handleDelete(product?._id, product?.idPet?.name)}
          style={styles.btnDelete}
        >
          <Image
            style={styles.imgDelete}
            source={require("./img/Delete_25px.png")}
          />
        </TouchableOpacity>
      )}
    >
      {product?.idPet?.idUser?._id !== user?._id && (
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
                value={checkedItems[product?._id] || false}
                onValueChange={() => toggleCheckbox(product?._id)}
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
                {formatNumber(product?.idPet?.price)} Đ
              </Text>
            </View>
          </View>
        </View>
      )}
    </Swipeable>
  );

  const renderGroup = ({ item }: { item: any }) => {
    return (
      <View key={item?.items[0]?.idPet?.idUser?._id}>
        <View style={styles.frameCheckBoxAll}>
          <Text style={styles.userHeader}>
            {item?.items[0].idPet?.idUser?.name}
          </Text>
          <CheckBox
            value={checkedItems[item.items[0].idPet?.idUser?._id] || false}
            onValueChange={() =>
              toggleGroupCheckbox(item.items[0].idPet?.idUser?._id)
            }
            style={styles.checkBoxAll}
          />
        </View>
        {item.items.map((product: any) => renderProduct(product))}
      </View>
    );
  };

  const onGetUserId = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const resIdUser = await getDetailUser(userId);
      setUser(resIdUser?.user);
      const resCart = await getCartIdUser(resIdUser?.user?._id);
      const approvedCart = resCart.filter(
        (item: any) => item.idPet.status === "approved"
      );
      setCartData(approvedCart);
      setIsLoading(false);
    } catch (error) {
      console.log("Lỗi onGetUserId ở cart (tabs): ", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onGetUserId();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onGetUserId();
      setTotalPrice(calculateTotalPrice(cartData));
      setTotalPriceTxt(0);
    });

    return unsubscribe;
  }, [navigation, cartData]);

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
              refreshing={refreshing}
              onRefresh={onRefresh}
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
                    {formatNumberTT(totalPrice)} Đ
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {listPickPet.length > 0 ? (
                  <TouchableOpacity
                    style={styles.btnCheckout}
                    onPress={() => {
                      if (!checkSoldItems()) {
                        navigation.navigate("PayScreen", {
                          totalPriceTxt,
                          listPickPet,
                          user,
                        });
                      }
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}
                    >
                      Thanh toán: {formatNumberTT(totalPriceTxt)}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnCheckout}
                    onPress={handleNotifiTT}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}
                    >
                      Thanh toán: {formatNumberTT(totalPriceTxt)}
                    </Text>
                  </TouchableOpacity>
                )}
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
