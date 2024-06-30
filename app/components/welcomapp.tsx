import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from  '@expo/vector-icons/Entypo'


SplashScreen.preventAutoHideAsync();
const WelcomApp = () => {
    const navigation = useNavigation();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
      async function prepare() {
        try {
        
          await Font.loadAsync(Entypo.font);
          
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (e) {
          console.warn(e);
        } finally {
          
          setAppIsReady(true);
        }
      }
  
      prepare();
    }, []);
  
    const onLayoutRootView = useCallback(async () => {
      if (appIsReady) {
       
        await SplashScreen.hideAsync();
      }
    }, [appIsReady]);
  
    if (!appIsReady) {
      return null;
    }
  return (
    <View style={styles.container}>
      <Image style={{width:"100%",height:"100%"}} source={require("../(tabs)/img/avt.jpg")}/>
    </View>
  )
}

export default WelcomApp

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})