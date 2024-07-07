import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

// css
import { styles } from '../styles/payScreen';

// data
import { DataAddress, DataCart } from '../Data';

const PayScreen: React.FC<{ navigation: any }> = (props) => {
  const {navigation} = props;

  return (
    <View style={styles.ContainerMain}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.imgSize28Header}
              source={require("../image/back_to_50px.png")}/>
          </TouchableOpacity>
          <Text style={styles.txtThanhToan}>
            Thanh toán
          </Text>
          <TouchableOpacity>
            <Image
              style={styles.imgCall}
              source={require("../image/call_50px.png")}
            />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View style={styles.body}>
          {/* Frame Product */}
          <View style={styles.frameProduct}>
            <View style={styles.frameImg}>
              <Image
                style={styles.imgProduct}
                source={DataCart[0].image}
              />
            </View>
            <View style={styles.frameInfo}>
              <View style={styles.showProduct}>
                <Text style={styles.txtNameProduct}>
                {DataCart[0].name}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('DetailProduct')}>
                  <Text style={styles.txtShowMore}>
                    Xem thêm ({DataCart.length})
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.txtUser}>
                {DataCart[0].idUser}
              </Text>
              <View style={styles.framePrice}>
                <Text style={styles.txtPrice}>
                {DataCart[0].price}
                </Text>
                <Text style={styles.txtQuantity}>
                x{DataCart[0].quantity}
                </Text>
              </View>
            </View>
          </View>
          {/* Frame Offers */}
          <View style={styles.frameOffers}>
            <Text style={styles.txtOffers}>Thanh toán bằng:</Text>
            <TouchableOpacity style={styles.addPayOffers} onPress={() => navigation.navigate('MainPaymentType')}>
              <Text style={styles.txtAddPayOffers}>Thêm hình thức thanh toán</Text>
            </TouchableOpacity>
          </View>
          {/* Order Product */}
          <View style={styles.frameOrderProduct}>
            <View style={styles.frameTxtOrder}>
              <Text style={styles.txtOrder}>Chi tiết đơn hàng</Text>
            </View>
            <View style={styles.frameDetailProduct}>
              <View style={styles.frameDetail}>
                <Text style={styles.txtDetail}>Tạm tính</Text>
                <Text style={styles.txtDetail}>$ 2.495</Text>
              </View>
              <View style={styles.frameDetail}>
                <Text style={styles.txtDetail}>Phí giao hàng</Text>
                <Text style={styles.txtDetail}>$ 2.495</Text>
              </View>
              <View style={styles.frameDetail}>
                <Text style={styles.txtDetail}>Giảm giá</Text>
                <Text style={styles.txtDetail}>$ 2.495</Text>
              </View>
              <View style={styles.frameTotal}>
                <Text style={styles.txtDetail}>Tổng cộng</Text>
                <Text style={styles.txtDetail}>$ 2.495</Text>
              </View>
            </View>
          </View>
          {/* Adress User */}
          <View style={styles.frameAdress}>
            <View style={styles.frameTxtAdress}>
              <Text style={styles.txtAdress}>Địa chỉ nhận hàng</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AddDress')}>
                <Text style={styles.txtAdressUpdate}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.frameDetailAdress}>
              <Text style={styles.txtDetailAdress}>
                {DataAddress[0].address ? DataAddress[0].address : 'Vui lòng thêm địa chỉ nhận hàng'}
              </Text>
            </View>
          </View>
        </View>
      {/* footer */}
      <View style={styles.footer}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity style={styles.btnCheckout}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
                Thanh toán
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}

export default PayScreen