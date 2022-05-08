import { useQuery } from "react-query";
import { getAllPosts } from "../../../shared/api/postsApi";
import Loader from "../../../shared/components/UIElements/Loader";
import NoPostWarning from "../../../shared/components/UIElements/NoPostWarning";
import PostsGrid from "../../../shared/components/UIElements/PostsGrid";
import {
  ProfileBodyContainer,
  ProfileBodyLoaderContainer,
} from "./ProfileBody.styled";

type Props = {};

const ProfileBody = (props: Props) => {
  const { data: userPosts, isLoading } = useQuery("userPosts", getAllPosts);

  if (!userPosts || isLoading) {
    return (
      <ProfileBodyLoaderContainer>
        <Loader />
      </ProfileBodyLoaderContainer>
    );
  }

  if (userPosts.length === 0) {
    return (
      <NoPostWarning
        title="No posts yet"
        callToActionText="new post"
        navigateTo="/new-post"
      />
    );
  }

  return (
    <ProfileBodyContainer>
      <PostsGrid posts={userPosts} />
    </ProfileBodyContainer>
  );
};

export default ProfileBody;
