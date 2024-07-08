import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

interface CarouselItem {
  id: string;
  image: any;
}

const ChangeImage: React.FC = () => {
  const flatlistRef = useRef<FlatList<CarouselItem>>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData: CarouselItem[] = [
    {
      id: "01",
      image: require("./image/dog1.jpg"),
    },
    {
      id: "02",
      image: require("./image/cat1.jpg"),
    },
    {
      id: "03",
      image: require("./image/dog2.jpg"),
    },
    {
      id: "04",
      image: require("./image/cat2.jpeg"),
    },
    {
      id: "05",
      image: require("./image/dog4.jpg"),
    },
    {
      id: "06",
      image: require("./image/cat3.jpg"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatlistRef.current) {
        if (activeIndex === carouselData.length - 1) {
          flatlistRef.current.scrollToIndex({
            index: 0,
            animated: true,
          });
        } else {
          flatlistRef.current.scrollToIndex({
            index: activeIndex + 1,
            animated: true,
          });
        }
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (data: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.imageContainer}>
      <Image
        source={item.image}
        style={styles.image}
      />
    </View>
  );

  const renderDotIndicators = () =>
    carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "#B6FFFA" : "#F3F8FF",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      ></View>
    ));

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default ChangeImage;

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15, 
        backgroundColor: "white", 
        borderRadius: 15, 
        marginHorizontal: 5,
      },
      image: {
        height: 200,
        width: Dimensions.get("window").width - 40,
        borderRadius: 10, 
      },
});
