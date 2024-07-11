import AxiosHelper from "@/app/util/AxiosHelper";

export const getCartAll = async () => {
    try {
        const res = await AxiosHelper.get("/cart");
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartAll: ", error);
    }
}
