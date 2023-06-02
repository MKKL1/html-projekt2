// import {Handlebars} from "./lib/handlebars.js";

export function onHomeStart() {
    fillItems();
}

function fillItems() {
    console.log("adc");

    const source = document.getElementById("entry-template").innerHTML;
    Handlebars.registerHelper('stars', function(rating) {
        const stars = '<div class="bi-star-fill"></div>'.repeat(rating);
        return new Handlebars.SafeString(stars);
    });
    const template = Handlebars.compile(source);
    const context = {
        "image_path": "https://i.stack.imgur.com/X6Fiw.png",
        "product_name": "Dupa",
        "product_price": "20.23",
        "standard_price": "50.50",
        "onSale": true
    };
    const html    = template(context);
    $("#homeProducts").append(html);
}