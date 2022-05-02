import { useQueryClient } from "react-query";
import User from "../../../shared/types/user";
import {
  ProfileAvatar,
  ProfileHeaderContainer,
  ProfileUsername,
} from "./ProfileHeader.styled";

type Props = {};

const ProfileHeader = (props: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  return (
    <ProfileHeaderContainer>
      <ProfileUsername>{user.username}</ProfileUsername>
      <ProfileAvatar
        src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
        alt="userAvatar"
      />
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
