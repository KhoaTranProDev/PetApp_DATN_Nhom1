import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ContainerMain: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DFDFDF",
    marginBottom: 20,
  },
  imgSize28Header: {
    marginTop: 15,
    width: 28,
    height: 28,
  },
  txtThanhToan: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6D3805",
    marginTop: 15,
  },
  imgCall: {
    marginTop: 15,
    width: 28,
    height: 28,
    transform: [{ rotate: "180deg" }],
  },
  body: {},
  // Product
  frameProduct: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 10,
  },
  frameImg: {},
  imgProduct: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  frameInfo: {
    width: "70%",
    paddingLeft: 15,
  },
  showProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtNameProduct: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  txtShowMore: {
    fontSize: 14,
    color: "#6D3805",
  },
  txtUser: {
    fontSize: 14,
    color: "#000000",
  },
  framePrice: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  txtPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B2030C",
  },
  txtQuantity: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 10,
  },

  // Offers
  frameOffers: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 10,
    padding: 10,
  },
  txtOffers: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  addPayOffers: {
    borderWidth: 1,
    borderColor: "#6D3805",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  txtAddPayOffers: {
    fontSize: 16,
    color: "#6D3805",
  },
  // Order Product
  frameOrderProduct: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 10,
    padding: 10,
  },
  frameTxtOrder: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#B3B3B3",
    paddingBottom: 10,
  },
  txtOrder: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  frameDetailProduct: {
    marginTop: 10,
  },
  frameDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingBottom: 10,
  },
  frameTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderTopWidth: 1,
    borderColor: "#B3B3B3",
  },
  txtDetail: {
    fontSize: 16,
    color: "#000000",
  },
  // Adress User
  frameAdress: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#B3B3B3",
    borderRadius: 10,
    padding: 10,
  },
  frameTxtAdress: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#B3B3B3",
    paddingBottom: 10,
  },
  txtAdress: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  txtAdressUpdate: {
    fontSize: 14,
    color: "#6D3805",
  },
  frameDetailAdress: {
    marginTop: 10,
  },
  txtDetailAdress: {
    fontSize: 16,
    color: "#000000",
  },
  // Footer
  footer: {},
  btnCheckout: {
    backgroundColor: "#FF5E00",
    width: 343,
    height: 50,
    marginTop: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  viewCloseWebView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnBack: {
    height: 50,
    backgroundColor: "#0088AE",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  txtText: { 
    fontSize: 16, 
    color: "#fff", 
    fontWeight: "bold",
  },
});
