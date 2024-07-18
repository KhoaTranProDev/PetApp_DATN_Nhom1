import AxiosHelper from "@/app/util/AxiosHelper";

// get address
// /users/get-addressAll/:id
export const getListPayIdUser = async (id: any) => {
    try {
        const res = await AxiosHelper.get(`/users/get-addressAll/${id}`);
        return res.data.addressAll;
    } catch (error) {
        console.log("Lỗi services getCartAll: ", error);
    }
}

// add address
// /users/add-addressAll/:id
export const addAddress = async (data: any, id: any) => {
    try {
        const res = await AxiosHelper.post(`/users/add-addressAll/${id}`, data);
        return res.data;
    } catch (error) {
        console.log("Lỗi services addAddress: ", error);
    }
}

// update address
// /users/update-addressAll/:userId/:addressId
export const updateAddress = async (userId: any, addressId: any, data: any) => {
    try {
        const res = await AxiosHelper.put(`/users/update-addressAll/${userId}/${addressId}`, data);
        return res.data;
    } catch (error) {
        console.log("Lỗi services updateAddress: ", error);
    }
}

// update addressAll defaultA
// /users/update-addressAll-defaultA/:userId/:addressId
export const updateAddressDefaultA = async (userId: any, addressId: any) => {
    try {
        const res = await AxiosHelper.put(`/users/update-addressAll-defaultA/${userId}/${addressId}`);
        return res.data.user;
    } catch (error) {
        console.log("Lỗi services updateAddressDefaultA: ", error);
    }
}

// delete address
// /users/delete-addressAll/:userId/:addressId
export const deleteAddress = async (userId: any, addressId: any) => {
    try {
        const res = await AxiosHelper.delete(`/users/delete-addressAll/${userId}/${addressId}`);
        return res.data;
    } catch (error) {
        console.log("Lỗi services deleteAddress: ", error);
    }
}
