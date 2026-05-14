/*Alex Harsvik*/

import { API_BASE_URL, API_KEY } from "./config";
import type { Post } from "../types/postsType";

export async function updatePost(postId: number, updatedPost: Post): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(updatedPost),
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved oppdatering av post med id ${postId}`,
    );
  }

  const updatedPostData: Post = await response.json();
  return updatedPostData;
}
