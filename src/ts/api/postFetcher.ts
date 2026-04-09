/*Alex Harsvik*/
import type { Post } from "../types/postsType";

export async function getPostsForMeetup(meetupId: number): Promise<Post[]> {
  const response = await fetch(
    `http://localhost:3000/api/posts?meetupId=${meetupId}`,
  );
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved henting av posts for meetup med id ${meetupId}`,
    );
  }

  const postData: Post[] = await response.json();
  return postData;
}
