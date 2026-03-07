/*Alex Harsvik*/
import { getMeetupById } from "../api/meetupFetcher.ts";
import { renderEventDetails } from "../functions/eventSlugRenderer.ts";
import { HeaderComponent } from "../components/header.ts";
import { renderPostForm } from "../functions/postFormRenderer.ts";
import { getMeetupidFromURL } from "../functions/getMeetupidFromURL.ts";
import type { PostsType } from "../types/postsType.ts";
import { createPost } from "../api/createPost.ts";

const meetupId = getMeetupidFromURL();

customElements.define("g-header", HeaderComponent);

console.log(`Fetched meetupId: ${meetupId}, with type: ${typeof meetupId}`);

/* Prøv å hente meetup data og render på siden */
try {
  const meetupData = await getMeetupById(meetupId);
  renderEventDetails(meetupData);
} catch (error) {
  console.error("Ingen gyldig meetup ID funnet i URL-en.");
  const eventNotFound: HTMLElement | null =
    document.querySelector("#event-not-found");
  if (eventNotFound) {
    eventNotFound.style.display = "block";
  }
}

renderPostForm();

const form =document.querySelector("#new-post-form") as HTMLFormElement;

form.addEventListener(`submit`, async (event) => {
  event.preventDefault();
    let userId = 1; // Placeholder

    const postText = (document.querySelector("#post-text") as HTMLTextAreaElement).value;
    const meetupId = getMeetupidFromURL();
    const newPost: PostsType = {
        id: null,
        meetupId: meetupId,
        userId: userId,
        text: postText,
        likes: 0,
        dislikes: 0,
        comments: [],
        created: new Date().toISOString(),
        updated: new Date().toISOString()
        };

    try {
        await createPost(newPost);
        (document.querySelector("#post-text") as HTMLTextAreaElement).value = "";

    } catch (error) {
        console.error("Feil ved oppretting av post:", error);
    }
});
