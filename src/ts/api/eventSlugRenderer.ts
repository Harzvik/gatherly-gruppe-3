import type { MeetupsType } from "../types/meetupType.ts";
import { getMeetupById } from "../api/meetupFetcher.ts";

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const meetupId = Number(urlParams.get("id"));
console.log(meetupId, typeof meetupId);

/* if (meetupId) {
  getMeetupById(meetupId);
} */
