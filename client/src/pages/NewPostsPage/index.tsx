import { ChangeEvent, useState } from "react";
import Button from "../../shared/components/formElements/Button";
import ImagePicker from "../../shared/components/formElements/ImagePicker";
import SvgIcon from "../../shared/components/UIElements/SvgIcon";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { scaleDown, scaleUp } from "../../shared/framerMotion/whileVariants";
import icons from "../../shared/utils/icons";
import {
  NewPostDescriptionInput,
  NewPostImagePickerContainer,
  NewPostImageTextContainer,
  NewPostImageTitle,
  NewPostPaddingContainer,
  NewPostPageContainer,
} from "./NewPostPage.styled";

const NewPostsPage = () => {
  const [userAvatar, setUserAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setAvatarFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUserAvatar(objectUrl);
  };

  return (
    <NewPostPageContainer>
      <MaxWidthWrapper>
        <NewPostPaddingContainer>
          <NewPostImagePickerContainer
            whileHover={{ ...scaleUp }}
            whileTap={{ ...scaleDown }}
          >
            <NewPostImageTextContainer>
              <SvgIcon path={icons.camera} />
              <NewPostImageTitle>select an image</NewPostImageTitle>
            </NewPostImageTextContainer>
            <ImagePicker src={userAvatar} onChange={handleFileChange} />
          </NewPostImagePickerContainer>
          <NewPostDescriptionInput
            placeholder="description..."
            rows={4}
            whileHover={{ ...scaleUp }}
            whileTap={{ ...scaleDown }}
          />
          {userAvatar && <Button text="submit" />}
        </NewPostPaddingContainer>
      </MaxWidthWrapper>
    </NewPostPageContainer>
  );
};

export default NewPostsPage;
