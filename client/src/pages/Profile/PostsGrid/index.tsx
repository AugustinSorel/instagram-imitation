import { AnimatePresence, Variants } from "framer-motion";
import { useQuery } from "react-query";
import { getAllPosts } from "../../../shared/api/postsApi";
import { Grid } from "./GridPosts.styled";
import PostItem from "./PostItem";

type Props = {};

const gridVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

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
      <Grid variants={gridVariants} initial="initial" animate="animate">
        {userPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export default GridPosts;
