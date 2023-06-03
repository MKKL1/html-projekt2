export class ItemStorage {
    constructor() {
        if(!window.localStorage.hasOwnProperty('items')) {
            window.localStorage.setItem('items', '{}');
            this.items = {};
        } else this.items = JSON.parse(window.localStorage.getItem('items'));
    }

    addItem(przedmiot) {
        this.items[window.crypto.randomUUID()] = (przedmiot);
    }

    editItem(uuid, przedmiot) {
        this.items[uuid] = (przedmiot);
    }

    getItem(uuid) {
        return this.items[uuid];
    }

    removeItem(uuid) {
        delete this.items[uuid];
    }

    saveToLocalStorage() {
        window.localStorage.setItem('items', JSON.stringify(this.items, (key, value) => {
            if (value !== null) return value
        }));
    }

    readLocalStorage() {
        this.items = JSON.parse(window.localStorage.getItem('items'));
    }
}