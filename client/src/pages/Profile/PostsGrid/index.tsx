import { useQuery } from "react-query";
import { getAllPosts } from "../../../shared/api/postsApi";
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
    <Grid>
      {userPosts.map((post) => (
        <PostItem post={post} key={post._id} />
      ))}
    </Grid>
  );
};

export default GridPosts;
