/*Alex Harsvik*/
import { API_BASE_URL, API_KEY } from "./config";

export async function deletePost(postId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved sletting av post med id ${postId}`,
    );
  }
}
