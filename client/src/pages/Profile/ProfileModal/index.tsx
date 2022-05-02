import { useMutation, useQueryClient } from "react-query";
import { logoutUser } from "../../../shared/api/userApi";
import Button from "../../../shared/components/formElements/Button";
import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useUser from "../../../shared/store/useUser";
import User from "../../../shared/types/user";
import { ProfileModalContainer } from "./ProfileModal.styled";
import useProfileModal from "./useProfileModal";

type Props = {};

const ProfileModal = (props: Props) => {
  const { close } = useProfileModal();
  const { setIsAuthenticated } = useUser();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const { mutate: logoutMutation } = useMutation(logoutUser, {
    onSuccess: () => {
      close();
    },
    onError: (error: any) => {
      console.log("Error in logout mutation", error);
    },
    onSettled: () => {
      setIsAuthenticated(false);
    },
  });

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
