import { CardComponent } from "../components/card.ts";
import { HeaderComponent } from "../components/header.ts";
import { getAllMeetups } from "../api/meetupFetcher.ts";
import { setupCreateModal } from "../functions/modalRenderer.ts";
import { setupPreveiwModal, openPreviewModal } from "../functions/previewModalRenderer.ts";
import { setupFilterPanel } from "../functions/filterPanelRenderer.ts";
import { setupUpcomingFilter } from "../functions/upcomingFilter.ts";
import type { MeetupsType } from "../types/meetupType.ts";

customElements.define("g-header", HeaderComponent);
customElements.define("g-card", CardComponent);

const currentUserId = 1;

function renderCards(meetups: MeetupsType[]) {
    const grid = document.getElementById("event-grid");
    if (!grid) return;
    grid.innerHTML = "";

    meetups.forEach(meetup => {
        const card = document.createElement("g-card");
        card.setAttribute("title", meetup.name);
        card.setAttribute("time", meetup.date);
        card.setAttribute("tag", meetup.tags[0] ?? "");

        card.addEventListener("click", () => {
            openPreviewModal(meetup, currentUserId, renderCards);
        });

        card.style.cursor = "pointer";
        grid.appendChild(card);
    })

}

async function setupTagFilters() {
    const meetups = await getAllMeetups();
    const tagBtns = document.querySelectorAll(".tag-btn");

    tagBtns.forEach(button => {
        button.addEventListener("click", (e) => {
            const tag = (e.target as HTMLElement).textContent?.trim() ?? "";

            if(button.classList.contains("active")) {
                button.classList.remove("active");
                renderCards(meetups);
                return;
            }

            tagBtns.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            const filtered = meetups.filter(meetup => meetup.tags.includes(tag));
            renderCards(filtered);
        })
    })

} 

function setupExpandBtn() {
    const expandBtn = document.getElementById("expandBtn");
    const tagContainer = document.getElementById("tagContainer");
    
    expandBtn?.addEventListener("click", ()=> {
        tagContainer?.classList.toggle("expanded");
        expandBtn.classList.toggle("active");
    }); 
}

async function loadEvents() {
    const meetups = await getAllMeetups();
    renderCards(meetups);
}

loadEvents();
setupCreateModal(renderCards, currentUserId);
setupTagFilters();
setupPreveiwModal();
setupUpcomingFilter(renderCards);
setupExpandBtn();
setupFilterPanel(renderCards);
