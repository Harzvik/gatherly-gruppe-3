/*Alex Harsvik*/
import { getMeetupById } from "../api/meetupFetcher.ts";
import { renderEventDetails } from "../functions/eventSlugRenderer.ts";
import { HeaderComponent } from "../components/header.ts";
import { renderPostForm } from "../functions/postFormRenderer.ts";

customElements.define("g-header", HeaderComponent);

/* Hent meetup ID fra URL-en */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const meetupId = Number(urlParams.get("id"));

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
