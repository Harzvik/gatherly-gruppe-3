/* Eileen Kim */

import { updateMeetup } from "../api/updateMeetup";
import { getAllMeetups } from "../api/meetupFetcher";
import type { MeetupsType } from "../types/meetupType";

type RenderCardsFn = (meetups: MeetupsType[]) => void;

export function openEditModal(meetup: MeetupsType, renderCards: RenderCardsFn) {
    const modal = document.getElementById("preview-modal");
    if (!modal) return;

    modal.innerHTML = `
    <div class="modal-box">
        <button id="modal-close">x</button>

        <div class="modal-layout">
            <div class="modal-left">
                <h2>Rediger arrangement!</h2>

                <div class="modal-form">
                    <label>Tittel</label>
                    <input type="text" id="edit-title" value="${meetup.name}">

                    <label>Beskrivelse</label>
                    <textarea id="edit-description" rows="4">${meetup.description}</textarea>

                    <label>Sted</label>
                    <input type="text" id="edit-location" value="${meetup.location}">

                    <label>Dato</label>
                    <input type="date" id="edit-date" value="${meetup.date}">

                    <p class="modal-error hidden" id="edit-error"></p>

                    <button id="edit-submit">Lagre endringer!</button>
                </div>
            </div>

            <div class="modal-divider"></div>

            <div class="modal-right">
                <h3>Forhåndsvisning</h3>
                <div class="preview-card">
                    <img class="card-tape" src="/assets/component_assets/cyan_tape/tape2.webp">
                    <img src="/assets/default_event_img.jpeg" class="card-image"/>
                    <div class="card-description-wrapper">
                        <h4 class="card-title" id="edit-preview-title">${meetup.name}</h4>
                        <div class="tag-time-wrapper">
                            <p class="card-tag" id="edit-preview-tag">${meetup.tags[0] ?? "Tag"}</p>
                            <p class="card-time" id="edit-preview-time">${meetup.date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    modal.classList.remove("hidden");

    document.getElementById("edit-close")?.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    document.getElementById("edit-title")?.addEventListener("input", (e) => {
        const val = (e.target as HTMLInputElement).value;
        const preview = document.getElementById("edit-preview-title");
        if (preview) preview.textContent = val || meetup.name;
    });

    document.getElementById("edit-date")?.addEventListener("input", (e) => {
        const val = (e.target as HTMLInputElement).value;
        const preview = document.getElementById("edit-preview-time");
        if (preview) preview.textContent = val || meetup.date;
    });

    document.getElementById("edit-submit")?.addEventListener("click", async () => {
        const name = (document.getElementById("edit-title") as HTMLInputElement).value.trim();
        const description = (document.getElementById("edit-description") as HTMLTextAreaElement).value.trim();
        const location = (document.getElementById("edit-location") as HTMLInputElement).value.trim();
        const date = (document.getElementById("edit-date") as HTMLInputElement).value;

        if(!name || !description || !location || !date){
            const errorEl = document.getElementById("edit-error");
            errorEl?.classList.remove("hidden");
            errorEl!.textContent = "Fyll ut alle obligatoriske felt!";
            return;
        }

        try{
            await updateMeetup(meetup.id, {
                name,
                description,
                location,
                date,
                tags: meetup.tags,
                userId: meetup.userId,
                created: meetup.created,
                updated: new Date().toISOString(),
                participants: meetup.participants??[],
                likedBy: meetup.likedBy??[],
            });

            modal.classList.add("hidden");

            const meetups = await getAllMeetups();
            renderCards(meetups);
        } catch(error) {
            console.error("Feil ved oppdatering:", error);

            const errorEl = document.getElementById("edit-error");
            errorEl?.classList.remove("hidden");
            errorEl!.textContent = "Noe gikk galt, prøv igjen senere!";
        }
    });
}