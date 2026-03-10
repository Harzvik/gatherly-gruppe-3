/*Alex Harsvik*/
import type { MeetupsType } from "../types/meetupType.ts";

export async function renderEventDetails(meetupData: MeetupsType) {
  const eventContainer = document.querySelector("#event-container");
  if (eventContainer) {
    eventContainer.innerHTML = `
            <ul>
                ${meetupData.tags.map((tag) => `<li>${tag}</li>`).join("")}
            </ul>
            <h1 class="event-title">${meetupData.name}</h1>
            <p class="event-description">${meetupData.description}</p>
            <div class="event-details-card">
                <img src="" alt="${meetupData.name}" class="event-image"/>
                <p><strong>Dato:</strong> ${meetupData.date}</p>
                <p><strong>Sted:</strong> ${meetupData.location}</p>
            </div>
            <button class="join-event-btn">Meld deg på</button>

        `;
  }
}
