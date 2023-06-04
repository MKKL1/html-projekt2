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
    const products = shuffle(Object.keys(itemstorage.items))
    for(let i = 0; i < 8 && i < products.length; i++) {
        let data = itemstorage.items[products[i]];
        data['id'] = products[i];
        $("#homeProducts").append(template(data));
    }

}