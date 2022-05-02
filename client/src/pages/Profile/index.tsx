import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { Grid, GridItem, ProfileContainer } from "./Profile.styled";

const Profile = () => {
  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <h1>Profile</h1>
        <Grid>
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </Grid>
      </MaxWidthWrapper>
    </ProfileContainer>
  );
};

export default Profile;
