/*Alex Harsvik*/

import type { MeetupsType } from "../types/meetupType.ts";
import { getCurrentUserId } from "./userManagement.ts";
import { updateMeetup } from "../api/updateMeetup.ts";
import { formatDate } from "./dateFormatter.ts";

export function renderEventDetails(meetupData: MeetupsType) {
  const eventContainer = document.querySelector("#event-container");
  if (eventContainer) {
    eventContainer.innerHTML = `
            <div class="event-info-wrapper">
                <ul id="event-tags">
                    ${meetupData.tags.map((tag) => `<li>${tag}</li>`).join("")}
                </ul>
                <h1 class="event-title">${meetupData.name}</h1>
                <p class="event-creator"><strong>Opprettet av:</strong> User ${meetupData.userId}</p>
                <p class="event-description">${meetupData.description}</p>
            </div>
            <div class="event-details-card">
                <img src="../../../public/assets/component_assets/cyan_tape/tape3.webp" alt="Blå teipbit" class="event-tape"/>
                <div class="event-details-mask">
                    <img src="../../../public/assets/default_event_img.jpeg" alt="${meetupData.name}" class="event-image"/>
                
                    <div class="event-date">
                        <img src="../../../public/assets/component_assets/icons/calender_1.webp" alt="Kalender ikon" class="calender_1"/>
                        <p>${formatDate(meetupData.date)}</p>
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
  if (!eventContainer) return;

  const currentUserId = getCurrentUserId();
  
  const participants = meetupData.participants || [];
  const likedBy = meetupData.likedBy || [];

  const isParticipating = participants.includes(currentUserId);
  const isLiked = likedBy.includes(currentUserId);

  const heartIcon = isLiked 
    ? "../../../public/assets/component_assets/icons/heart_filled.webp" 
    : "../../../public/assets/component_assets/icons/heart_empty.webp";

  eventContainer.innerHTML = `
<div class="event-actions-bar">
                    <div class="event-bar-left">
                        <p>${formatDate(meetupData.date)}</p>
                        <h2 class="event-title-bar">${meetupData.name}</h2>
                    </div>
                    <div class="event-bar-right">
                        <span class="event-price">Gratis</span>
                        <button class="like-event-btn" id="like-btn-${meetupData.id}">
                            <img src="${heartIcon}" alt="Hjerte ikon" class="like-event-img"/>
                        </button>
                        <button class="join-event-btn" id="join-btn-${meetupData.id}">
                            ${isParticipating ? "Meld deg av" : "Bli med!"}
                        </button>
                    </div>
                </div>
                `;

  const likeBtn = document.querySelector(`#like-btn-${meetupData.id}`);
  const joinBtn = document.querySelector(`#join-btn-${meetupData.id}`);

  likeBtn?.addEventListener("click", async () => {
    try {
      if (isLiked) {
        meetupData.likedBy = likedBy.filter(id => id !== currentUserId);
      } else {
        meetupData.likedBy = [...likedBy, currentUserId];
      }
      await updateMeetup(meetupData.id, meetupData);
      renderEventActionBar(meetupData);
    } catch (error) {
      console.error("Feil ved oppdatering av like:", error);
      alert("Kunne ikke oppdatere like.");
    }
  });

  joinBtn?.addEventListener("click", async () => {
    try {
      if (isParticipating) {
        meetupData.participants = participants.filter(id => id !== currentUserId);
      } else {
        meetupData.participants = [...participants, currentUserId];
      }
      await updateMeetup(meetupData.id, meetupData);
      renderEventActionBar(meetupData);
    } catch (error) {
      console.error("Feil ved oppdatering av deltakelse:", error);
      alert("Kunne ikke oppdatere deltakelse.");
    }
  });
}
