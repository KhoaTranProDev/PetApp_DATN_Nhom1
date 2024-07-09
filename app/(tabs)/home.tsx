import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeImage from '../components/ChangeScreen';
import DetailsItemList from '../components/DetailsItemList';
import AxiosHelper from '../util/AxiosHelper';


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

const Stack = createStackNavigator();

const Home = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [imgURL, setImgURL] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  const route = useRoute();

  const handleTrendingPress = () => {

  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsResponse = await axios.get<Pet[]>('https://apipetapp.onrender.com/pet');
        const imagesResponse = await axios.get<ImageData[]>('https://apipetapp.onrender.com/image');

        setPets(petsResponse.data);
        setImgURL(imagesResponse.data);
        setLoading(false);


        //Testing vòng lặp lọc hình ảnh Pets
        // for(const item of imagesResponse.data){
        //   if(item.idpet === '667062a9c593ca6c8b204c30'){
        //     setImgURL(item.img);
        //     break;
        //   } else if(item.idpet === '667060b3c935ca0db204c35'){
        //     setImgURL(item.img);
        //     break;
        //   }
        // }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  function handleShowAllDogPress() {
    navigation.navigate('DetailsItemList');
  }

  function handleShowListCat() {
    navigation.navigate("DetailCatList");
  }

  const dogImgData = imgURL.filter(img => img.idpet === "667062a9c593ca6c8b204c30");
  const dogImgURL = dogImgData.map(item => item.img);
  const catImgData = imgURL.filter(img => img.idpet === "66706603c593ca6c8b204c35");
  const catImgURL = catImgData.map(item => item.img);

  const renderPetItem = ({ item }: { item: Pet }) => {
    //const petImage = images.find(image => image._id === item.idspecies);
    //const petImage = images.filter(image => image.idpet === "667062a9c593ca6c8b204c30");

    return (
      <View style={styles.item}>
        
        {item.idspecies === "667062a9c593ca6c8b204c30" ? (
          <Image
            source={{ uri: String(dogImgURL)}}
            style={styles.petImage}
          />
        ) : (
          <Image
            source={{ uri: String(catImgURL)}}
            style={styles.petImage}
          />
        )
        }
        <Text style={styles.petText}>Pet name: {item.name}</Text>
        <Text style={styles.petText}>Pet species: {item.alike}</Text>
        <Text style={styles.petText}>Age: {item.yearold}</Text>

      </View>
    );
  };

  const dogData = pets.filter(pet => pet.idspecies === '667062a9c593ca6c8b204c30');
  const meoData = pets.filter(pet => pet.idspecies === '66706603c593ca6c8b204c35');
  const chimData = pets.filter(pet => pet.idspecies === '66706625c593ca6c8b204c36');
  
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBaner}>
          <Text style={styles.text}>Welcome back!</Text>
          <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}>
            <Image
            source={{uri:"https://i.pinimg.com/736x/56/3f/0b/563f0b714e90f9195c1d63b09f5fb8e1.jpg"}}
            style={styles.imageBanner}/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.containerOption}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
          <TouchableOpacity style={styles.buttonTrending} onPress={handleTrendingPress}>
            <Text style={styles.textTrending}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5MinutesRead}>
            <Text style={styles.textTrending1}>5-Minutes Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button5MinutesRead}>
            <Text style={styles.textTrending1}>Quick show</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
        <ChangeImage />
        
        <View style={styles.containerBanner}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Dog</Text>
          <TouchableOpacity
          onPress={() => handleShowAllDogPress()}>
            <Text style={styles.showAllText}>Show all ➤</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => handleShowAllPress('dog')}>
          <Text>Show all dogs</Text>
        </TouchableOpacity> */}
        </View>
         <View style={styles.bannerItem}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent1}
      >
          <FlatList
            data={dogData}
            renderItem={renderPetItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.petsContainer}
          />
          </ScrollView>
          </View>
          </View>
          <View style={styles.containerBanner}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Cat</Text>
          <TouchableOpacity
          onPress={() => handleShowListCat()}>
            <Text style={styles.showAllText}>Show all ➤</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.bannerItem}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent1}
      >
          <FlatList
            data={meoData}
            renderItem={renderPetItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.petsContainer}
          />
          </ScrollView>
          </View>
          </View>
          <View style={styles.containerBanner}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Bird</Text>
          <TouchableOpacity>
            <Text style={styles.showAllText}>Show all ➤</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.bannerItem}>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent1}
      >
          <FlatList
            data={chimData}
            renderItem={renderPetItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.petsContainer}
          />
          </ScrollView>
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
    
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
    justifyContent: "space-between",
    padding: 10,
    marginTop: 50
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
    fontWeight: "800",
    color: "#000"
  },
  scrollView: {
    flex: 1,
  },
  item: {
    width: 210,
    height: 'auto'
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
    color: '#000'
  },
  scrollViewContent1:{
    paddingHorizontal: 20,
  },
  showAllText:{
    fontSize: 16,
    fontWeight: "400",
    marginTop: 15,
    marginRight: 15,
  }
});

export default Home;