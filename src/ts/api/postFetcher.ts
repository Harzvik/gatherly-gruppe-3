/*Alex Harsvik*/
import { API_BASE_URL } from "./config";
import type { Post } from "../types/postsType";

export async function getPostsForMeetup(meetupId: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts?meetupId=${meetupId}`);
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved henting av posts for meetup med id ${meetupId}`,
    );
  }

  const postData: Post[] = await response.json();
  return postData;
}
