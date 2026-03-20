/*Alex Harsvik*/
import { getPostsForMeetup } from "../api/postFetcher";

export async function renderPostsForMeetup(meetupId: number) {
  try {
    const posts = await getPostsForMeetup(meetupId);

    const postsListContainer = document.querySelector(
      ".posts-list",
    ) as HTMLElement;
    if (postsListContainer) {
      postsListContainer.innerHTML = "";
      posts.map((post: any) => {
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
