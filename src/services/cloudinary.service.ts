import cloudinary from "../utils/cloudinary.util";

export const uploadAvatar = (filePath: string, fileName: string) => {
  return cloudinary.v2.uploader.upload(filePath, {
    upload_preset: "avatars",
    public_id: fileName,
  });
};

export const deleteAvatar = (userId: string) => {
  return cloudinary.v2.uploader.destroy(
    `instagram-imitation/avatars/${userId}`
  );
};
