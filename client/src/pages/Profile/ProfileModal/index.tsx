import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { useQueryClient } from "react-query";
import Button from "../../../shared/components/formElements/Button";
import ImagePicker from "../../../shared/components/formElements/ImagePicker";
import { authenticationFormErrorAnimationReducer } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import SvgIcon from "../../../shared/components/UIElements/SvgIcon";
import UserForm from "../../../shared/components/UIElements/UserForm";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import theme from "../../../shared/styles/theme";
import User from "../../../shared/types/user";
import icons from "../../../shared/utils/icons";
import { ProfileModalContainer } from "./ProfileModal.styled";
import useDeleteUserMutate from "./useDeleteUserMutate";
import useProfileDefaultValues from "./useProfileDefaultValues";
import useProfileModal from "./useProfileModal";
import useUpdateProfile from "./useUpdateProfile";

const ProfileModal = () => {
  const { close } = useProfileModal();
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const [userAvatar, setUserAvatar] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { defaultProfileDetails, defaultProfileErrorAnimation } =
    useProfileDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultProfileDetails
  );

  const [errorAnimationState, errorAnimationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultProfileErrorAnimation
  );

  const updateMutate = useUpdateProfile(errorAnimationDispatch);
  const deleteUserMutate = useDeleteUserMutate();

  const logoutHandler = () => {
    logoutMutation();
  };

  const updateHandler = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", inputState.username as string);
    formData.append("email", inputState.email);
    formData.append("password", inputState.password);
    formData.append("age", inputState.age as string);
    formData.append("avatar", avatarFile || userAvatar);

    updateMutate(formData);
  };

  const deleteHandler = () => {
    deleteUserMutate();
    logoutHandler();
  };

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
    <ModalWrapper>
      <ProfileModalContainer>
        <SvgIcon path={icons.cross} onClick={close} />

        <ImagePicker src={userAvatar} onChange={handleFileChange} />

        <UserForm
          fullForm
          errorAnimationState={errorAnimationState}
          inputState={inputState}
          inputDispatch={inputDispatch}
          submitHandler={updateHandler}
        />

        <Button
          text="logout"
          type="text"
          onClick={logoutHandler}
          color="gray"
        />
        <Button
          text="delete"
          type="text"
          color={theme.colors.error}
          onClick={deleteHandler}
        />
      </ProfileModalContainer>
    </ModalWrapper>
  );
};

export default ProfileModal;
