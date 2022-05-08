import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import { PostLikedContainer } from "./PostLiked.styled";
import PostsLikedBody from "./PostsLikedBody";
import PostsLikedHeader from "./PostsLikedHeader";

const PostsLiked = () => {
  return (
    <PageTransitionWrapper>
      <PostLikedContainer>
        <MaxWidthWrapper>
          <PostsLikedHeader />
          <PostsLikedBody />
        </MaxWidthWrapper>
      </PostLikedContainer>
    </PageTransitionWrapper>
  );
};

export default PostsLiked;
