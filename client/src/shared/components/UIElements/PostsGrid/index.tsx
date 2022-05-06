import { AnimatePresence } from "framer-motion";
import { listVariants } from "../../../framerMotion/listAnimationVariants";
import Post from "../../../types/post";
import PostGridItem from "./PostGridItem";
import { PostsGridContainer } from "./PostsGrid.styled";

type Props = {
  posts: Post[] | undefined;
};

const PostsGrid = ({ posts }: Props) => {
  if (!posts) {
    return <h1>Loading...</h1>;
  }

  return (
    <AnimatePresence exitBeforeEnter initial>
      <PostsGridContainer
        variants={listVariants}
        initial="initial"
        animate="animate"
      >
        {posts.map((post) => (
          <PostGridItem post={post} key={post._id} />
        ))}
      </PostsGridContainer>
    </AnimatePresence>
  );
};

export default PostsGrid;
