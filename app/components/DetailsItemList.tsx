import React, { useEffect, useState } from 'react';
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
  TextInput
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';

// Định nghĩa kiểu cho dữ liệu
interface Pet {
  _id: string;
  name: string;
  idspecies: string;
  alike: string;
  yearold: number;
  price: number;
  weight: string;
  describe: string;
}

interface ImageData {
  _id: string;
  idpet: string;
  img: string;
}

function DetailsItemList(): React.JSX.Element {
  const navigation = useNavigation();
  const [pets, setPets] = useState<Pet[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const handleTrendingPress = () => {

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsResponse = await axios.get<Pet[]>('https://apipetapp.onrender.com/pet');
        const imagesResponse = await axios.get<ImageData[]>('https://apipetapp.onrender.com/image');

        setPets(petsResponse.data);
        setImages(imagesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dogImgData = images.filter(img => img.idpet === "667062a9c593ca6c8b204c30");
  const dogImgURL = dogImgData.map(item => item.img);

  const renderPetItem = ({ item }: { item: Pet }) => {
    // const petImage = images.find(image => image._id === item.idimage);

    return (
      <View style={styles.item}>
        
        {item.idspecies == "667062a9c593ca6c8b204c30" && (
          <Image
            source={{ uri: String(dogImgURL)}}
            style={styles.petImage}
          />
        )}
        <TouchableOpacity style={{
          position: 'absolute',
        }}>
          <Image 
          style={{
            position: 'absolute',
            left: 125,
            top: 10,
            tintColor: "white",
          }}
          source={require('./image/favorite.png')}/>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', }}>
          <Text style={styles.petText}>Pet name:{'\n'}
            <Text style={{
              fontWeight: "400",
              fontSize: 20,
            }}>- {item.name}</Text>
            </Text>
          <Text style={styles.petText}>Species:{'\n'}
            <Text style={{
              fontWeight: "400",
              fontSize: 20
            }}>- {item.describe}</Text>
            </Text>
          <Text style={styles.petText}>Price: {item.price} VND</Text>
        </View>
      </View>
    );
  };

  const dogData = pets.filter(pet => pet.alike === 'Chó');

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBaner}>
          <TouchableOpacity 
          onPress={()=>navigation.goBack()}
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
            <Image 
            style={{width: 20, height: 20}}
            source={require('./image/back.png')}/>
            <Text style={{
              marginLeft: 5,
              fontSize: 14,
            }}>Back</Text>
          </TouchableOpacity>
          <TextInput 
          style={styles.searchInput}
          placeholder='Search product'
          inlineImageLeft='user'/>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 25,
          marginTop: 20,
        }}>
          <Text style={{
              fontWeight: "800",
              fontSize: 30,
              color: "#000",
            }}>Current Dog List</Text>
            <TouchableOpacity>
              <AntDesign name='filter' size={25}/>
            </TouchableOpacity>
        </View>
          <Text style={{
            marginLeft: 25,
            marginBottom: 20,
            fontSize: 16,
            fontWeight: "400"
          }}>10 products found</Text>
        
        <View style={styles.containerBanner}>
         <View style={styles.bannerItem}>
        <View
        style={styles.petsContainer}
      >
          <FlatList
            data={dogData}
            renderItem={renderPetItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.scrollViewContent1}
          />
          </View>
          </View>
          </View>
          
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    width: '100%',
    height: '100%',
  },
  headerBaner:{
    display: "flex",
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  imageBanner:{
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  containerOption:{
    width: 'auto',
    height: 'auto',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  buttonTrending:{
    width: 117,
    borderWidth: 1,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#379777',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  textTrending:{
    fontSize: 20,
    color: 'black'
  },
  button5MinutesRead:{
    width: 180,
    borderWidth: 1,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  textTrending1:{
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',

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
    fontWeight: 'bold',
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  item: {
    width: Dimensions.get('screen').width - 40,
    height: 'auto',
    marginBottom: 15,
    flexDirection: "row",
    gap: 20,
  },
  containerBanner:{
    width: '100%',
    height: 'auto',
  },
  petsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  petImage: {
    width: 168,
    height: 208,
    marginBottom: 8,
    borderRadius: 10,
  },
 
  bannerItem:{

  },
  petText:{
    fontSize: 20,
    color: '#000',
    fontWeight: "700",
  },
  scrollViewContent1:{
    paddingHorizontal: 20,
  },
  searchInput: {
    width: "70%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#000"
  },
});

export default DetailsItemList;