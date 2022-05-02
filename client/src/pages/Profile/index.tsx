import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { Grid, GridItem, ProfileContainer } from "./Profile.styled";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <ProfileHeader />
        <Grid>
          {[...Array(10)].map((_, i) => (
            <GridItem key={i} />
          ))}
        </Grid>
      </MaxWidthWrapper>
    </ProfileContainer>
  );
};

export default Profile;
