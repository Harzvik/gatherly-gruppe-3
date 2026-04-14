/*Alex Harsvik*/
import { getPostsForMeetup } from "../api/postFetcher";
import type { Post } from "../types/postsType";

export async function renderPostsForMeetup(meetupId: number) {
  try {
    const posts: Post[] = await getPostsForMeetup(meetupId);

    const postsListContainer = document.querySelector(
      ".posts-list",
    ) as HTMLElement;
    if (postsListContainer) {
      postsListContainer.innerHTML = "";
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.textContent = post.text;
        postsListContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error("Feil ved henting av poster:", error);
  }
}
