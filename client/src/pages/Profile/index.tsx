import { useQueryClient } from "react-query";
import { AuthenticationFormState } from "../../shared/components/UIElements/authenticationForm/AuthenticationReducer";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import {
  Grid,
  GridItem,
  ProfileContainer,
  ProfileHeader,
  ProfileHeaderAvatar,
  ProfileHeaderUsername,
} from "./Profile.styled";

const Profile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as AuthenticationFormState;

  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <ProfileHeader>
          <ProfileHeaderUsername>{user.username}</ProfileHeaderUsername>
          <ProfileHeaderAvatar
            src="https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
            alt="userAvatar"
          />
        </ProfileHeader>
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
