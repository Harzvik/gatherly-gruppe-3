/*Alex Harsvik og Eileen Kim*/
import { setCurrentUserId, getCurrentUsername } from "../functions/userManagement";

export class HeaderComponent extends HTMLElement {
    connectedCallback(): void {
        const username = getCurrentUsername();
        
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
                        <li style="position: relative;">
                            <a href="#" class="nav-item" id="login-btn">${username}</a>
                            <ul id="user-switcher-dropdown" class="user-switcher" style="display: none;">
                                <li data-userid="1">User 1</li>
                                <li data-userid="2">User 2</li>
                                <li data-userid="3">User 3</li>
                            </ul>
                        </li>
                    </ul>
                    <button class="hamburger" id="hamburger-btn">
                        <img src="../assets/component_assets/icons/pencil_ham.png" alt="meny">
                    </button>
                </nav>
                <hr class="header-divider">
            </header>
        `;
        this.setActiveLink();
        this.setupHamburger();
        this.setupUserSwitcher();
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
    }

    private setupHamburger(): void {
        const hamburger = this.querySelector("#hamburger-btn");
        const navLinks = this. querySelector(".nav-links");

        hamburger?.addEventListener("click", () => {
            navLinks?.classList.toggle("open");
            document.body.classList.toggle("menu-open");
        });
    }

    private setupUserSwitcher(): void {
        const loginBtn = this.querySelector("#login-btn") as HTMLElement;
        const dropdown = this.querySelector("#user-switcher-dropdown") as HTMLElement;
        const userItems = this.querySelectorAll("#user-switcher-dropdown li");

        loginBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });

        userItems.forEach(item => {
            item.addEventListener("click", () => {
                const userId = item.getAttribute("data-userid");
                if (userId) {
                    setCurrentUserId(parseInt(userId, 10));
                    window.location.reload();
                }
            });
        });
    }
}