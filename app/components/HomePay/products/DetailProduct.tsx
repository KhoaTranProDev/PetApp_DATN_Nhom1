import {
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

// lib
import { Swipeable } from "react-native-gesture-handler";
import { deleteIdCart } from "../../services/cart";
import CheckBox from "expo-checkbox";

interface Props {
  route: any;
  navigation: any;
}

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

const DetailProduct: React.FC<Props> = ({ navigation, route }) => {
  const { listPickPet, user } = route?.params;

  const handleDelete = () => {
    ToastAndroid.show("Vui lòng quay lại giỏ hàng để hủy", ToastAndroid.SHORT);
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const renderProduct = (product: any) => (
    <Swipeable
      key={product._id}
      renderRightActions={() => (
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.btnDelete}
        >
          <Image
            style={styles.imgDelete}
            source={require("../../image/Delete_25px.png")}
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
            </View>
            <Text style={styles.nameGram}>
              Tuổi: {product?.idPet?.yearold} | Nặng: {product?.idPet?.weight}
            </Text>
            <View
              style={{
                width: "85%",
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
      <View key={item.items[0].idPet.idUser._id}>
        <Text style={styles.userHeader}>
          {item?.items[0].idPet?.idUser?.name}
        </Text>
        {item.items.map((product: any) => renderProduct(product))}
      </View>
    );
  };

  return (
    <View style={styles.ContainerMain}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imgSize28Header}
            source={require("../../image/back_to_50px.png")}
          />
        </TouchableOpacity>
        <Text style={styles.txtThanhToan}>Chi tiết đơn hàng</Text>
        <TouchableOpacity onPress={() => Linking.openURL("tel:0900332211")}>
          <Image
            style={styles.imgCall}
            source={require("../../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
      <FlatList
        style={{ height: "70%" }}
        data={groupItemsByUser(listPickPet)}
        renderItem={renderGroup}
        keyExtractor={(item) => item.idUser}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={3000}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  ContainerMain: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DFDFDF",
  },
  userHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  imgSize28Header: {
    marginTop: 15,
    width: 28,
    height: 28,
  },
  txtThanhToan: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6D3805",
    marginTop: 15,
  },
  imgCall: {
    marginTop: 15,
    width: 28,
    height: 28,
    transform: [{ rotate: "180deg" }],
  },
  // Frame Product
  btnDelete: {
    width: 71,
    height: 114,
    backgroundColor: "#A42B32",
    justifyContent: "center",
    alignItems: "center",
  },
  imgDelete: {
    position: "relative",
    width: 30,
    height: 30,
  },
  frameProduct: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 10,
    marginBottom: 15,
  },
  frameImg: {},
  imgProduct: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  nameProduct: {
    color: "#6D3805",
    fontSize: 18,
    fontWeight: "700",
    paddingLeft: 20,
  },
  nameGram: {
    color: "#6D3805",
    fontSize: 14,
    paddingLeft: 20,
  },
  txtAlike: {
    color: "#6D3805",
    fontSize: 14,
    paddingLeft: 20,
    textAlign: "left",
  },
  txtPrice: {
    color: "#B2030C",
    fontSize: 16,
    fontWeight: "400",
    paddingTop: 5,
    textAlign: "right",
  },
});
