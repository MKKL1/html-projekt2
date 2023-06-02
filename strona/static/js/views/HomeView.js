import AbstractView from "./AbstractView.js";
import {onHomeStart} from "../homescript.js";

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