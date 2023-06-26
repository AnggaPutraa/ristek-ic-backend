import { User } from "@prisma/client";
import { PostDto } from "./post.dto";
import authService from "../auth/auth.service";
import postDao from "./post.dao";

class PostService {
  async createPost(post: PostDto & { user: User }) {
    const user = await authService.getUserByEmail(post.user.email);
    if (!user) {
      return null;
    }
    return await postDao.createPost(user.id, post);
  }

  async getAllPost(userId: string) {
    return await postDao.getAllPost(userId);
  }
}

export default new PostService();
