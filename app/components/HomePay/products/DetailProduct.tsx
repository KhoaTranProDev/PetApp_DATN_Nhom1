import {
    Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

// data
import { DataCart } from "../../Data";

// lib
import { Swipeable } from "react-native-gesture-handler";

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
  
const DetailProduct: React.FC<{ navigation: any }> = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(DataCart);

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
            source={require("../../image/Delete_25px.png")}
          />
        </TouchableOpacity>
      )}
    >
    <View style={styles.frameProduct}>
      <View style={styles.frameImg}>
        <Image style={styles.imgProduct} source={product.image} />
      </View>
      <View style={styles.frameInfo}>
        <Text style={styles.txtNameProduct}>{product.name}</Text>
        <Text style={styles.txtUser}>{product.idUser}</Text>
        <View style={styles.framePrice}>
          <Text style={styles.txtPrice}>{product.price}</Text>
          <Text style={styles.txtQuantity}>x{product.quantity}</Text>
        </View>
      </View>
    </View>
    </Swipeable>
  );

  const renderGroup = ({ item }: { item: any }) => (
    <View key={item.idUser}>
      <Text style={styles.userHeader}>{item.idUser}</Text>
      {item.items.map(renderProduct)}
    </View>
  );

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
        <TouchableOpacity>
          <Image
            style={styles.imgCall}
            source={require("../../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
      <FlatList
        style={{ height: "70%" }}
        data={groupItemsByUser(data)}
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
  frameInfo: {
    width: "70%",
    paddingLeft: 15,
  },
  txtNameProduct: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  txtShowMore: {
    fontSize: 14,
    color: "#6D3805",
  },
  txtUser: {
    fontSize: 14,
    color: "#000000",
  },
  framePrice: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  txtPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  txtQuantity: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 10,
  },
});
