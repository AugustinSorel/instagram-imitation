import { useQuery } from "react-query";
import { getAllPostsLiked } from "../../shared/api/postsApi";
import NoPostWarning from "../../shared/components/UIElements/NoPostWarning";
import PostsGrid from "../../shared/components/UIElements/PostsGrid";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { PostLikedContainer } from "./PostLiked.styled";

const PostsLiked = () => {
  const { data: postsLiked, isLoading } = useQuery(
    "userPostsLiked",
    getAllPostsLiked
  );

  if (!postsLiked || isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <PostLikedContainer>
      <MaxWidthWrapper>
        {postsLiked.length === 0 ? (
          <NoPostWarning
            title="Like a post"
            callToActionText="explore"
            navigateTo="/explore"
          />
        ) : (
          <PostsGrid posts={postsLiked} />
        )}
      </MaxWidthWrapper>
    </PostLikedContainer>
  );
};

export default PostsLiked;
