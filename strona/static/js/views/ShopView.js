import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    getHtml() {
        return fetch("/static/home.html");
    }

    onStart() {
        onHomeStart();
    }
}