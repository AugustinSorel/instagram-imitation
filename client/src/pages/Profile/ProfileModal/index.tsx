import { FormEvent, useReducer } from "react";
import { useMutation } from "react-query";
import { updateUser } from "../../../shared/api/userApi";
import Button from "../../../shared/components/formElements/Button";
import { authenticationFormErrorAnimationReducer } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import SvgIcon from "../../../shared/components/UIElements/SvgIcon";
import UserForm from "../../../shared/components/UIElements/UserForm";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import theme from "../../../shared/styles/theme";
import getAuthenticationErrorEnum from "../../../shared/utils/getAuthenticationErrorEnum";
import icons from "../../../shared/utils/icons";
import {
  ProfileModalAvatar,
  ProfileModalContainer,
} from "./ProfileModal.styled";
import useProfileDefaultValues from "./useProfileDefaultValues";
import useProfileModal from "./useProfileModal";

const ProfileModal = () => {
  const { close } = useProfileModal();
  const logoutMutation = useLogout();

  const logoutHandler = () => {
    logoutMutation();
  };

  const { mutate: udpateMutate } = useMutation(updateUser, {
    onSuccess: () => {
      close();
    },
    onError: (error: any) => {
      const { field, message } = error.response.data;

      console.log(field, message);

      errorAnimationDispatch({
        type: getAuthenticationErrorEnum(field),
        payload: message,
      });
    },
  });

  const updateHandler = (e: FormEvent) => {
    e.preventDefault();
    udpateMutate(inputState);
  };

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

  return (
    <ModalWrapper>
      <ProfileModalContainer>
        <SvgIcon path={icons.cross} onClick={close} />
        <ProfileModalAvatar
          src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
          alt="userAvatar"
        />

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
          onClick={() => {}}
        />
      </ProfileModalContainer>
    </ModalWrapper>
  );
};

export default ProfileModal;
