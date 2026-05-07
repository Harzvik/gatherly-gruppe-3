/* Eileen Kim */
import { API_BASE_URL, API_KEY } from "./config";
import type { MeetupsType } from "../types/meetupType";

export async function createMeetup(newMeetupData: Omit<MeetupsType, "id">) {
    const response = await fetch(`${API_BASE_URL}/meetups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(newMeetupData),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! Statuskode: ${response.status}`);
    }

    const created: MeetupsType = await response.json();
    console.log("Meetup opprettet:", created);
    return created;
}