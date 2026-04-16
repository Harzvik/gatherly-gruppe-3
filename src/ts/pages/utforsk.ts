import { CardComponent } from "../components/card.ts";
import { HeaderComponent } from "../components/header.ts";
import { getAllMeetups } from "../api/meetupFetcher.ts";
import { setupCreateModal } from "../functions/modalRenderer.ts";
import type { MeetupsType } from "../types/meetupType.ts";

customElements.define("g-header", HeaderComponent);
customElements.define("g-card", CardComponent);

function renderCards(meetups: MeetupsType[]) {
    const grid = document.getElementById("event-grid");
    if (!grid) return;
    grid.innerHTML = "";

    meetups.forEach(meetup => {
        const card = document.createElement("g-card");
        card.setAttribute("title", meetup.name);
        card.setAttribute("time", meetup.date);
        card.setAttribute("tag", meetup.tags[0] ?? "");
        grid.appendChild(card);
    })
}

async function loadEvents() {
    const meetups = await getAllMeetups();
    renderCards(meetups);
}

loadEvents();

setupCreateModal(renderCards);