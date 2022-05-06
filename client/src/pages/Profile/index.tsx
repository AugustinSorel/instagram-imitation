import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import GridPosts from "./PostsGrid";
import { ProfileContainer } from "./Profile.styled";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <ProfileHeader />
        <GridPosts />
      </MaxWidthWrapper>
    </ProfileContainer>
  );
};

export default Profile;
