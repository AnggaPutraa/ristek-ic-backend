import { z } from "zod";

const PostSchema = z.object({
  body: z.object({
    body: z.string({
      required_error: "body is required",
    }),
    image: z.string().optional(),
  }),
});

export { PostSchema };
