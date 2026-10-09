import { request } from "@/api/client";
import type { Post } from "@/types";
export const postService = {
  all: async () => (await request<{ posts: Post[] }>("/posts?limit=20")).posts,
  create: (post: Pick<Post, "title" | "body" | "userId">) =>
    request<Post>("/posts/add", { method: "POST", body: JSON.stringify(post) }),
};
