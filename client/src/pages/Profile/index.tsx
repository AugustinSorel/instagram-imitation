import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { ProfileContainer } from "./Profile.styled";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <ProfileHeader />
        <ProfileBody />
      </MaxWidthWrapper>
    </ProfileContainer>
  );
};

export default Profile;
