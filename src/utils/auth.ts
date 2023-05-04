import { signIn, signOut } from "next-auth/react";
import { useToaster } from "~/components/Toaster";
import { api } from "./api";

export const signOutHandler = async () => {
  await signOut({ redirect: false });
};

export const signInWithGithubHandler = async () => {
  await signIn("github", { redirect: false });
};

export const signInWithGoogleHandler = async () => {
  await signIn("google", { redirect: false });
};

export const useRemoveUser = () => {
  const addToast = useToaster((state) => state.addToast);

  const removeUserMutation = api.user.remove.useMutation({
    onSuccess: async () => {
      await signOutHandler();
    },

    onError: () => {
      addToast("something went wrong");
    },
  });

  const removeUserHandler = () => {
    removeUserMutation.mutate();
  };

  return { removeUserHandler };
};
