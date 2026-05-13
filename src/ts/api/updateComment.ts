/*Alex Harsvik*/
import { API_BASE_URL, API_KEY } from "./config";
import type { CommentsType } from "../types/commentsType";

export async function updateComment(commentId: number, updatedComment: Partial<CommentsType>): Promise<CommentsType> {
  const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(updatedComment),
  });
  
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved oppdatering av kommentar med id ${commentId}`,
    );
  }

  const updatedCommentData: CommentsType = await response.json();
  return updatedCommentData;
}