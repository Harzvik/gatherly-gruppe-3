/*Alex Harsvik*/
import type { MeetupsType } from "../types/meetupType";

export async function getMeetupById(id: number) {
  const response = await fetch(`http://localhost:3000/api/meetups/${id}`);
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
  const response = await fetch("http://localhost:3000/api/meetups");
  if(!response.ok) {
      throw new Error(`HTTP Error! Statuskode: ${response.status}`);
  }
  const meetups: MeetupsType[] = await response.json();
  return meetups;
}