import axios from "axios";

export const uploadFileToCloudinary = async (file, folder) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hey-dev-cloudinary-app");
  formData.append("cloud_name", "dwaycvrvm");
  formData.append("folder", folder);

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dwaycvrvm/upload",
      formData
    );
    console.log(res.data);
    return res.data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
