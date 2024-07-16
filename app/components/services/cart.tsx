import AxiosHelper from "@/app/util/AxiosHelper";

export const getCartAll = async () => {
    try {
        const res = await AxiosHelper.get("/cart");
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartAll: ", error);
    }
}

// detail
export const getCartIdUser = async (idUser: any) => {
    try {
        const res = await AxiosHelper.get(`/cart/get-idUser/${idUser}`);
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartIdUser: ", error);
    }
}
