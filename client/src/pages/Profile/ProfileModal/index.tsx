import { useQueryClient } from "react-query";
import Button from "../../../shared/components/formElements/Button";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useLogout from "../../../shared/hooks/useLogout";
import User from "../../../shared/types/user";
import { ProfileModalContainer } from "./ProfileModal.styled";
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
        <h1>{user.username}</h1>
        <Button text="logout" onClick={logoutHandler} />
        <Button text="save" onClick={close} />
      </ProfileModalContainer>
    </ModalWrapper>
  );
};

export default ProfileModal;
