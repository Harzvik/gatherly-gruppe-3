import type { MeetupsType } from "../types/meetupType";

export async function getMeetupById(id: number) {
    const response = await fetch(`http://localhost:3000/api/meetups/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ved henting av meetup med id ${id}`);
    }
    const meetup: MeetupsType = await response.json();
    return meetup;
}