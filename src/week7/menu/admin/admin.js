let state = {};

async function onBodyLoad() {
    await getData();
}


async function getData() {
    document.querySelector(".lds-roller").classList.remove("hidden");

    let url = "https://manu-playgrou-default-rtdb.europe-west1.firebasedatabase.app/.json"
    let response = await fetch(url);
    state = await response.json();

    loadMenu();
    document.querySelector(".lds-roller").classList.add("hidden");
}

function loadMenu() {
    let menuPanel = document.querySelector("#itemsPanel");
    let items = "";
    for (let [key, value] of Object.entries(state)) {
        items +=
            `
            <div class="menu-item">
                <span>${value.nume}</span>
                <img src="${value.imagine}" alt="">
                <p>${value.ingrediente}</p>
                <div>
                    <button onclick="editItem('${key}')">Edit</button>
                    <button onclick="deleteItem('${key}')">Delete</button>
                </div>
            </div>
        `;
    }

    menuPanel.innerHTML = items;
}

async function deleteItem(id) {

    let urlParams = new URLSearchParams();
    urlParams.append("id", id);
    urlParams.append("name", state[id].nume);


    let path = "confirm.html?" + urlParams.toString();
    console.log(path);
    window.location =path;
}

function editItem(id) {
    window.location = "editItem.html?id=" + id;
}

function addItem() {
    window.location = "editItem.html?id=";
}