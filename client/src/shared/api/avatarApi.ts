import axios from "axios";

export const updateUserAvatar = async (file: File | null, userId: string) => {
  if (!file) {
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "avatars");
  data.append("public_id", userId);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dvjmzgrqq/image/upload`,
      data
    );

    return res.data.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
