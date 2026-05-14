/*Alex Harsvik*/

export function renderPostForm() {
  const postsContainer = document.querySelector("#posts-container");
  if (postsContainer) {
    postsContainer.innerHTML = `
            <form id="new-post-form">
                <label for="post-text">Kommenter:</label>
                <input type="text" id="post-text" placeholder="Skriv din kommentar..." required></input>
                <button type="submit">Publiser</button>
            </form>

            <div class="posts-list"></div>
        `;
  }
}
