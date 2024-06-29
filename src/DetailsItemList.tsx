import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import axios from 'axios';

// Định nghĩa kiểu cho dữ liệu
interface Pet {
  _id: string;
  name: string;
  idspecies: string;
  alike: string;
  yearold: number;
  price: number;
  weight: string;
  idimage: string;
  describe: string;
}

interface ImageData {
  _id: string;
  img: string;
}

function App(): React.JSX.Element {
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

  const renderPetItem = ({ item }: { item: Pet }) => {
    const petImage = images.find(image => image._id === item.idimage);

    return (
      <View style={styles.item}>
        
        {petImage && (
          <Image
            source={{ uri: petImage.img }}
            style={styles.petImage}
          />
        )}
        <Text style={styles.petText}>Tên loài: {item.name}</Text>
        <Text style={styles.petText}>Loại: {item.idspecies}</Text>
        <Text style={styles.petText}>Tuổi: {item.yearold}</Text>

      </View>
    );
  };

  const dogData = pets.filter(pet => pet.alike === 'chó');

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerBaner}>
        <Text style={styles.text}>Ohayo gozaimasu</Text>
        <Image
        source={require('./img/Eminem.jpg')}
        style={styles.imageBanner}/>
        </View>
        
        <View style={styles.containerBanner}>
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
          
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
    width: '100%',
    height: '100%',
  },
  headerBaner:{
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
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
    color: "white"
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
    color: 'white'
  },
  scrollViewContent1:{
    paddingHorizontal: 20,
  }
});

export default App;
