import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

// data
import { deleteAddress, getListPayIdUser } from "../../services/pay";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

interface Props {
  route: any;
  navigation: any;
}

const AddDress: React.FC<Props> = ({ route, navigation }) => {
  const { user } = route?.params;
  const [addAddress, setAddAddress] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onGetListPayIdUser = async () => {
    setRefreshing(true);
    const res = await getListPayIdUser(user._id);
    res.sort((a: any, b: any) => (a.defaultA === b.defaultA ? 0 : a.defaultA ? -1 : 1));
    setAddAddress(res);
    setRefreshing(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onGetListPayIdUser();
    setRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      `Cẩn thận !!!`,
      "Bạn có chắc muốn xóa địa chỉ này không ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteAddress(user._id, id);
              await onGetListPayIdUser();
            } catch (error) {
              console.log("Lỗi handleDelete ở cart (tabs): ", error);
            }
          }
        },
      ]
    );
  };

  useEffect(() => {
    onGetListPayIdUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onGetListPayIdUser();
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.ContainerMain}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imgSize28Header}
            source={require("../../image/back_to_50px.png")}
          />
        </TouchableOpacity>
        <Text style={styles.txtThanhToan}>Chọn địa chỉ giao hàng</Text>
        <TouchableOpacity onPress={() => Linking.openURL("tel:0900332211")}>
          <Image
            style={styles.imgCall}
            source={require("../../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.body}>
        <View style={styles.bg_txtAddDress}>
          <Text style={styles.txtAddDress}>Danh sách địa chỉ của bạn</Text>
        </View>
        {/* List address */}
        <FlatList
          data={addAddress}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Swipeable
            key={item._id}
            renderRightActions={() => (
              <TouchableOpacity
                onPress={() => handleDelete(item?._id)}
                style={styles.btnDelete}
              >
                <Image
                  style={styles.imgDelete}
                  source={require("../../image/Delete_25px.png")}
                />
              </TouchableOpacity>
            )}
          >
            <View style={styles.frameAddress}>
              <View style={styles.frameInfoAddress}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.txtNameAddress}>{item.name} </Text>
                    <Text style={styles.txtFront14}>| {item.phone}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("UpdateAddress", { item, user })
                    }
                  >
                    <Text style={styles.txtFront14}>Sửa</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtFront14}>{item?.address[0].name}</Text>
                <Text style={styles.txtFront14}>{item.typeAddress}</Text>
                {item.defaultA ? (
                  <Text style={styles.txtMD}>Mặc định</Text>
                ) : null}
              </View>
            </View>
            </Swipeable>
          )}
        />
      </View>
      {/* footer */}
      <View style={styles.footer}>
        {/* add address */}
        <TouchableOpacity
          style={styles.addAddress}
          onPress={() => navigation.navigate("AddAddress", {user})}
        >
          <Text style={styles.txtAddAddress}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
    </View>
    </GestureHandlerRootView>
  );
};

export default AddDress;

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
    marginBottom: 10,
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
  body: {
    width: "100%",
    height: "80%",
  },
  bg_txtAddDress: {
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  txtAddDress: {
    fontSize: 14,
  },
  // Address
  frameAddress: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 16,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 15,
  },
  frameInfoAddress: {
    width: "100%",
  },
  txtNameAddress: {
    fontSize: 16,
    fontWeight: "700",
  },
  txtFront14: {
    fontSize: 14,
  },
  txtMD: {
    width: 80,
    fontSize: 14,
    color: "#FF0000",
    borderWidth: 1,
    borderColor: "#FF0000",
    padding: 5,
    paddingLeft: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  // delete
  btnDelete: {
    width: 71,
    height: 83,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#A42B32",
    justifyContent: "center",
    alignItems: "center",
  },
  imgDelete: {
    position: "relative",
    width: 30,
    height: 30,
  },
  // footer
  footer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderColor: "#DFDFDF",
  },
  addAddress: {
    width: "100%",
    height: 40,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtAddAddress: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
