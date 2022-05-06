import { useQuery } from "react-query";
import { getAllPosts } from "../../shared/api/postsApi";
import PostsGrid from "../../shared/components/UIElements/PostsGrid";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { ProfileContainer } from "./Profile.styled";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
  const { data: userPosts, isLoading } = useQuery("userPosts", getAllPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <MaxWidthWrapper>
        <ProfileHeader />
        <PostsGrid posts={userPosts} />
      </MaxWidthWrapper>
    </ProfileContainer>
  );
};

export default Profile;
