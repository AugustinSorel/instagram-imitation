import { object, string, TypeOf } from "zod";

const username = string({
  required_error: "username is required",
})
  .min(3, "username must be at least 3 characters")
  .max(20, "username must be at most 20 characters");

const email = string({
  required_error: "email is required",
})
  .min(3, "email must be at least 3 characters")
  .max(255, "email must be at most 255 characters")
  .email("email must be a valid email");

const age = string({
  required_error: "age is required",
})
  .min(0, "age must be at least 0")
  .max(2, "age must be at most 100")
  .regex(/^[0-9]+$/, "age must be valid");

const password = string({
  required_error: "password is required",
})
  .min(3, "password must be at least 3 characters")
  .max(1024, "password must be at most 1024 characters");

const avatar = string({
  required_error: "avatar is required",
})
  .min(3, "url of avatar must be at least 3 characters")
  .max(1024, "url of avatar must be at most 1024 characters");

export const userSignUpSchema = object({
  body: object({
    username: username,
    email: email,
    age: age,
    password: password,
  }),
});

export const userLoginSchema = object({
  body: object({
    email: email,
    password: password,
  }),
});

export const userPatchSchema = object({
  body: object({
    username: username,
    email: email,
    age: age,
    password: password,
    avatar: avatar,
  }),
});

export type UserSignUpSchema = TypeOf<typeof userSignUpSchema>["body"];
export type UserLoginSchema = TypeOf<typeof userLoginSchema>["body"];
export type UserPatchSchema = TypeOf<typeof userPatchSchema>["body"];
