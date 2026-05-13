/*Alex Harsvik*/
import { API_BASE_URL, API_KEY } from "./config";

export async function deleteComment(commentId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved sletting av kommentar med id ${commentId}`,
    );
  }
}