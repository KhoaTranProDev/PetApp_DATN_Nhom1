import AxiosHelper from "@/app/util/AxiosHelper";

// Thanh toán
// /pay/add
export const addPay = async (data: any) => {
  try {
    const res = await AxiosHelper.post("/pay/add", data);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
}
