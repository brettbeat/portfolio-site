export class ButtonCount extends HTMLElement {
    constructor() {
        super();
        this.count = 0;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `<button id="btnCount">Times Clicked: 0</button>`;
        this.shadowRoot.getElementById("btnCount").addEventListener("click", () => this.increaseCount());
    }

    increaseCount() {
        this.count++;
        this.shadowRoot.getElementById("btnCount").innerHTML = `Times Clicked: ${this.count}`;
    }
}