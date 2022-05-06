import { useQuery } from "react-query";
import { getAllPosts } from "../../../shared/api/postsApi";
import NoPostWarning from "../../../shared/components/UIElements/NoPostWarning";
import PostsGrid from "../../../shared/components/UIElements/PostsGrid";

type Props = {};

const ProfileBody = (props: Props) => {
  const { data: userPosts } = useQuery("userPosts", getAllPosts);

  if (!userPosts) {
    return <div>Loading...</div>;
  }

  if ([].length === 0) {
    return <NoPostWarning title="Your posts are empty" />;
  }

  return <PostsGrid posts={userPosts} />;
};

export default ProfileBody;
