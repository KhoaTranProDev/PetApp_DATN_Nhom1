import AxiosHelper from "@/app/util/AxiosHelper";

// get detail user
// /users/get-user/:id
export const getDetailUser = async (id: any) => {
    try {
        const res = await AxiosHelper.get(`/users/get-user/${id}`);
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartAll: ", error);
    }
}
