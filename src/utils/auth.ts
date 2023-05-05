import { signIn, signOut } from "next-auth/react";

import { api } from "./api";
import { useToast } from "~/components/ui/use-toast";

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
  const { toast } = useToast();

  const removeUserMutation = api.user.remove.useMutation({
    onSuccess: async () => {
      await signOutHandler();
    },

    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const removeUserHandler = () => {
    removeUserMutation.mutate();
  };

  return { removeUserHandler };
};
