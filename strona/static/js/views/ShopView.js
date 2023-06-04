import AbstractView from "./AbstractView.js";
import {onShopStart} from "../shopscript.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.page = params.page || 0;
        this.setTitle("Shop");
    }

    getHtml() {
        return fetch("/static/shop.html");
    }

    onStart() {
        onShopStart(this.page);
    }
}