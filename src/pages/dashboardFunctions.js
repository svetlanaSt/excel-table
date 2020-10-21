import { storage } from "../core/utils";

function toHtml(key) {
    const model = storage(key);
    const id = key.split(':')[1];
    console.log(model);
    return `
    <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>${new Date(model.openedDate).toLocaleDateString()}</strong>
    </li>`;
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    return `<div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="db__list">            
                ${keys.map(toHtml).join('')}
            </ul>`;
}