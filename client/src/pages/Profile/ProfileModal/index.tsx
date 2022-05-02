import { useQueryClient } from "react-query";
import Button from "../../../shared/components/formElements/Button";
import SvgIcon from "../../../shared/components/UIElements/SvgIcon";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import User from "../../../shared/types/user";
import icons from "../../../shared/utils/icons";
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

  return (
    <ModalWrapper>
      <ProfileModalContainer>
        <SvgIcon path={icons.cross} onClick={close} />
        <ProfileModalAvatar
          src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
          alt="userAvatar"
        />

        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>{user.age}</h1>
        <Button text="logout" onClick={logoutHandler} />
        <Button text="save" onClick={close} />
      </ProfileModalContainer>
    </ModalWrapper>
  );
};

export default ProfileModal;
