import ModalWrapper from "../../../shared/components/wrappers/ModalWrapper";
import useProfileModal from "./useProfileModal";

type Props = {};

const ProfileModal = (props: Props) => {
  const { close } = useProfileModal();

  return (
    <ModalWrapper>
      <h1>I am the Profile Modal</h1>
      <button onClick={close}>Close</button>
    </ModalWrapper>
  );
};

export default ProfileModal;
