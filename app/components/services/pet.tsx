import AxiosHelper from "@/app/util/AxiosHelper";

// Gửi bài đăng
export const sendNewPost = async (data: any) => {
    try {
        const res = await AxiosHelper.post("/pet/add", data);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log("Lỗi services sendNewPost: ", error);
    }
}