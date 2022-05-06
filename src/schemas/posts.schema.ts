import { any, object, string, TypeOf } from "zod";

export const addNewPostSchema = object({
  body: object({
    post: any(),
  }),
});

export const likePostSchema = object({
  params: object({
    postId: string().min(5).max(50).nonempty(),
  }),
});

export type AddNewPostSchema = TypeOf<typeof addNewPostSchema>["body"];
export type LikePostSchema = TypeOf<typeof likePostSchema>["params"];
