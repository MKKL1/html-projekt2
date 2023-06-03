import {ItemStorage} from "./ItemStorage.js";

let itemstorage = null;

export function onShopStart() {
    itemstorage = new ItemStorage();
    Handlebars.registerHelper('starsshop', function(rating) {
        const stars = '<i class="bi-star-fill"></i>'.repeat(rating);
        return new Handlebars.SafeString(stars);
    });

    fillItems();
}

function fillItems() {
    const source = document.getElementById("product-template").innerHTML;
    const template = Handlebars.compile(source);
    const products = Object.keys(itemstorage.items);
    console.log(products);
    for(let i = 0; i < 10 && i < products.length; i++) {
        $("#shopProducts").append(template(itemstorage.items[products[i]]));
    }
}