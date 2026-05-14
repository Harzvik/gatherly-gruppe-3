/* Eileen Kim */

import { API_BASE_URL, API_KEY } from "./config";

export async function deleteMeetup(id:number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/meetups/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! Statuskode: ${response.status}`);
    }
};