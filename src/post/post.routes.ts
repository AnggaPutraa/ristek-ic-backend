import express from "express";
import { Request, Response } from "express";
import { validateDto } from "../common/common.validator";
import { PostSchema } from "./post.validation";
import { authenticated } from "../auth/auth.middleware";
import { PostDto } from "./post.dto";
import { User } from "@prisma/client";
import postService from "./post.service";
import authService from "../auth/auth.service";

const router = express.Router();

router.post(
  "/create",
  authenticated,
  validateDto(PostSchema),
  async (req: Request, res: Response) => {
    const data = req.body as PostDto & { user: User };
    const result = postService.createPost(data);

    if (!result) {
      return res.status(400).send({
        message: "failed to create new post",
      });
    }

    return res.status(200).send({
      message: "successfully create new post",
    });
  }
);

router.get("/all", authenticated, async (req: Request, res: Response) => {
  const user = await authService.getUserByEmail(req.body.user.email as string);
  const data = await postService.getAllPost(user!.id);

  if (!data) {
    return res.status(404).send({
      message: "post  not found",
    });
  }

  return res.status(200).json(data);
});

export { router };
