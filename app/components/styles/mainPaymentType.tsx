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
    //   body
    body: {},
    //   Payment incentives
    fpIncentives: {
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        padding: 10,
      },
      imgIncentives: {
        width: 20,
        height: 20,
      },
      txtIncentives: {
        fontSize: 14,
        color: "#6D3805",
        marginLeft: 5,
      },
    // Sale Pay 
    fpI_SalePay: {
        width: 180,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
      },
      imgSalePay: {
        width: 100,
        height: 25,
      },
      txtSalePay: {
        fontSize: 14,
        color: "#3E4FE9",
        marginLeft: 5,
      },
    //   Select payment method
    fpSelectPayment: {
        marginTop: 5,
        padding: 10,
      },
      txtSelectPayment: {
        fontSize: 14,
        color: "#6D3805",
      },
    //   radio
  radioContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#06A6BB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000000',
  },
    //   Cash
      fpI_Payment: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
      },
        imgPayment: {
            width: 30,
            height: 30,
            marginLeft: 25,
        },
        txtPayment: {
            fontSize: 14,
            color: "#6D3805",
            paddingLeft: 10,
        },

})