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

customElements.define("g-header", HeaderComponent);

function renderNotFoundState() {
  const eventNotFound: HTMLElement | null =
    document.querySelector("#event-not-found");
  const postsContainer: HTMLElement | null =
    document.querySelector("#posts-container");

  if (eventNotFound) {
    eventNotFound.style.display = "block";
  }
  postsContainer?.remove();
}

async function loadMeetupAndRender(meetupId: number): Promise<boolean> {
  /* Prøv å hente meetup data og render på siden */
  try {
    const meetupData = await getMeetupById(meetupId);
    renderEventDetails(meetupData);
    renderEventActionBar(meetupData);
    renderPostForm();
    await renderPostsForMeetup(meetupId);
    return true;
  } catch (error) {
    console.error("Ingen gyldig meetup ID funnet i URL-en.");
    renderNotFoundState();
    return false;
  }
}

function setupPostFormSubmit(meetupId: number): void {
  const form = document.querySelector("#new-post-form");
  if (!(form instanceof HTMLFormElement)) {
    console.error("Fant ikke post-skjemaet på siden.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = 1; // Placeholder

    const postText = (document.querySelector("#post-text") as HTMLInputElement)
      .value;

    const newPost: CreatePostInput = {
      meetupId,
      userId,
      postName: "",
      text: postText,
    };

    try {
      await createPost(newPost);
      (document.querySelector("#post-text") as HTMLInputElement).value = "";
      await renderPostsForMeetup(meetupId);
    } catch (error) {
      console.error("Feil ved oppretting av post:", error);
    }
  });
}

async function initArrangementPage(): Promise<void> {
  const meetupId = getMeetupIdFromUrl();
  if (meetupId === null) {
    renderNotFoundState();
    return;
  }

  const meetupLoaded = await loadMeetupAndRender(meetupId);
  if (!meetupLoaded) {
    return;
  }

  setupPostFormSubmit(meetupId);
}

await initArrangementPage();
