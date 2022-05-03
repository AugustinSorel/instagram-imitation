import { useMutation } from "react-query";
import { deleteUser } from "../../../shared/api/userApi";

const useDeleteUserMutate = () => {
  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return deleteUserMutate;
};

export default useDeleteUserMutate;
