import Post from "../../../../shared/types/post";
import { PostItemImage } from "./PostItem.styled";

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  return <PostItemImage src={post.url} />;
};

export default PostItem;
