/* Eileen Kim */

import { getAllMeetups } from "../api/meetupFetcher";
import { filterUpcomingWeek, filterUpcomingMonth } from "./upcomingFilter";
import type { MeetupsType } from "../types/meetupType";

type RenderCardsFn = (meetups: MeetupsType[]) => void;

export function setupFilterPanel(renderCards: RenderCardsFn): void {
    const panel = document.createElement("div");
    panel.id = "filter-panel";
    panel.classList.add("filter-panel");
    document.body.appendChild(panel);

    panel.innerHTML = `
        <div class="filter-panel-content">
            <button id="filter-panel-close">x</button>

            <h3>Kategorier</h3>
            <div class="filter-panel-tags">
                <button class="tag-btn filter-tag">Teknologi</button>
                <button class="tag-btn filter-tag">Sport</button>
                <button class="tag-btn filter-tag">Håndverk</button>
                <button class="tag-btn filter-tag">Gaming</button>
                <button class="tag-btn filter-tag">Reise</button>
                <button class="tag-btn filter-tag">Helse</button>
                <button class="tag-btn filter-tag">Business</button>
            </div>

            <h3>Tid</h3>
            <div class="filter-panel-time">
                <button class="tag-btn filter-time">Denne uken</button>
                <button class="tag-btn filter-time">Denne måneden</button>
            </div>

            <h3>Pris</h3>
            <div class="filter-panel-price">
                <button class="tag-btn filter-price">Gratis</button>
            </div>
        </div>

    `;

    const filterBtn = document.querySelector(".filter-icon-btn");
    filterBtn?.addEventListener("click", ()=> {
        panel.classList.add("open");
        document.body.classList.add("menu-open");
    });

    document.getElementById("filter-panel-close")?.addEventListener("click", closePanel);
    panel.addEventListener("click", (e)=> {
        if(e.target === panel) closePanel();
    });

    function closePanel() {
        panel.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    document.querySelectorAll(".filter-time").forEach(btn => {
        btn.addEventListener("click", async () => {
            const meetups = await getAllMeetups();
            const text = (btn as HTMLElement).textContent?.trim();

            if (text === "Denne uken") {
                const filtered = filterUpcomingWeek(meetups);
                renderCards(filtered);
            } else if (text === "Denne måneden") {
                const filtered = filterUpcomingMonth(meetups);
                renderCards(filtered);
            }

            closePanel();
        });
    });

}