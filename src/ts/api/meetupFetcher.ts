/*Alex Harsvik*/

import { API_BASE_URL, API_KEY } from "./config";
import type { MeetupsType } from "../types/meetupType";

export async function getMeetupById(id: number) {
  const response = await fetch(`${API_BASE_URL}/meetups/${id}`);
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ved henting av meetup med id ${id}`,
    );
  }
  const meetupData: MeetupsType = await response.json();
  return meetupData;
}

/* Eileen Kim */
export async function getAllMeetups() {
  const response = await fetch("http://localhost:3000/api/meetups", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if(!response.ok) {
      throw new Error(`HTTP Error! Statuskode: ${response.status}`);
  }
  const meetups: MeetupsType[] = await response.json();
  return meetups;
}