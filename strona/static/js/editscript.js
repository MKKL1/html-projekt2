export function onEditStart() {
    const form = $('#product_add_form');
    form.on('submit', function(event) {
        event.preventDefault();
        let data = {}
        data['product_name'] = $('#formProductName').getAttribute('value');
        console.log(data);
        return false;
    });
    fillItems();
}

function fillItems() {

}

function showAddItem() {
    $('#addItemModal').modal('show');
}

function closeModal() {
    $('#addItemModal').modal('hide');
}

window.showAddItem = showAddItem
window.closeModal = closeModal