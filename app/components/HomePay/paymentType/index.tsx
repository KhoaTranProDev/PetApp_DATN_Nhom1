import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

// css
import { styles } from "../../styles/mainPaymentType";
import { PaymentSalesData } from "../../Data";

interface Props {
  route: any;
  navigation: any;
}

const MainPaymentType: React.FC<Props> = ({ route, navigation }) => {
  const { selectedOption = "cash", totalPriceTxt, listPickPet, user } = route?.params ?? {};

  const handleOptionSelect = (option: string) => {
    console.log("option", option);
    navigation.navigate('PayScreen', { selectedOption: option, totalPriceTxt, listPickPet, user });
}

  // console.log("selectedOption", selectedOption);

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
        <Text style={styles.txtThanhToan}>Hình thức thanh toán</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:0900332211')}>
          <Image
            style={styles.imgCall}
            source={require("../../image/call_50px.png")}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.body}>
        {/* Payment incentives */}
        <View style={styles.fpIncentives}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.imgIncentives}
              source={require("../../image/sale_50px.png")}
            />
            <Text style={styles.txtIncentives}>Ưu đãi thanh toán</Text>
          </View>
          {/* sales Pay */}
          <FlatList
            data={PaymentSalesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.fpI_SalePay}>
                <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
                    <Image style={styles.imgSalePay} source={item.image} />
                    <Image source={require("../../image/help_15px.png")} />
                </View>
                <Text style={styles.txtSalePay}>{item.sale}</Text>
                <Text style={[styles.txtSalePay, { color: "#838383" }]}>
                  {item.note}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        {/* Select a payment method */}
        <View style={styles.fpSelectPayment}>
            <Text style={styles.txtSelectPayment}>Chọn hình thức thanh toán</Text>
            {/* Cash */}
            <TouchableOpacity style={styles.fpI_Payment}
                onPress={() => handleOptionSelect('cash')}>
                <View style={styles.radioContainer}>
                  {selectedOption === 'cash' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Image style={styles.imgPayment} source={require("../../image/ic_cash.png")} />
                <Text style={styles.txtPayment}>Thanh toán tiền mặt</Text>
            </TouchableOpacity>
            {/* App money */}
            <TouchableOpacity style={styles.fpI_Payment}
                onPress={() => handleOptionSelect('app')}>
                <View style={styles.radioContainer}>
                  {selectedOption === 'app' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Image style={styles.imgPayment} source={require("../../image/ic_app.png")} />
                <Text style={styles.txtPayment}>Thanh toán qua ứng dụng</Text>
            </TouchableOpacity>
            {/* ATM */}
            <TouchableOpacity style={styles.fpI_Payment}
                onPress={() => handleOptionSelect('atm')}>
                <View style={styles.radioContainer}>
                  {selectedOption === 'atm' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Image style={styles.imgPayment} source={require("../../image/ic_atm.png")} />
                <Text style={styles.txtPayment}>Thanh toán qua thẻ ATM</Text>
            </TouchableOpacity>
            {/* Credit card */}
            <TouchableOpacity style={styles.fpI_Payment}
                onPress={() => handleOptionSelect('credit')}>
                <View style={styles.radioContainer}>
                  {selectedOption === 'credit' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Image style={styles.imgPayment} source={require("../../image/ic_credit.png")} />
                <Text style={styles.txtPayment}>Thanh toán bằng thẻ tín dụng</Text>
            </TouchableOpacity>
            {/* Electronic Wallet */}
            <TouchableOpacity style={styles.fpI_Payment}
                onPress={() => handleOptionSelect('wallet')}>
                <View style={styles.radioContainer}>
                  {selectedOption === 'wallet' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Image style={styles.imgPayment} source={require("../../image/ic_wallet.png")} />
                <Text style={styles.txtPayment}>Thanh toán bằng ví điện tử (VN Pay)</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainPaymentType;
