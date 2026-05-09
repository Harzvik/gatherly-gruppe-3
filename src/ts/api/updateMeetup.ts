/* Eileen Kim */

import { API_BASE_URL, API_KEY } from "./config";
import type { MeetupsType } from "../types/meetupType";

export async function updateMeetup(id: number, updatedData: Omit<MeetupsType, "id">){
    const response = await fetch(`${API_BASE_URL}/meetups/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(updatedData),
    });

    if(!response.ok) {
        throw new Error(`HTTP Error! Statuskode: ${response.status}`);
    }

    const updated: MeetupsType = await response.json();
    console.log("Meetup oppdatert:", updated);
    return updated;
}