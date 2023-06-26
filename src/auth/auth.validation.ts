import { z } from "zod";

const RegisterSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6)
      .max(100),
    full_name: z
      .string({
        required_error: "full_name is required",
      })
      .min(2)
      .max(100),
  }),
});

const LoginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export { RegisterSchema, LoginSchema };
