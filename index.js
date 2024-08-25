let items = ["hello world, 123"];

const div = document.querySelector(".items");
const input = document.getElementById("input");
const storageKey = "items";

function renderItems() {
    div.innerHTML = "";

    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div");
        container.classList.add("item");

        const text = document.createElement("p");
        text.textContent = item;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.onclick = () => removeItem(idx);

        container.appendChild(text);
        container.appendChild(button);

        div.appendChild(container);
    }
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey);
    if (oldItems) items = JSON.parse(oldItems);
    renderItems();
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems);
}

function addItem(event) {
    event.preventDefault();
    const value = input.value;
    if (!value) {
        alert("You cannot add an empty item");
        return;
    }
    items.push(value);
    renderItems();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    items.splice(idx, 1);
    renderItems();
    saveItems();
}

document.addEventListener("DOMContentLoaded", loadItems);
