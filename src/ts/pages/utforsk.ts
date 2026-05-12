import { CardComponent } from "../components/card.ts";
import { HeaderComponent } from "../components/header.ts";
import { getAllMeetups } from "../api/meetupFetcher.ts";
import { setupCreateModal } from "../functions/modalRenderer.ts";
import { setupPreveiwModal, openPreviewModal } from "../functions/previewModalRenderer.ts";
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

function filterUpcomingWeek(meetups: MeetupsType[]): MeetupsType[] {
    const today = new Date();
    const nextweek = new Date();
    
    nextweek.setDate(today.getDate() + 7);

    return meetups.filter(meetup => {
        const meetupDate = new Date(meetup.date);
        return meetupDate >= today && meetupDate <= nextweek;
    });
}

async function setupUpcomingFilter() {
    const meetups = await getAllMeetups();
    const upcomingBtn = document.querySelector(".dropdown-btn");

    upcomingBtn?.addEventListener("click", async () => {
        const meetups = await getAllMeetups();

        if(upcomingBtn?.classList.contains("active")) {
            upcomingBtn.classList.remove("active");
            renderCards(meetups);
        } else {
            upcomingBtn?.classList.add("active");
            const filtered = filterUpcomingWeek(meetups);
            renderCards(filtered);
        }
    });
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
setupUpcomingFilter();
setupExpandBtn();
