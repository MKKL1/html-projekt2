import {Przedmiot} from "./Product.js";

const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
let items = null;
export function onEditStart() {

    items = window.localStorage.getItem('')
    $('#product_add_form').on('submit', function(event) {
        event.preventDefault();
        if(!checkInputs()) return false;

        let data = {}
        const formdata = new FormData(event.target);
        let przedmiot = new Przedmiot();
        przedmiot.product_name = formdata.get('product_name');
        przedmiot.product_desc = formdata.get('product_desc');
        przedmiot.product_price = parseFloat(formdata.get('product_price'));
        przedmiot.product_image = formdata.get('product_image');
        console.log(przedmiot);
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

    const productNameValue = productNameInput.value.trim();
    const productPriceValue = productPriceInput.value.trim();
    const productImageValue = productImageInput.value.trim();

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

}

function showAddItem() {
    $('#addItemModal').modal('show');
}

function closeModal() {
    $('#addItemModal').modal('hide');
    $('#product_add_form')[0].reset();
    resetAllErrors();
}

function verifyForm() {
    $('#product_add_form #formProductName')
}

window.showAddItem = showAddItem
window.closeModal = closeModal
window.verifyForm = verifyForm;