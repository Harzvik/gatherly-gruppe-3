/* Eileen Kim */

import type { MeetupsType } from "../types/meetupType";

export async function createMeetup(newMeetupData: Omit<MeetupsType, "id">) {
    const response = await fetch("http://localhost:3000/api/meetups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 676767",
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