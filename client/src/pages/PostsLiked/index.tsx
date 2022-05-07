import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { PostLikedContainer } from "./PostLiked.styled";
import PostsLikedBody from "./PostsLikedBody";
import PostsLikedHeader from "./PostsLikedHeader";

const PostsLiked = () => {
  return (
    <PostLikedContainer>
      <MaxWidthWrapper>
        <PostsLikedHeader />
        <PostsLikedBody />
      </MaxWidthWrapper>
    </PostLikedContainer>
  );
};

export default PostsLiked;
