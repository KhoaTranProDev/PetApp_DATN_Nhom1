import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const DetailAddress: React.FC<{ navigation: any, route: any }> = (props) => {
  const { navigation } = props;
  const { route } = props;
  const data = route?.params?.item;
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);

  const handleMapPress = (event: any) => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedLocation({ latitude, longitude });
      console.log('Selected location:', { latitude, longitude });
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
        <Text style={styles.txtThanhToan}>Sửa địa chỉ</Text>
        <TouchableOpacity>
          <Text style={styles.txtSave}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Contact */}
        <View style={styles.contact}>
          <Text style={styles.txtContact}>Liên hệ</Text>
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập tên của bạn"
            defaultValue={data.name}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập số điện thoại của bạn"
            defaultValue={data.phone}
          />
        </View>
        {/* Address */}
        <View style={[styles.contact, {marginTop: 20}]}>
          <Text style={styles.txtContact}>Địa chỉ</Text>
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập địa chỉ của bạn"
            defaultValue={data.address}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập quận/huyện của bạn"
            defaultValue={data.district}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập tỉnh/thành phố của bạn"
            defaultValue={data.city}
          />
        </View>
        {/* Map */}
        <View style={[styles.contact, {marginTop: 20}]}>
          <Text style={styles.txtContact}>Bản đồ</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 10.8524541,
              longitude: 106.6262336,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker coordinate={selectedLocation} />
            )}
          </MapView>
        </View>
        {/* Setting */}
        <View style={styles.frameSetting}>
          <Text style={styles.txtSetting}>Cài đặt</Text>
          {/* Type address */}
          <View style={styles.typeAddress}>
            <Text style={styles.txtTypeAddress}>Loại địa chỉ:</Text>
            <TextInput
              style={styles.inputTypeAddress}
              placeholder="Nhập loại địa chỉ của bạn"
              defaultValue={data.typeAddress}
            />
        </View>
        {/* Default address */}
        <View style={styles.defaultAddress}>
          <Text style={styles.txtDefaultAddress}>Đặt làm mặc định:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={data.status ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {}}
            value={data.status}
          />
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailAddress;

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
  txtSave: {
    fontSize: 14,
    color: "#6D3805",
    marginTop: 15,
  },
  body: {
    paddingBottom: 10
  },
  // Contact
  contact: {
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
  },
  txtContact: {
    fontSize: 14,
    color: "#6D3805",
    marginLeft: 5,
  },
  inputContact: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  // Setting
  frameSetting: {
    marginTop: 20,
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
  },
  txtSetting: {
    fontSize: 14,
    color: "#6D3805",
    marginLeft: 5,
  },
  // Type address
  typeAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  txtTypeAddress: {
    fontSize: 14,
    color: "#6D3805",
    marginLeft: 5,
  },
  inputTypeAddress: {
    width: 200,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
  },
  // Default address
  defaultAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  txtDefaultAddress: {
    fontSize: 14,
    color: "#6D3805",
    marginLeft: 5,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
