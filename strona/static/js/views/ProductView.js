import AbstractView from "./AbstractView.js";
import {onProductStart} from "../productscript.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.id = params.id;
        this.setTitle("Product");
    }

    getHtml() {
        return fetch("/static/product.html");
    }

    onStart() {
        onProductStart(this.id);
    }
}