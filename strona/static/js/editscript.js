import {Przedmiot} from "./Product.js";
import {ItemStorage} from "./ItemStorage.js";

let edit = false;
let currentEditedUUID = '';

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
let items = null;
let itemstorage = null;
export function onEditStart() {

    itemstorage = new ItemStorage();

    $('#product_add_form').on('submit', function(event) {
        event.preventDefault();
        console.log("here");
        if(!checkInputs()) return false;
        console.log("here2");

        let data = {}
        const formdata = new FormData(event.target);
        let przedmiot = new Przedmiot();
        przedmiot.product_name = formdata.get('product_name');
        if(formdata.get('product_desc') !== '')
            przedmiot.product_desc = formdata.get('product_desc');

        if(formdata.get('product_sale_price') !== '') {
            przedmiot.before_sale_price = parseFloat(formdata.get('product_price')).toFixed(2);
            przedmiot.product_price = parseFloat(formdata.get('product_sale_price')).toFixed(2);
            przedmiot.onSale = true;
        } else {
            przedmiot.product_price = parseFloat(formdata.get('product_price')).toFixed(2);
            przedmiot.onSale = false;
        }

        if(formdata.get('product_rating') !== '')
            przedmiot.product_rating = parseInt(formdata.get('product_rating'));

        if(formdata.get('product_image') !== '')
            przedmiot.product_image = formdata.get('product_image');

        console.log(przedmiot);

        if(edit) itemstorage.editItem(currentEditedUUID, przedmiot);
        else itemstorage.addItem(przedmiot);

        itemstorage.saveToLocalStorage();
        fillItems();
        closeModal();
        return false;
    });
    fillItems();
}

function checkInputs() {
    let valid = true;

    const productNameInput = document.getElementById('formProductName');
    const productPriceInput = document.getElementById('formProductPrice');
    const productImageInput = document.getElementById('formProductImage');
    const productSaleInput = document.getElementById('formProductSale');
    const productRatingInput = document.getElementById('formProductRating');

    const productNameValue = productNameInput.value.trim();
    const productPriceValue = productPriceInput.value;
    const productImageValue = productImageInput.value.trim();
    const productSaleValue = productSaleInput.value;
    const productRatingValue = productRatingInput.value;

    if(productNameValue === '') {
        setErrorFor(productNameInput, 'Nazwa nie może być pusta');
        valid = false;
    } else setSuccessFor(productNameInput);

    if(productPriceValue === '') {
        setErrorFor(productPriceInput, 'Podaj cenę');
        valid = false;
    } else {
        const priceNumber = parseFloat(productPriceValue);
        if(isNaN(priceNumber) || priceNumber < 0) {
            setErrorFor(productPriceInput, 'Niewłaściwa liczba');
            valid = false;
        } else setSuccessFor(productPriceInput);
    }

    if(productSaleValue !== '') {
        const priceNumber = parseFloat(productSaleValue);
        if(isNaN(priceNumber) || priceNumber < 0) {
            setErrorFor(productSaleInput, 'Niewłaściwa liczba');
            valid = false;
        } else setSuccessFor(productSaleInput);
    }

    if(productRatingValue !== '') {
        const priceNumber = parseInt(productRatingValue);
        if(isNaN(priceNumber) || !(priceNumber <= 5 && priceNumber > 0)) {
            setErrorFor(productRatingInput, 'Niewłaściwa liczba');
            valid = false;
        } else setSuccessFor(productRatingInput);
    }

    if(productImageValue !== '') {
        if(!imageReg.test(productImageValue)) {
            setErrorFor(productImageInput, 'Niewłaściwe rozszerzenie pliku');
            valid = false;
        } else setSuccessFor(productImageInput);
    }


    return valid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function resetError(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control';
}

function resetAllErrors() {
    $('#product_add_form .form-control').each(function () {
        $(this).attr('class', 'form-control');
    })
}

function fillItems() {
    const template = Handlebars.compile(document.getElementById("listproduct-template").innerHTML);
    const productsDiv = $('#products');
    productsDiv.html('');
    for(const [key, value] of Object.entries(itemstorage.items)) {
        const context = value;
        context['id'] = key;
        productsDiv.append(template(context));
    }
}

function resetForm() {
    resetAllErrors();
    $('#product_add_form input').each(function () {
        $(this).attr('value', '');
    });
    $('#product_add_form textarea').each(function () {
        console.log('clear textarea');
        $(this).html('');
        $(this).attr('value', '');
    });
}

function removeItem(uuid) {
    itemstorage.removeItem(uuid);
    itemstorage.saveToLocalStorage();
    fillItems();
}

function editItem(uuid) {
    resetForm();

    edit = true;
    currentEditedUUID = uuid;

    $('#addItemModalLabel').html('Edytuj przedmiot');

    const product = itemstorage.getItem(uuid);
    $('#formProductName').attr('value', product.product_name);
    const prodprice = $('#formProductPrice');
    if(product.onSale) {
        prodprice.attr('value', product.before_sale_price || '');
        $('#formProductSale').attr('value', product.product_price || '');
    } else {
        prodprice.attr('value', product.product_price);
    }
    $('#formProductDesc').html(product.product_desc || '');
    $('#formProductRating').attr('value', product.product_rating || '');
    $('#formProductImage').attr('value', product.product_image || '');

    console.log(product);
    $('#addItemModal').modal('show');
}

function showAddItem() {
    resetForm();

    $('#addItemModalLabel').html('Dodaj przedmiot');
    edit = false;
    $('#addItemModal').modal('show');
}

function closeModal() {
    $('#addItemModal').modal('hide');
}

function verifyForm() {
    $('#product_add_form #formProductName')
}

window.editItem = editItem;
window.removeItem = removeItem

window.showAddItem = showAddItem
window.closeModal = closeModal
window.verifyForm = verifyForm;