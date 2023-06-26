import { Post } from "@prisma/client";

type PostDto = Omit<Post, "id" | "createdAt" | "updatedAt" | "userId">;

export { PostDto };
