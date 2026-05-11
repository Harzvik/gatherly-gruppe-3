/* Eileen Kim */

import { openEditModal } from "./editModalRenderer";
import type { MeetupsType } from "../types/meetupType";

type RenderCardsFn = (meetups: MeetupsType[]) => void;

export function setupPreveiwModal(): void {
    const modal = document.createElement("div");
    modal.id = "preview-modal";
    modal.classList.add("modal-overlay", "hidden");
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if(e.target === modal) modal.classList.add("hidden");
    });
}

export function openPreviewModal(meetup: MeetupsType, currentUserId: number, renderCards: RenderCardsFn): void {
    const modal = document.getElementById("preview-modal");
    if(!modal) return;

    modal.innerHTML = `
        <div class="modal-box">
            <button id="modal-close">x</button>

            <div class="modal-layout">
                <div class="modal-left">
                    <h2>${meetup.name}</h2>
                    <p>${meetup.description}</p>
                    <p>📍${meetup.location}</p>
                    <p>📅${meetup.date}</p>

                    ${meetup.userId === currentUserId ? `
                    <button id="edit-btn">Rediger arrangementet</button>
                    <button id="delete-btn">Slett arrangementet</button>`:""}

                    <button id="see-more-btn">Les mer om arrangementet!</button>
                </div>

                <div class="modal-divider"></div>

                <div class="modal-right">
                    <h3>Forhåndsvisning</h3>
                    <div class="preview-card">
                        <img class="card-tape" src="/assets/component_assets/cyan_tape/tape2.webp">
                        <img src="/assets/default_event_img.jpeg" class="card-image"/>
                        <div class="card-description-wrapper">
                            <h4 class="card-title">${meetup.name}</h4>
                            <div class="tag-time-wrapper">
                                <p class="card-tag">${meetup.tags[0] ?? "Tag"}</p>
                                <p class="card-time">${meetup.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.getElementById("see-more-btn")?.addEventListener("click", () => {
            window.location.href= `/arrangement.html?id=${meetup.id}`;
        });

        modal.classList.remove("hidden");

        document.getElementById("modal-close")?.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        document.getElementById("edit-btn")?.addEventListener("click", ()=> {
            openEditModal(meetup, renderCards);
        });
}