import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import Geocoder from 'react-native-geocoding'
import { REACT_APP_GOOGLE_MAP_API_KEY } from '@env'

Geocoder.init(REACT_APP_GOOGLE_MAP_API_KEY);

interface Coordinates {
    latitude: number;
    longitude: number;
}

const AddAddress: React.FC<{ navigation: any }> = (props) => {
    const { navigation } = props;
    const [switchS, setSwitchS] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');

    const handleMapPress = async (event: any) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });

        try {
            const json = await Geocoder.from(latitude, longitude);
            const addressComponent = json.results[0].address_components;
            const formattedAddress = json.results[0].formatted_address;
            console.log('Selected location:', { latitude, longitude, formattedAddress });

            setAddress(formattedAddress);

            const districtComponent = addressComponent.find((component: any) => component.types.includes("administrative_area_level_2"));
            const cityComponent = addressComponent.find((component: any) => component.types.includes("administrative_area_level_1"));
            
            setDistrict(districtComponent ? districtComponent.long_name : '');
            setCity(cityComponent ? cityComponent.long_name : '');
        } catch (error) {
            console.warn(error);
        }
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
          <Text style={styles.txtThanhToan}>Thêm địa chỉ mới</Text>
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
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập số điện thoại của bạn"
          />
        </View>
        {/* Address */}
        <View style={[styles.contact, {marginTop: 20}]}>
          <Text style={styles.txtContact}>Địa chỉ</Text>
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập địa chỉ của bạn"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập quận/huyện của bạn"
            value={district}
            onChangeText={setDistrict}
          />
          <TextInput
            style={styles.inputContact}
            placeholder="Nhập tỉnh/thành phố của bạn"
            value={city}
            onChangeText={setCity}
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
            />
          </View>
          {/* Default address */}
          <View style={styles.defaultAddress}>
            <Text style={styles.txtDefaultAddress}>Đặt làm mặc định:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={switchS ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setSwitchS}
              value={switchS}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AddAddress

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
})
