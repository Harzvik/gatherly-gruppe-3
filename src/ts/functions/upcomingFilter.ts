/* Eileen Kim */

import { getAllMeetups } from "../api/meetupFetcher";
import type { MeetupsType } from "../types/meetupType";

type RenderCardsFn = (meetups: MeetupsType[]) => void;

export async function setupUpcomingFilter(renderCards: RenderCardsFn): Promise<void> {
    const upcomingBtn = document.querySelector(".dropdown-btn");

    upcomingBtn?.addEventListener("click", async() => {
        const meetups = await getAllMeetups();

        if(upcomingBtn.classList.contains("active")) {
            upcomingBtn.classList.remove("active");
            renderCards(meetups);
        }else {
            upcomingBtn.classList.add("active");
            const filtered = filterUpcomingWeek(meetups);
            renderCards(filtered);
        };
    });
}

export function filterUpcomingWeek(meetups: MeetupsType[]): MeetupsType[] {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return meetups.filter(meetup => {
        const meetupDate = new Date(meetup.date);
        return meetupDate >= today && meetupDate <= nextWeek;
    });
}

export function filterUpcomingMonth(meetups: MeetupsType[]): MeetupsType[] {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    return meetups.filter(meetup => {
        const meetupDate = new Date(meetup.date);
        return meetupDate >= today && meetupDate <= nextMonth;
    });
}