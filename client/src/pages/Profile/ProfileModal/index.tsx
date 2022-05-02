import { useReducer } from "react";
import { useQueryClient } from "react-query";
import Button from "../../../shared/components/formElements/Button";
import { authenticationFormErrorAnimationReducer } from "../../../shared/components/UIElements/authenticationForm/authenticationAnimationReducer";
import { authenticationFormReducer } from "../../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import SvgIcon from "../../../shared/components/UIElements/SvgIcon";
import UserForm from "../../../shared/components/UIElements/UserForm";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import User from "../../../shared/types/user";
import icons from "../../../shared/utils/icons";
import useSignUpPageDefaultValues from "../../SignUpPage/useSignUpPageDefaultValues";
import {
  ProfileModalAvatar,
  ProfileModalContainer,
} from "./ProfileModal.styled";
import useProfileModal from "./useProfileModal";

const ProfileModal = () => {
  const { close } = useProfileModal();
  const logoutMutation = useLogout();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const logoutHandler = () => {
    logoutMutation();
  };

  const { defaultSignUErrorAnimation, defaultSignUpDetails } =
    useSignUpPageDefaultValues();

  const [inputState, inputDispatch] = useReducer(
    authenticationFormReducer,
    defaultSignUpDetails
  );

  const [errorAnimationState, errorAnimationDispatch] = useReducer(
    authenticationFormErrorAnimationReducer,
    defaultSignUErrorAnimation
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
          submitHandler={() => {}}
        />

        <Button text="logout" onClick={logoutHandler} />
        <Button text="delete" onClick={() => {}} />
      </ProfileModalContainer>
    </ModalWrapper>
  );
};

export default ProfileModal;
