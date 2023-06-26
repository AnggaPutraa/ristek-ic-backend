import { db } from "../db";
import { PostDto } from "./post.dto";

class PostDao {
  async createPost(userId: string, post: PostDto) {
    try {
      const data = await db.post.create({
        data: {
          body: post.body,
          image: post.image,
          userId,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAllPost(userId: string) {
    try {
      const data = await db.post.findMany({
        where: {
          userId: userId,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default new PostDao();
