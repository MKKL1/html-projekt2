// import {Handlebars} from "./lib/handlebars.js";
import {ItemStorage} from "./ItemStorage.js";

let itemstorage = null;

export function onHomeStart() {
    itemstorage = new ItemStorage();
    fillItems();
}

function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

function fillItems() {

    const source = document.getElementById("entry-template").innerHTML;
    Handlebars.registerHelper('stars', function(rating) {
        const stars = '<div class="bi-star-fill"></div>'.repeat(rating);
        return new Handlebars.SafeString(stars);
    });
    const template = Handlebars.compile(source);
    console.log(itemstorage.items);
    console.log(Object.keys(itemstorage.items));
    const products = shuffle(Object.keys(itemstorage.items))
    console.log(products);
    for(let i = 0; i < 10 && i < products.length; i++) {

        $("#homeProducts").append(template(itemstorage.items[products[i]]));
    }

}