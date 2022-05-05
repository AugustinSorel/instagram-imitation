import { useMutation } from "react-query";
import { addNewPost } from "../../shared/api/postsApi";

const useAddNewPostMutate = () => {
  const { mutate: addNewPostMutate } = useMutation(addNewPost, {
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return addNewPostMutate;
};

export default useAddNewPostMutate;
