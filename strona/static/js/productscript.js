import {ItemStorage} from "./ItemStorage.js";

let itemstorage = null;

export function onProductStart(id) {
    itemstorage = new ItemStorage();
    Handlebars.registerHelper('stars', function(rating) {
        const stars = '<div class="bi-star-fill"></div>'.repeat(rating);
        return new Handlebars.SafeString(stars);
    });
    fillProduct(id);
    fillRelated(id);
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
function fillProduct(id) {
    const source = document.getElementById("product-section-template").innerHTML;
    const template = Handlebars.compile(source);
    let productData = itemstorage.getItem(id);
    if(productData === undefined) console.log('404');
    productData['id'] = id;
    $('#productSection').html(template(productData));
}

function fillRelated(id) {
    const source = document.getElementById("related-product-template").innerHTML;
    const template = Handlebars.compile(source);
    const products = shuffle(Object.keys(itemstorage.items))
    let j = 0;
    let i = 0;
    while(j < products.length && i < 4) {
        const _id = products[j];
        j++;
        if(_id === id) continue;
        i++;
        let data = itemstorage.items[_id];
        data['id'] = _id;
        $("#relatedProducts").append(template(data));
    }
}