import { AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getAllPosts } from "../../../shared/api/postsApi";
import { listVariants } from "../../../shared/framerMotion/listAnimationVariants";
import { Grid } from "./GridPosts.styled";
import PostItem from "./PostItem";

type Props = {};

const GridPosts = (props: Props) => {
  const { data: userPosts, isLoading } = useQuery("userPosts", getAllPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userPosts) {
    return <div>No posts found</div>;
  }

  return (
    <AnimatePresence exitBeforeEnter initial>
      <Grid variants={listVariants} initial="initial" animate="animate">
        {userPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export default GridPosts;
