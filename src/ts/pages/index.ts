/* bruk disse til å importere alle funkjsoner og komponenter for hver side  */
import { CardComponent } from "../components/card.ts";
import { HeaderComponent } from "../components/header.ts";
import { getAllMeetups } from "../api/meetupFetcher.ts";
import { getCurrentUserId, getCurrentUsername } from "../functions/userManagement.ts";
import { formatDate } from "../functions/dateFormatter.ts";

customElements.define("g-header", HeaderComponent);
customElements.define("g-card", CardComponent);

async function renderUserDashboard() {
  const currentUserId = getCurrentUserId();
  const userName = getCurrentUsername();
  
  const welcomeMessage = document.getElementById("welcome-message");
  if (welcomeMessage) {
    if (currentUserId === 0) {
      welcomeMessage.textContent = "Velkommen til Gatherly!";
    } else {
      welcomeMessage.textContent = `Velkommen tilbake, ${userName}!`;
    }
  }

  const allMeetups = await getAllMeetups();

  const joinedGrid = document.getElementById("joined-events-grid");
  const likedGrid = document.getElementById("liked-events-grid");

  if (!joinedGrid || !likedGrid) return;

  const joinedMeetups = allMeetups.filter(m => m.participants && m.participants.includes(currentUserId));
  const likedMeetups = allMeetups.filter(m => m.likedBy && m.likedBy.includes(currentUserId));

  joinedGrid.innerHTML = "";
  likedGrid.innerHTML = "";

  if (joinedMeetups.length === 0) {
    joinedGrid.innerHTML = "<p class='empty-state-message'>Du har ikke meldt deg på noen arrangementer enda.</p>";
  } else {
    joinedMeetups.forEach(meetup => {
      const card = document.createElement("g-card");
      card.setAttribute("title", meetup.name);
      card.setAttribute("time", formatDate(meetup.date));
      card.setAttribute("tag", meetup.tags[0] ?? "");
      card.classList.add("clickable-card");
      
      card.addEventListener("click", () => {
        window.location.href = `/arrangement.html?id=${meetup.id}`;
      });
      
      joinedGrid.appendChild(card);
    });
  }
  
  if (likedMeetups.length === 0) {
    likedGrid.innerHTML = "<p class='empty-state-message'>Du har ikke noen lagrede arrangementer.</p>";
  } else {
    likedMeetups.forEach(meetup => {
      const card = document.createElement("g-card");
      card.setAttribute("title", meetup.name);
      card.setAttribute("time", formatDate(meetup.date));
      card.setAttribute("tag", meetup.tags[0] ?? "");
      card.classList.add("clickable-card");

      card.addEventListener("click", () => {
        window.location.href = `/arrangement.html?id=${meetup.id}`;
      });
      
      likedGrid.appendChild(card);
    });
  }
}

renderUserDashboard();

