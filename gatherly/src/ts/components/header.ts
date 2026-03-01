export class HeaderComponent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
        <header>
            <nav>
            <a href="../index.html">
                <img src="../public/assets/gatherly_logo.png"/>
            </a>
                <li>
                    <ul>
                        <a href="../index.html">Hjem</a>
                    </ul>
                    <ul>
                        <a href="../utforsk.html">Utforsk</a>
                    </ul>
                    <ul>
                        <a href="../kontakt.html">Kontakt oss</a>
                    </ul>
                    <ul style="display: none;">
                        <a href="../minSide.html">Min Side</a>
                    </ul>
                    <ul>
                        <a href="../loggInn.html">Logg inn</a>
                    </ul>
                </li>
            </nav>
        </header>
    `;
  }
}

customElements.define("g-header", HeaderComponent);
