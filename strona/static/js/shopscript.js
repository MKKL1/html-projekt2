import {ItemStorage} from "./ItemStorage.js";

const itemsPerPage = 5;

let itemstorage = null;
let itemCount = 0;
let pageCount = 0;

export function onShopStart(page) {
    itemstorage = new ItemStorage();
    itemCount = Object.keys(itemstorage.items).length;
    pageCount = Math.ceil(itemCount/itemsPerPage);
    Handlebars.registerHelper('starsshop', function(rating) {
        const stars = '<i class="bi-star-fill"></i>'.repeat(rating);
        return new Handlebars.SafeString(stars);
    });

    const intpage = parseInt(page);
    fillPagination(intpage);
    fillItems(intpage);
}

function fillPagination(intpage) {
    const pagination = $('#shopPagination');
    if(intpage > 0) pagination.append(`<li class="page-item"><a class="page-link" href="/shop/${intpage-1}">Poprzednia</a></li>`);
    else pagination.append(`<li class="page-item disabled"><a class="page-link" >Poprzednia</a></li>`);
    const firstPage = (intpage-5 > 0) ? intpage-5 : 0;
    const lastPage = (firstPage+10 > (pageCount-1)) ? pageCount-1 : firstPage+10
    for(let i = firstPage; i <= lastPage; i++) {
        if(i === parseInt(intpage)) pagination.append(`<li class="page-item active"><a class="page-link" href="/shop/${i}">${i+1}</a></li>`);
        else pagination.append(`<li class="page-item"><a class="page-link" href="/shop/${i}">${i+1}</a></li>`);
    }
    if(intpage < pageCount-1) pagination.append(`<li class="page-item"><a class="page-link" href="/shop/${intpage+1}">Następna</a></li>`);
    else pagination.append(`<li class="page-item disabled"><a class="page-link" >Następna</a></li>`);
}

function fillItems(page) {
    const source = document.getElementById("product-template").innerHTML;
    const template = Handlebars.compile(source);
    const products = Object.keys(itemstorage.items);
    for(let i = page*5; i < (page+1)*5 && i < products.length; i++) {
        let data = itemstorage.items[products[i]];
        data['id'] = products[i]
        $("#shopProducts").append(template(data));
    }
}