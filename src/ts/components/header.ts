export class HeaderComponent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
        <header class="main-header">
            <nav class="nav-container">
                <a href="../index.html" class="logo-wrapper">
                    <img src="../assets/gatherly_logo.png" alt="gatherly-logo"/>
                </a>
                <ul class="nav-links">
                    <li>
                        <a href="../index.html" class="nav-item">Hjem</a>
                    </li>
                    <li>
                        <a href="../utforsk.html" class="nav-item">Utforsk</a>
                    </li>
                    <li>
                        <a href="../kontakt.html" class="nav-item">Kontakt oss</a>
                    </li>
                    <li style="display: none;">
                        <a href="../minSide.html" class="nav-item">Min Side</a>
                    </li>
                    <li>
                        <a href="../loggInn.html" class="nav-item">Logg inn</a>
                    </li>
                </ul>
            </nav>
            <hr class="header-divider">
        </header>
    `;
    this.setActiveLink();
}

private setActiveLink(): void {
    const currentPath = window.location.pathname;
    const navLinks = this.querySelectorAll('.nav-item');
    console.log("current path:", currentPath);

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        console.log("sjekker lenker med href:", href);

        if(href) {
            const cleanHref = href.split('/').pop();
            const cleanPath = currentPath.split('/').pop() || 'index.html';
            
            if(cleanPath === cleanHref) {
                console.log("match! legger til active på:", href);
                link.classList.add('active');
            }
        }
    });
}}

