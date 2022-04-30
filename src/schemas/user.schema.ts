import { object, string, TypeOf } from "zod";

export const userSignUpSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    })
      .min(3, "username must be at least 3 characters")
      .max(20, "username must be at most 20 characters"),

    email: string({
      required_error: "email is required",
    })
      .min(3, "email must be at least 3 characters")
      .max(255, "email must be at most 255 characters")
      .email("email must be a valid email"),

    age: string({
      required_error: "age is required",
    })
      .min(0, "age must be at least 0")
      .max(2, "age must be at most 100")
      .regex(/^[0-9]+$/, "age must be valid"),

    password: string({
      required_error: "password is required",
    })
      .min(3, "password must be at least 3 characters")
      .max(1024, "password must be at most 1024 characters"),
  }),
});

export const userLoginSchema = object({
  body: object({
    email: string({
      required_error: "email is required",
    })
      .min(3, "email must be at least 3 characters")
      .max(255, "email must be at most 255 characters")
      .email("email must be a valid email"),

    password: string({
      required_error: "password is required",
    })
      .min(3, "password must be at least 3 characters")
      .max(1024, "password must be at most 1024 characters"),
  }),
});

export type UserSignUpSchema = TypeOf<typeof userSignUpSchema>["body"];
export type UserLoginSchema = TypeOf<typeof userLoginSchema>["body"];
