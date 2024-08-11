import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  getListPayIdUser,
  updateAddress,
  updateAddressDefaultA,
} from "../../services/address";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Props {
  navigation: any;
  route: any;
}

const UpdateAddress: React.FC<Props> = ({ navigation, route }) => {
  const { item, user } = route?.params;
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [switchS, setSwitchS] = useState(false);
  const [addAressData, setAddressData] = useState<any>([]);
  const [name, setName] = useState(item.name);
  const [phone, setPhone] = useState(item.phone);
  const [address, setAddress] = useState(item?.address[0]?.name);
  const [district, setDistrict] = useState(item?.address[1]?.name);
  const [city, setCity] = useState(item?.address[2]?.name);
  const [typeAddress, setTypeAddress] = useState(item.typeAddress);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    // console.log("Selected location:", { latitude, longitude });
  };

  const changleSwitch = async () => {
    if (item.defaultA) {
      item.defaultA = false;
      setSwitchS(!switchS);
      await updateAddressDefaultA(user._id, item._id);
    } else if (item.defaultA === false) {
      item.defaultA = true;
      setSwitchS(!switchS);
      await updateAddressDefaultA(user._id, item._id);
    } else {
      if (switchS === false) {
        const check = addAressData.find((item: any) => item.defaultA === true);
        if (check) {
          ToastAndroid.show("Đã có địa chỉ mặc định", ToastAndroid.SHORT);
          return;
        }
      }
      setSwitchS((prev) => !prev);
    }
    setSwitchS(!switchS);
  };

  const onGetListPayIdUser = async () => {
    const res = await getListPayIdUser(user._id);
    setAddressData(res);
  };
  useEffect(() => {
    onGetListPayIdUser();
  }, [switchS]);

  const handleUpdateAddress = async () => {
    const data = {
      name,
      phone,
      address: [{ name: address }, { name: district }, { name: city }],
      typeAddress,
    };
    await updateAddress(user._id, item._id, data);
    navigation.goBack();
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
        <TouchableOpacity onPress={handleUpdateAddress}>
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
            defaultValue={item.name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập số điện thoại của bạn"
            defaultValue={item.phone}
            onChange={(e) => setPhone(e.nativeEvent.text)}
          />
        </View>
        {/* Address */}
        <View style={[styles.contact, { marginTop: 20 }]}>
          <Text style={styles.txtContact}>Địa chỉ</Text>
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập địa chỉ của bạn"
            defaultValue={item?.address[0]?.name}
            onChange={(e) => setAddress(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập quận/huyện của bạn"
            defaultValue={item?.address[1]?.name}
            onChange={(e) => setDistrict(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập tỉnh/thành phố của bạn"
            defaultValue={item?.address[2]?.name}
            onChange={(e) => setCity(e.nativeEvent.text)}
          />
        </View>
        {/* Map */}
        <View style={[styles.contact, { marginTop: 20 }]}>
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
            {selectedLocation && <Marker coordinate={selectedLocation} />}
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
              defaultValue={item.typeAddress}
              onChange={(e) => setTypeAddress(e.nativeEvent.text)}
            />
          </View>
          {/* Default address */}
          <View style={styles.defaultAddress}>
            <Text style={styles.txtDefaultAddress}>Đặt làm mặc định:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={item.status ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={changleSwitch}
              value={item.defaultA}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateAddress;

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
    paddingBottom: 10,
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
