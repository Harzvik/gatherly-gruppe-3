import { getPostsForMeetup } from "../api/postFetcher";

export async function renderPostsForMeetup(meetupId: number) {
    try {
        const posts = await getPostsForMeetup(meetupId);
        const postsListContainer = document.querySelector(".posts-list") as HTMLElement;
        if (postsListContainer) {
            posts.forEach((post: any) => {
                postsListContainer.innerHTML += `<div class="post">${post.text}</div>`;
            });
        }
    } catch (error) {
        console.error("Feil ved henting av poster:", error);
    }
}