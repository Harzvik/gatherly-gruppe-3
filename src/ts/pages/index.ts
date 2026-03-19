/* bruk disse til å importere alle funkjsoner og komponenter for hver side  */
import { CardComponent } from "../components/card.ts";
import { HeaderComponent } from "../components/header.ts";

customElements.define("g-header", HeaderComponent);
customElements.define("g-card", CardComponent);
