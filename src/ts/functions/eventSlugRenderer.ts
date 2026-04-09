/*Alex Harsvik*/
import type { MeetupsType } from "../types/meetupType.ts";

export function renderEventDetails(meetupData: MeetupsType) {
  const eventContainer = document.querySelector("#event-container");
  if (eventContainer) {
    eventContainer.innerHTML = `
            <div class="event-info-wrapper">
                <ul id="event-tags">
                    ${meetupData.tags.map((tag) => `<li>${tag}</li>`).join("")}
                </ul>
                <h1 class="event-title">${meetupData.name}</h1>
                <p class="event-creator"><strong>Opprettet av:</strong> Placeholder bruker </p>
                <p class="event-description">${meetupData.description}</p>
            </div>
            <div class="event-details-card">
                <img src="../../../public/assets/component_assets/cyan_tape/tape3.webp" alt="Blå teipbit" class="event-tape"/>
                <div class="event-details-mask">
                    <img src="../../../public/assets/default_event_img.jpeg" alt="${meetupData.name}" class="event-image"/>
                
                    <div class="event-date">
                        <img src="../../../public/assets/component_assets/icons/calender_1.webp" alt="Kalender ikon" class="calender_1"/>
                        <p>${meetupData.date}</p>
                    </div>
                    <div class="event-location">
                        <img src="../../../public/assets/component_assets/icons/location.webp" alt="Sted ikon" class="location_1"/>
                        <p>${meetupData.location}</p>
                    </div>
                </div>
            </div>

        `;
  }
}

export function renderEventActionBar(meetupData: MeetupsType) {
  const eventContainer = document.querySelector("#event-action-bar");
  if (eventContainer) {
    eventContainer.innerHTML = `
<div class="event-actions-bar">
                    <div class="event-bar-left">
                        <p>${meetupData.date}</p>
                        <h2 class="event-title-bar">${meetupData.name}</h2>
                    </div>
                    <div class="event-bar-right">
                        <span class="event-price">Gratis</span>
                        <button class="like-event-btn">
                            <img src="../../../public/assets/component_assets/icons/heart_empty.webp" alt="Hjerte ikon" class="like-event-img"/>
                        </button>
                        <button class="join-event-btn">Bli med!</button>
                    </div>
                </div>
                `;
  }
}
