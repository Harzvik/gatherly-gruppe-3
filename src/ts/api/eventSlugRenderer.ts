import { getMeetupById } from "../api/meetupFetcher.ts";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const meetupId = Number(urlParams.get("id"));

console.log(meetupId, typeof meetupId);

if (meetupId) {
  getMeetupById(meetupId);
} else {
  console.error("Ingen gyldig meetup ID funnet i URL-en.");
}
