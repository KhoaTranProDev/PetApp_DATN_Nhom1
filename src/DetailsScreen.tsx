import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionItem}>
            <ScrollView horizontal={true} pagingEnabled={true} style={styles.scrollView3}>
              <View style={styles.container3}>
                <View style={[styles.boxx, styles.boxx1]}>
                <Image source={require('./img/Eminem.jpg')}
                style={styles.image1}/>
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
            <Text style={styles.textTitle}>Slim Shady</Text>
            <Text style={styles.textTitle1}>About this</Text>
            <Text style={styles.textDetails}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.textDetailsCountry}> Stadtmitel, Essen (5km)</Text>
          </View>
          <View style={styles.containerSellerInfo}>
          <View style={styles.containerSellerLeft}>
            <Image source={require('./img/Eminem.jpg')} style={styles.containerSellerInfoImg}></Image>
            </View>
            <View style={styles.containerSellerRight}>
            <Text style={styles.textTitle2}>PetShop</Text>
            <Text style={styles.textTitle3}>Nơi mua và bán các thú cưng</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: 'black',
  },
  sectionItem: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollView3: {
    flex: 1,
  },
  container3: {
    flexDirection: 'row',
  },
  boxx: {
    width: Dimensions.get('window').width, // Chiều rộng bằng chiều rộng màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1:{
    width: 380,
    height: 200,
    borderRadius: 20,
    marginEnd: 15,
  },
  boxx1:{

  },
  boxx2: {
    backgroundColor: 'blue',
  },
  boxx3: {
    backgroundColor: 'green',
  },
  boxx4: {
    backgroundColor: 'yellow',
  },
  textt3: {
    color: 'white',
    fontSize: 24,
  },
  containerTitle:{
    marginTop: 10,
    width: "100%",
    height: 300,
  },
  textTitle:{
    padding: 10,
    color: "white",
    fontSize: 29,
  },
  textTitle1:{
    color: "white",
    fontSize: 20,
    padding: 10,
  },
  textDetails:{
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  textDetailsCountry:{
    color: "white",
    fontSize: 18,
    padding: 8,
  },
  containerSellerInfo:{
    width: "100%",
    height: 100,
    backgroundColor: "#F1F8E8",
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  
  containerSellerLeft:{
    width: '25%'
  },
  containerSellerInfoImg:{
    width: 54,
    height: 54,
    borderRadius: 40,
    marginTop: 20,
    marginStart: 20,
    marginBottom: 20,
  },
  containerSellerRight:{
    display: 'flex',
    flexDirection: 'column',
    width: '70%'
  },
  textTitle2:{
    fontSize: 18,
    marginTop: 10,
    fontStyle: 'italic',
  },
  textTitle3:{
    fontSize: 15,

  }
});

export default App;
