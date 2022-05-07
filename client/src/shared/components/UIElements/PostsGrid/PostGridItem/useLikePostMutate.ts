import { useMutation, useQueryClient } from "react-query";
import { likePost } from "../../../../api/postsApi";

interface Props {
  toggleHasLiked: () => void;
  updateLikes: () => void;
}

const useLikePostMutate = ({ toggleHasLiked, updateLikes }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: likePostMutate } = useMutation(likePost, {
    onError: (error) => {
      console.log(error);
    },

    onMutate: () => {
      toggleHasLiked();
      updateLikes();
    },

    onSettled: () => {
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("userPosts");
      queryClient.invalidateQueries("userPostsLiked");
    },
  });

  return likePostMutate;
};

export default useLikePostMutate;
