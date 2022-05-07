import { useQuery } from "react-query";
import { getAllPostsLiked } from "../../../shared/api/postsApi";
import Loader from "../../../shared/components/UIElements/Loader";
import NoPostWarning from "../../../shared/components/UIElements/NoPostWarning";
import PostsGrid from "../../../shared/components/UIElements/PostsGrid";
import { PostsLikedLoaderContainer } from "./PostsLikedBody.styled";

type Props = {};

const PostsLikedBody = (props: Props) => {
  const { data: postsLiked, isLoading } = useQuery(
    "userPostsLiked",
    getAllPostsLiked
  );

  if (!postsLiked || isLoading) {
    return (
      <PostsLikedLoaderContainer>
        <Loader />
      </PostsLikedLoaderContainer>
    );
  }

  if (postsLiked.length === 0) {
    return (
      <NoPostWarning
        title="Like a post"
        callToActionText="explore"
        navigateTo="/explore"
      />
    );
  }

  return <PostsGrid posts={postsLiked} />;
};

export default PostsLikedBody;
