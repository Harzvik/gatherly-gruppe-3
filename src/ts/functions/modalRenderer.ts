/* Eileen Kim */
import { createMeetup } from "../api/createMeetup";
import { getAllMeetups } from "../api/meetupFetcher";
import type { MeetupsType } from "../types/meetupType";

type RenderCardsFn = (meetups: MeetupsType[]) => void;

export function setupCreateModal(renderCards: RenderCardsFn, currentUserId: number): void {
    // Lager først div og legger den i body. Den starter som "hidden".
    const modal = document.createElement("div");
    modal.id = "create-modal";
    modal.classList.add("modal-overlay", "hidden");

    document.body.appendChild(modal);

    modal.innerHTML = `
        <div class="modal-box">
            <button id="modal-close">x</button>

            <div class="modal-layout">
                <div class="modal-left">
                    <h2>Opprett arrangement!</h2>

                    <div class="modal-form">
                        <label>Tittel</label>
                        <input type="text" id="modal-title" placeholder="Tittel på arrangementet ...">

                        <label>Tags</label>
                        <select id="tag-select">
                            <option value="">-- Vennligst velg en tag -- </option>
                            <option value="Teknologi">Teknologi</option>
                            <option value="Sport">Sport</option>
                            <option value="Håndverk">Håndverk</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Reise">Reise</option>
                            <option value="Helse">Helse</option>
                            <option value="Business">Business</option>

                        </select>
        
                        <label>Beskrivelse</label>
                        <textarea id="modal-description" rows="4"></textarea>
        
                        <label>Sted</label>
                        <input type="text" id="modal-location" placeholder="F.eks. GatherlyVeien 13">
        
                        <label>Dato</label>
                        <input type="date" id="modal-date">
        
                        <p class="modal-error hidden" id="modal-error"></p>
        
                        <button id="modal-submit">Opprett!</button>
                    </div>
                </div>

                <div class="modal-divider"></div>

                <div class="modal-right">
                    <h3>Forhåndsvisning</h3>
                    <div class="preview-card">
                        <img class="card-tape" src="/assets/component_assets/cyan_tape/tape2.webp">
                        <img src="/assets/default_event_img.jpeg" class="card-image"/>

                        <div class="card-description-wrapper">
                            <h4 class="card-title" id="preview-title">Tittel på arrangementet</h4>
                            <div class="tag-time-wrapper">
                                <p class="card-tag" id="preview-tag">Tag</p>
                                <p class="card-time" id="preview-time">Dato</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("modal-title")?.addEventListener("input", (e) => {
        const val = (e.target as HTMLInputElement).value;
        const preview = document.getElementById("preview-title");
        if (preview) {
            preview.textContent = val || "Tittel på arrangementet";
        }
    });
    
    document.getElementById("modal-date")?.addEventListener("input", (e) => {
        const val = (e.target as HTMLInputElement).value;
        const preview = document.getElementById("preview-time");
        if (preview) {
            preview.textContent = val || "Dato";
        }
    });

    document.getElementById("tag-select")?.addEventListener("change", (e) => {
        const val = (e.target as HTMLSelectElement).value;
        const preview = document.getElementById("preview-tag");
        if (preview) {
            preview.textContent = val || "Tag";
        }
    });

    document.getElementById("modal-submit")?.addEventListener("click", async() => {
        const name = (document.getElementById("modal-title") as HTMLInputElement).value.trim();
        const description = (document.getElementById("modal-description") as HTMLTextAreaElement).value.trim();
        const location = (document.getElementById("modal-location") as HTMLInputElement).value;
        const date = (document.getElementById("modal-date") as HTMLInputElement).value;
        const chosentag = (document.getElementById("tag-select") as HTMLSelectElement).value;
        const tags = [chosentag];
        
        if (!name || !description || !location || !date || !chosentag) {
            const errorAlarm = document.getElementById("modal-error");
            errorAlarm?.classList.remove("hidden");
            errorAlarm!.textContent = "Fyll ut alle obligatoriske felt!";
            return;            
        }

        try {
            await createMeetup({
                name,
                description,
                location,
                date,
                tags,
                userId: currentUserId,
                created: new Date().toISOString(),
                updated: new Date().toISOString()
            });

            closeModal();

            const meetups = await getAllMeetups();
            renderCards(meetups);
        } catch(error) {
            console.error("Feil ved oppretting:", error);
            const errorAlarm = document.getElementById("modal-error");
            errorAlarm?.classList.remove("hidden");
            errorAlarm!.textContent = "Noe gikk galt her, prøv igjen!";
        }
    });


    const openBtn = document.querySelector(".sticky-addBtn");
    openBtn?.addEventListener("click", ()=> {
        modal.classList.remove("hidden");
    });

    function closeModal() {
        modal.classList.add("hidden");
        document.getElementById("modal-error")?.classList.add("hidden");
    }

    document.getElementById("modal-close")?.addEventListener("click", closeModal);

    modal.addEventListener("click", (e)=> {
        if (e.target === modal) closeModal();
    });
}

