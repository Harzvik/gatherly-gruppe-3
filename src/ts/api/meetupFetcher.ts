/*Alex Harsvik*/
import { API_BASE_URL } from "./config";
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
