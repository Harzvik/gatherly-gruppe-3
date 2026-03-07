export function renderPostForm() {
  const postsContainer = document.querySelector("#posts-container");
  if (postsContainer) {
    postsContainer.innerHTML = `
            <div class="posts-list"></div>

            <form id="post-form">
                <label for="post-text">Kommenter:</label>
                <textarea id="post-text" placeholder="Skriv din kommentar..." required></textarea>
                <button type="submit">Publiser</button>
            </form>
        `;
  }
}
