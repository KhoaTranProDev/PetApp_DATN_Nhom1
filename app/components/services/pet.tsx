import AxiosHelper from "@/app/util/AxiosHelper";
import axios from "axios";

// Gửi bài đăng
export const sendNewPost = async (data: any) => {
  try {
    const res = await AxiosHelper.post("/pet/add", data);
    // console.log(">>>>>>> sendNewPost", res.data);
    return res.data;
  } catch (error) {
    console.log("Lỗi services sendNewPost: ", error);
  }
};

// Upload ảnh cloudinary
export const uploadImageStatus = async (form: any) => {
    try {
      const response = await AxiosHelper.post('/pet/upload-image', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 3000000000,
      });
      return response;
    } catch (error) {
      console.log("Lỗi services uploadImageStatus: ", error);
      throw error;
    }
  };