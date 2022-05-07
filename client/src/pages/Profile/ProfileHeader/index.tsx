import { AnimatePresence } from "framer-motion";
import { useQueryClient } from "react-query";
import Switch from "../../../shared/components/formElements/Switch";
import { scaleDown, scaleUp } from "../../../shared/framerMotion/whileVariants";
import useCurrentTheme from "../../../shared/store/useCurrentTheme";
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
  const { toggleTheme, isDarkMode } = useCurrentTheme();

  return (
    <>
      <ProfileHeaderContainer>
        <ProfileUsername>{user.username}</ProfileUsername>
        <Switch isOn={isDarkMode} onClick={toggleTheme} />
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
