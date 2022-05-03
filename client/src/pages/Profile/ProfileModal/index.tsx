import { FormEvent, useReducer } from "react";
import { useQueryClient } from "react-query";
import Button from "../../../shared/components/formElements/Button";
import { authenticationFormErrorAnimationReducer } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import SvgIcon from "../../../shared/components/UIElements/SvgIcon";
import UserForm from "../../../shared/components/UIElements/UserForm";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import theme from "../../../shared/styles/theme";
import User from "../../../shared/types/user";
import icons from "../../../shared/utils/icons";
import {
  FilePickerInput,
  ImagePickerContainer,
  ProfileModalAvatar,
  ProfileModalContainer,
} from "./ProfileModal.styled";
import useDeleteUserMutate from "./useDeleteUserMutate";
import useProfileDefaultValues from "./useProfileDefaultValues";
import useProfileModal from "./useProfileModal";
import useUpdateProfile from "./useUpdateProfile";

const ProfileModal = () => {
  const { close } = useProfileModal();
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

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

  const updateHandler = (e: FormEvent) => {
    e.preventDefault();
    updateMutate(inputState);
  };

  const deleteHandler = () => {
    deleteUserMutate();
    logoutHandler();
  };

  return (
    <ModalWrapper>
      <ProfileModalContainer>
        <SvgIcon path={icons.cross} onClick={close} />

        <ImagePickerContainer>
          <ProfileModalAvatar src={user.avatar} alt="userAvatar" />
          <FilePickerInput type="file" />
        </ImagePickerContainer>

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
