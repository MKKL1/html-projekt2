import AbstractView from "./AbstractView.js";
import {onEditStart} from "../editscript.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Edit items");
    }

    getHtml() {
        return fetch("/static/edit.html");
    }

    onStart() {
        onEditStart();
    }
}