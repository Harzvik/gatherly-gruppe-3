/*Alex Harsvik og Eileen Kim*/
export class CardComponent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
        <div class="card">
            <img src="${this.getAttribute("image") || "../assets/default_event_img.jpeg"}" alt="Card Image" class="card-image"/>
            <div class="card-description-wrapper">
                <h2 class="card-title">${this.getAttribute("title") || "Placeholder Event"}</h2>
                <p class="card-tag">${this.getAttribute("tag") || "No Tags"}</p>
                <p class="card-time">${this.getAttribute("time") || "TBA"}</p>
            </div>
        </div>
    `;
  }
}
