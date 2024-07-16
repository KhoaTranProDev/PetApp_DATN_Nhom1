import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

// Định nghĩa kiểu cho dữ liệu
interface Pet {
  _id: string;
  name: string;
  idspecies: string;
  alike: string;
  yearold: number;
  price: number;
  weight: number;
  describe: string;
  image: string[];
  status: string;
}

function DetailCatList(): React.JSX.Element {
  const navigation = useNavigation();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setsearchQuery] = useState("");
  const [fullData, setfullData] = useState<Pet[]>([]);
  const [modalVisible, setmodalVisible] = useState(false);

  const handleSearch = (text: string) => {
    if (text == "") {
      setfullData(pets);
    } else {
      let tempList = pets.filter((item) => {
        return item.alike.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setfullData(tempList);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsResponse = await axios.get<Pet[]>(
          "https://apipetapp.onrender.com/pet"
        );

        setPets(petsResponse.data);
        setLoading(false);
        setfullData(petsResponse.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderPetItem = ({ item }: { item: Pet }) => {
    // const petImage = images.find(image => image._id === item.idimage);

    return (
      <TouchableOpacity 
      onPress={() => navigation.navigate('DetailsScreen',{pet: item, imageURL: item.image[0]})}
      style={styles.item}>
        {item.image.map((imageURL, index) => (
          <Image
            key={index}
            source={{ uri: imageURL }}
            style={styles.petImage}
          />
        ))}
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.petText}>
            Pet name:{"\n"}
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
              }}
            >
              - {item.name}
            </Text>
          </Text>
          <Text style={styles.petText}>
            Species:{"\n"}
            <Text
              style={{
                fontWeight: "400",
                fontSize: 20,
              }}
            >
              - {item.alike}
            </Text>
          </Text>
          <Text style={styles.petText}>
            <Text
              style={{
                color: "blue",
              }}
            >
              Age:{" "}
            </Text>
            {item.yearold} yearold
          </Text>
          <Text style={styles.petText}>
            <Text
              style={{
                color: "green",
              }}
            >
              Price:{" "}
            </Text>
            {item.price} VND
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const catData = fullData.filter(
    (pet) => pet.idspecies === "66706603c593ca6c8b204c35"
  );

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBaner}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              marginTop: 15,
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
          <TextInput
            style={styles.searchInput}
            placeholder="Search a Pet"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            value={searchQuery}
            onChangeText={(text) => {
              handleSearch(text);
              setsearchQuery(text);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 25,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 30,
              color: "#000",
            }}
          >
            Current Cat List
          </Text>
          <TouchableOpacity onPress={() => setmodalVisible(true)}>
            <AntDesign name="filter" size={25} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginLeft: 25,
            marginBottom: 20,
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          {catData.length} products found
        </Text>

        <View style={styles.containerBanner}>
          <View style={styles.bannerItem}>
            <View style={styles.petsContainer}>
              <FlatList
                data={catData}
                renderItem={renderPetItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.scrollViewContent1}
              />
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setmodalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                height: 150,
                borderRadius: 10,
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: "space-evenly",
                  paddingTop: 10,
                  gap: 60,
                  flexDirection: "row",
                }}
                onPress={() => {
                  let tempList = fullData.sort((a, b) =>
                    a.name > b.name ? 1 : -1
                  );
                  setfullData(tempList);
                  setmodalVisible(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#000" }}>
                  Sort by Pet Name
                </Text>
                <Image source={require("./image/sort-name.png")} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: "space-evenly",
                  paddingTop: 10,
                  flexDirection: "row",
                }}
                onPress={() => {
                  setfullData(fullData.sort((a, b) => a.price - b.price));
                  setmodalVisible(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#000" }}>
                  Sort by Low to High Price
                </Text>
                <Image source={require("./image/sort-up.png")} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: "space-evenly",
                  paddingTop: 10,
                  flexDirection: "row",
                }}
                onPress={() => {
                  setfullData(fullData.sort((a, b) => b.price - a.price));
                  setmodalVisible(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#000" }}>
                  Sort by High to Low Price
                </Text>
                <Image source={require("./image/sort-down.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  headerBaner: {
    display: "flex",
    flexDirection: "row",
    marginTop: 70,
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  imageBanner: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  containerOption: {
    width: "auto",
    height: "auto",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  buttonTrending: {
    width: 117,
    borderWidth: 1,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#379777",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  textTrending: {
    fontSize: 20,
    color: "black",
  },
  button5MinutesRead: {
    width: 180,
    borderWidth: 1,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  textTrending1: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  containerHeader: {
    marginTop: 10,
    width: "auto",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    margin: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  item: {
    width: Dimensions.get("screen").width - 40,
    height: "auto",
    marginBottom: 15,
    flexDirection: "row",
    gap: 20,
  },
  containerBanner: {
    width: "100%",
    height: "auto",
  },
  petsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  petImage: {
    width: 168,
    height: 208,
    marginBottom: 8,
    borderRadius: 10,
  },

  bannerItem: {},
  petText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
  },
  scrollViewContent1: {
    paddingHorizontal: 20,
  },
  searchInput: {
    width: "70%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#000",
  },
});

export default DetailCatList;
