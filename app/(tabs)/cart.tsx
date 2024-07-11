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
} from "react-native";
import React, { useEffect, useState } from "react";

// data
import { DataCart } from "./Data";

// css
import { styles } from "./styles/cartScreen";

// Lib
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CheckBox from "expo-checkbox";
import { getCartAll } from "../components/services/cart";
import SendNewPostModal from "./modals/cart.newposts";

const groupItemsByUser = (data: any) => {
  const grouped = data.reduce((acc: any, item: any) => {
    const { idUser } = item;
    if (!acc[idUser]) {
      acc[idUser] = [];
    }
    acc[idUser].push(item);
    return acc;
  }, {});
  return Object.entries(grouped).map(([idUser, items]) => ({
    idUser,
    items,
  }));
};

const calculateTotalPrice = (cartData: any[]) => {
  let total = 0;
  cartData.forEach((item) => {
    total += Number(item.price.replace("$", ""));
  });
  return total;
};

const CartScreens: React.FC<{ navigation: any }> = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(DataCart);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(DataCart));
  const [totalPriceTxt, setTotalPriceTxt] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [modalVisibleNewPost, setModalVisibleNewPost] = useState(false);

  const onGetCartAll = async () => {
    try {
      const res = await getCartAll();
      setCartData(res);
    } catch (error) {
      console.log("Lỗi onGetCartAll ở cart (tabs): ", error);
    }
  };

  console.log("cartData", cartData);

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
            setData((prev) => prev.filter((item) => item.id !== id));
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
        data.forEach((item) => {
          updatedItems[item.id] = updatedItems["all"];
        });
      } else {
        updatedItems["all"] = data.every((item) => updatedItems[item.id]);
      }

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = data.find((item) => item.id === itemId);
          totalPrice += selectedItem
            ? Number(selectedItem.price.replace("$", ""))
            : 0; // Lấy giá từ danh sách sản phẩm
        }
      });

      setTotalPrice(totalPrice);
      setTotalPriceTxt(totalPrice);

      return updatedItems;
    });
  };

  const formatNumber = (num: number): string => {
    if (num.toString().length > 5) {
      return num.toString().slice(0, 5) + "...";
    }
    return num.toString();
  };

  const increaseQuantity = (id: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[id] = true;

      let totalPrice2 = totalPrice;
      const selectedItem = data.find((item) => item.id === id);
      if (selectedItem) {
        const itemPrice = Number(selectedItem.price.replace("$", ""));
        totalPrice2 += itemPrice;
      }

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      setTotalPrice(totalPrice2);
      setTotalPriceTxt(totalPrice2);

      return updatedItems;
    });
  };

  const decreaseQuantity = (id: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      updatedItems[id] = false;

      let totalPrice2 = totalPrice;
      const selectedItem = data.find((item) => item.id === id);
      if (selectedItem) {
        const itemPrice = Number(selectedItem.price.replace("$", ""));
        totalPrice2 = Math.max(totalPrice2 - itemPrice, 0);
      }

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
      );

      setTotalPrice(totalPrice2);
      setTotalPriceTxt(totalPrice2);

      return updatedItems;
    });
  };

  const toggleGroupCheckbox = (idUser: string) => {
    setCheckedItems((prev) => {
      const updatedItems = { ...prev };
      const allChecked = !prev[idUser];

      data.forEach((item) => {
        if (item.idUser === idUser) {
          updatedItems[item.id] = allChecked;
        }
      });

      let totalPrice = 0;
      Object.keys(updatedItems).forEach((itemId) => {
        if (updatedItems[itemId]) {
          const selectedItem = data.find((item) => item.id === itemId);
          totalPrice += selectedItem ? Number(selectedItem.price) : 0;
        }
      });

      return updatedItems;
    });
  };

  const renderProduct = (product: any) => (
    <Swipeable
      key={product.id}
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => handleDelete(product.id, product.name)}
          style={styles.btnDelete}
        >
          <Image
            style={styles.imgDelete}
            source={require("./img/Delete_25px.png")}
          />
        </TouchableOpacity>
      )}
    >
      <View style={styles.frameProduct}>
        <Image style={styles.imgProduct} source={product.image} />
        <View>
          <View
            style={{
              width: "88%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.nameProduct}>{product.name}</Text>
            <CheckBox
              value={checkedItems[product.id] || false}
              onValueChange={() => toggleCheckbox(product.id)}
              style={{ width: 20, height: 20, marginTop: 10 }}
            />
          </View>
          <Text style={styles.nameGram}>{product.gram}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.frameAllTotal}>
              <TouchableOpacity
                style={styles.btnTru}
                // onPress={() => decreaseQuantity(product.id)}
              >
                <Text
                  style={{
                    color: "#6D3805",
                    fontSize: 18,
                    fontWeight: "400",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: "#6D3805",
                  fontSize: 18,
                  fontWeight: "400",
                  paddingLeft: 20,
                }}
              >
                {product.quantity}
              </Text>
              <TouchableOpacity
                style={[styles.btnTru, { marginLeft: 20 }]}
                // onPress={() => increaseQuantity(product.id)}
              >
                <Text
                  style={{
                    color: "#6D3805",
                    fontSize: 18,
                    fontWeight: "400",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtPrice}>
              ${" "}
              {formatNumber(
                Number(product.price.replace("$", "")) * product.quantity
              )}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  const renderGroup = ({ item }: { item: any }) => (
    <View key={item.idUser}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.frameCheckBoxAll}>
          <Text style={styles.userHeader}>{item.idUser}</Text>
          <CheckBox
            value={checkedItems[item.idUser] || false}
            onValueChange={() => {
              toggleGroupCheckbox(item.idUser);
              toggleCheckbox(item.idUser);
            }}
            style={styles.checkBoxAll}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.txtUpdatePdAll}>Sửa</Text>
        </TouchableOpacity>
      </View>
      {item.items.map(renderProduct)}
    </View>
  );

  useEffect(() => {
    onGetCartAll();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <View>
          <FlatList
            style={{ height: "70%" }}
            data={groupItemsByUser(data)}
            renderItem={renderGroup}
            keyExtractor={(item) => item.idUser.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={3000}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
          />
        </View>

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
              <Text style={styles.txtPrice}>$ {formatNumber(totalPrice)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.btnCheckout}
              onPress={() => navigation.navigate("PayScreen")}
            >
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
                Thanh toán: {formatNumber(totalPriceTxt)}
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
        <SendNewPostModal cloneModal={() => setModalVisibleNewPost(false)} />
      </Modal>
    </GestureHandlerRootView>
  );
};

export default CartScreens;
