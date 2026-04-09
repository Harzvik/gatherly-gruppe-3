/*Alex Harsvik*/
import { getMeetupById } from "../api/meetupFetcher.ts";
import {
  renderEventActionBar,
  renderEventDetails,
} from "../functions/eventSlugRenderer.ts";
import { HeaderComponent } from "../components/header.ts";
import { renderPostForm } from "../functions/postFormRenderer.ts";
import { getMeetupIdFromUrl } from "../functions/getMeetupidFromURL.ts";
import type { CreatePostInput } from "../types/postsType.ts";
import { createPost } from "../api/createPost.ts";
import { renderPostsForMeetup } from "../functions/postRenderer.ts";

const meetupId = getMeetupIdFromUrl();

customElements.define("g-header", HeaderComponent);

/* Prøv å hente meetup data og render på siden */
try {
  const meetupData = await getMeetupById(meetupId);
  renderEventDetails(meetupData);
  renderEventActionBar(meetupData);
  renderPostForm();
  renderPostsForMeetup(meetupId);
} catch (error) {
  console.error("Ingen gyldig meetup ID funnet i URL-en.");
  const eventNotFound: HTMLElement | null =
    document.querySelector("#event-not-found");
  const postsContainer: HTMLElement | null =
    document.querySelector("#posts-container");
  if (eventNotFound) {
    eventNotFound.style.display = "block";
    postsContainer?.remove();
  }
}

const form = document.querySelector("#new-post-form") as HTMLFormElement;

form.addEventListener(`submit`, async (event) => {
  event.preventDefault();
  let userId = 1; // Placeholder

  const postText = (document.querySelector("#post-text") as HTMLInputElement)
    .value;

  const newPost: CreatePostInput = {
    meetupId: meetupId,
    userId: userId,
    postName: "",
    text: postText,
  };

  try {
    await createPost(newPost);
    (document.querySelector("#post-text") as HTMLInputElement).value = "";
    renderPostsForMeetup(meetupId);
  } catch (error) {
    console.error("Feil ved oppretting av post:", error);
  }
});
