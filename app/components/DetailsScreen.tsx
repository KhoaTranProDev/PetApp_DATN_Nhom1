import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { addCart, getCartIdUser } from "./services/cart";
import { getDetailUser } from "../(tabs)/services/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";

  const DetailScreen = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState<any>({});
    const [checkCU, setCheckCU] = useState<any>({});

    const route = useRoute();
    const navigation = useNavigation();
    const { pet, imageURL } = route.params;

    const paragraphStyles = {
      
    }

    const getUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const resIdUser = await getDetailUser(userId);
      setUser(resIdUser?.user);
      const resCU = await getCartIdUser(resIdUser?.user._id);
      const findCU = resCU.some((item: any) => item.idPet._id === pet._id);
      setCheckCU(findCU);
      // console.log(">>>>>>findCUfindCU ", findCU);
    }

    const handleAddCart = async () => {
      if (pet.idUser === user._id) {
        ToastAndroid.show("Đây là sản phẩm của bạn !", ToastAndroid.SHORT);
        return
      }

      if (checkCU) {
        ToastAndroid.show("Sản phẩm này đã thêm rồi !", ToastAndroid.SHORT);
        return
      }

      const res = await addCart({
        idUser: user._id,
        idPet: pet._id,
      });
      if (res) {
        ToastAndroid.show("Thêm vào giỏ hàng thành công !", ToastAndroid.SHORT);
        navigation.navigate("CartScreen");
      } else {
        ToastAndroid.show("Thêm vào giỏ hàng thất bại !", ToastAndroid.SHORT);
      }
    }

    useEffect(() => {
      getUser();
    } ,[]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal: 25}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("./image/back.png")}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 14,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flexDirection: 'row', 
            gap: 15,
            height: 45,
            width: 170,
            backgroundColor: "#fff",
            borderWidth: 1.5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            <Text style={{
              fontSize: 14,
              fontWeight: "600",
              marginLeft: 5,
            }}>Add to Favorites</Text>
            <Image 
            style={{tintColor:"red"}}
            source={require('./image/add-to-favorites.png')}/>
          </TouchableOpacity>
        </View>
        <ScrollView 
        horizontal={false}
        style={styles.scrollView}>
          <View style={styles.sectionItem}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              style={styles.scrollView3}
            >
              <View style={styles.container3}>
                <View style={[styles.boxx, styles.boxx1]}>
                  <Image
                    source={{uri: imageURL}}
                    style={styles.image1}
                  />
                </View>
                <View style={[styles.boxx, styles.boxx2]}>
                  <Text style={styles.textt3}>Box 2</Text>
                </View>
                <View style={[styles.boxx, styles.boxx3]}>
                  <Text style={styles.textt3}>Box 3</Text>
                </View>
                <View style={[styles.boxx, styles.boxx4]}>
                  <Text style={styles.textt3}>Box 4</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.containerTitle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.textTitle}>{pet.name}</Text>
              <Text
                style={{
                  fontSize: 22,
                  lineHeight: 42,
                  fontWeight: "700",
                  color: "green",
                }}
              >
                {pet.price} VND
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: 10,
                fontWeight: "700",
                color: "#CC5500",
              }}
            >
              Species:{" "}
              <Text style={{ fontWeight: "500", color: "#000" }}>
                {pet.alike}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: 10,
                fontWeight: "700",
                color: "#CC5500",
              }}
            >
              Age:{" "}
              <Text style={{ fontWeight: "500", color: "#000" }}>
                {pet.yearold}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: 10,
                fontWeight: "700",
                color: "#CC5500",
                marginBottom: 20,
              }}
            >
              Weight:{" "}
              <Text style={{ fontWeight: "500", color: "#000" }}>
                {pet.weight} kg
              </Text>
            </Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.textTitle1}>About {pet.name}</Text>
            <Text
            numberOfLines={isExpanded ? 10 : 3} 
            style={{
              fontSize: 16,
              fontStyle: 'italic',
              marginHorizontal: 10,
              }}>{pet.describe}</Text>
            <TouchableOpacity
            onPress={()=>setIsExpanded(!isExpanded)}>
              <Text style={{marginHorizontal: 10,fontSize: 16,color: "#000", fontWeight: "700"}}>{isExpanded ? "Read less" : "Read more"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine}></View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddCart}>
            <Text style={styles.addTitle}>Add to Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: "#fff",
  },
  sectionItem: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollView3: {
    flex: 1,
  },
  container3: {
    flexDirection: "row",
  },
  boxx: {
    width: Dimensions.get("window").width, // Chiều rộng bằng chiều rộng màn hình
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    width: 380,
    height: 200,
    borderRadius: 20,
    marginEnd: 15,
    resizeMode: 'contain'
  },
  boxx1: {},
  boxx2: {
    backgroundColor: "blue",
  },
  boxx3: {
    backgroundColor: "green",
  },
  boxx4: {
    backgroundColor: "yellow",
  },
  textt3: {
    color: "white",
    fontSize: 24,
  },
  containerTitle: {
    maxWidth: Dimensions.get("screen").width - 40,
    marginTop: 10,
    marginHorizontal: 15,
    width: "100%",
    height: 400,
  },
  textTitle: {
    marginHorizontal: 10,
    color: "black",
    fontSize: 30,
    fontWeight: "800",
  },
  textTitle1: {
    color: "black",
    fontSize: 22,
    marginHorizontal: 10,
    marginTop: 10,
    fontWeight: "600",
    marginBottom: 10,
  },
  addToCartButton:{
    width: Dimensions.get("screen").width - 40,
    height: 60,
    backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  addTitle:{
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  horizontalLine:{
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginHorizontal: 15,
  }
});

export default DetailScreen;
