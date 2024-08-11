import AxiosHelper from "@/app/util/AxiosHelper";

// get all
// /cart
export const getCartAll = async () => {
    try {
        const res = await AxiosHelper.get("/cart");
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartAll: ", error);
    }
}

// get id
// /cart/:id
export const getCartIdUser = async (idUser: any) => {
    try {
        const res = await AxiosHelper.get(`/cart/get-idUser/${idUser}`);
        return res.data;
    } catch (error) {
        console.log("Lỗi services getCartIdUser: ", error);
    }
}

// add body
// /cart/add
export const addCart = async (body: any) => {
    try {
        const res = await AxiosHelper.post("/cart/add", body);
        return res.data;
    } catch (error) {
        console.log("Lỗi services addCart: ", error);
    }
}

// delete id
// /cart/delete/:id
export const deleteIdCart = async (id: any) => {
    try {
        const res = await AxiosHelper.delete(`/cart/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log("Lỗi services deleteIdCart: ", error);
    }
}

// delete many items by idCart
// /cart/delete-many
export const deleteManyCart = async (idCart: any) => {
    try {
        const res = await AxiosHelper.delete("/cart/delete-many", {
            data: { idCart }
        });
        return res.data;
    } catch (error) {
        console.log("Lỗi services deleteManyCart: ", error);
    }
}
