/*Alex Harsvik og Eileen Kim*/
export class HeaderComponent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
        <header>
            <nav>
            <a href="../index.html">
                <img src="/assets/gatherly_logo.png"/>
            </a>
                <ul>
                    <li>
                        <a href="../index.html">Hjem</a>
                    </li>
                    <li>
                        <a href="../utforsk.html">Utforsk</a>
                    </li>
                    <li>
                        <a href="../kontakt.html">Kontakt oss</a>
                    </li>
                    <li style="display: none;">
                        <a href="../minSide.html">Min Side</a>
                    </li>
                    <li>
                        <a href="../loggInn.html">Logg inn</a>
                    </li>
                </ul>
            </nav>
        </header>
    `;
  }
}
