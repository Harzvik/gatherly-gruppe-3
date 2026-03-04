export function renderPostForm() {
    const postsContainer = document.querySelector("#posts-container");
    if (postsContainer) {
        postsContainer.innerHTML = `
            <div class="posts-list"></div>

            <form id="post-form">
                <label for="post-name">Tittel:</label>
                <input type="text" id="post-name" placeholder="Skriv en tittel" required />
                <label for="post-text">Innlegg:</label>
                <textarea id="post-text" placeholder="Skriv inn ditt innlegg..." required></textarea>
                <button type="submit">Publiser</button>
            </form>
        `
    }