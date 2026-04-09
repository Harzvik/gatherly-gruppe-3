/*Alex Harsvik*/
import { API_BASE_URL, API_KEY } from "./config";
import type { CreatePostInput } from "../types/postsType";

export async function createPost(newPostData: CreatePostInput) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(newPostData),
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved oppretting av post`,
    );
  } else {
    console.log("Post opprettet med data:", newPostData);
  }
}
