import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../shared/api/postsApi";

const useAddNewPostMutate = () => {
  const navigate = useNavigate();

  const { mutate: addNewPostMutate, isLoading } = useMutation(addNewPost, {
    onSuccess: (data: any) => {
      navigate("/profile");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return { addNewPostMutate, isLoading };
};

export default useAddNewPostMutate;
