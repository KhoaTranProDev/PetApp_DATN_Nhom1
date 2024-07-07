import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

// data
import { DataAddress } from "../../Data";

const AddDress: React.FC<{ navigation: any }> = (props) => {
  const { navigation } = props;

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
        <Text style={styles.txtThanhToan}>Chọn địa chỉ giao hàng</Text>
        <TouchableOpacity>
          <Image
            style={styles.imgCall}
            source={require("../../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.body}>
        <View style={styles.bg_txtAddDress}>
          <Text style={styles.txtAddDress}>Danh sách địa chỉ của bạn:</Text>
        </View>
        {/* List address */}
        <FlatList
          data={DataAddress}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
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
                      navigation.navigate("DetailAddress", { item })
                    }
                  >
                    <Text style={styles.txtFront14}>Sửa</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.txtFront14}>{item.address}</Text>
                <Text style={styles.txtFront14}>{item.typeAddress}</Text>
                {item.status ? (
                  <Text style={styles.txtMD}>Mặc định</Text>
                ) : null}
              </View>
            </View>
          )}
        />
      </View>
      {/* footer */}
      <View style={styles.footer}>
        {/* add address */}
        <TouchableOpacity
          style={styles.addAddress}
          onPress={() => navigation.navigate("AddAddress")}
        >
          <Text style={styles.txtAddAddress}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    borderRadius: 10,
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
