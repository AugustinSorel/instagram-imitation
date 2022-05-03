import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "react-query";
import { scaleDown, scaleUp } from "../../../shared/framerMotion/whileVariants";
import User from "../../../shared/types/user";
import ProfileModal from "../ProfileModal";
import useProfileModal from "../ProfileModal/useProfileModal";
import {
  ProfileAvatar,
  ProfileHeaderContainer,
  ProfileUsername,
} from "./ProfileHeader.styled";

type Props = {};

const ProfileHeader = (props: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const { open, isOpen } = useProfileModal();

  return (
    <>
      <ProfileHeaderContainer>
        <ProfileUsername>{user.username}</ProfileUsername>
        <ProfileAvatar
          onClick={open}
          whileHover={{ ...scaleUp }}
          whileTap={{ ...scaleDown }}
          src={user.avatar}
          alt="userAvatar"
        />
      </ProfileHeaderContainer>

      <AnimatePresence exitBeforeEnter>
        {isOpen && <ProfileModal />}
      </AnimatePresence>
    </>
  );
};

export default ProfileHeader;
