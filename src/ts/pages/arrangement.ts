import { getMeetupById } from "../api/meetupFetcher.ts";
import { renderEventDetails } from "../functions/eventSlugRenderer.ts";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const meetupId = Number(urlParams.get("id"));

console.log(meetupId, typeof meetupId);

if (meetupId) {
  const meetupData = await getMeetupById(meetupId);
  renderEventDetails(meetupData);
} else {
  console.error("Ingen gyldig meetup ID funnet i URL-en.");
  const eventNotFound: HTMLElement | null =
    document.querySelector("#event-not-found");
  if (eventNotFound) {
    eventNotFound.style.display = "block";
  }
}
