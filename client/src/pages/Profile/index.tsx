import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import { ProfileContainer } from "./Profile.styled";
import ProfileBody from "./ProfileBody";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  return (
    <PageTransitionWrapper>
      <ProfileContainer>
        <MaxWidthWrapper>
          <ProfileHeader />
          <ProfileBody />
        </MaxWidthWrapper>
      </ProfileContainer>
    </PageTransitionWrapper>
  );
};

export default Profile;
