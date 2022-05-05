import { any, object, TypeOf } from "zod";

export const addNewPostSchema = object({
  body: object({
    post: any(),
  }),
});

export type AddNewPostSchema = TypeOf<typeof addNewPostSchema>["body"];
