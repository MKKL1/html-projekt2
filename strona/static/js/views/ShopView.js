import AbstractView from "./AbstractView.js";
import {onShopStart} from "../shopscript.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Shop");
    }

    getHtml() {
        return fetch("/static/shop.html");
    }

    onStart() {
        onShopStart();
    }
}