let state = {
    rawData: {},
    filteredData: {}
};

async function onBodyLoad() {
    await getData();
}


function loadMenu() {
    let menuPanel = document.querySelector("#itemsPanel");
    let items = "";
    for (let [key, value] of Object.entries(state.filteredData)) {
        items +=
            `
            <div class="menu-item" itemId="${key}" onclick='getDetails("${key}")'>
                <span>${value.nume}</span>
                <img src="${value.imagine}" alt="">
                <p>${value.ingrediente}</p>
            </div>
        `;
    }

    menuPanel.innerHTML = items;
}

function getDetails(itemId) {
    console.log("Getting details of: " + itemId);
    window.location.href = "./details/itemDetails.html?id=" + itemId;
}

async function getData() {
    document.querySelector(".lds-roller").classList.remove("hidden");

    let url = "https://manu-playgrou-default-rtdb.europe-west1.firebasedatabase.app/.json"
    let response = await fetch(url);
    state.rawData = await response.json();
    state.filteredData = state.rawData;

    loadMenu();
    document.querySelector(".lds-roller").classList.add("hidden");

}

function filterMenu(elem, event) {
    console.log(event);
    if (elem.value) {

        let stateArray = state.rawData;
        let newState = Object.fromEntries(Object.entries(stateArray)
            .filter(([key, value]) => value.ingrediente.includes(elem.value)));

        state.filteredData = newState;
    } else {
        state.filteredData = state.rawData;
    }

    loadMenu();
}

function toAdmin(){
    window.location.href = "./admin/admin.html";
}
