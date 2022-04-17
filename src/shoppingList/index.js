let state = {
    items: [
        {
            description: "Lapte",
            isBought: true
        },
        {
            description: "Oua",
            isBought: false
        },
        {
            description: "Dulciuri",
            isBought: false
        },
        {
            description: "Branza",
            isBought: false
        },
        {
            description: "Hartie",
            isBought: false
        },
    ]
}

function onBodyLoad() {
    loadTable();
}

function loadTable() {
    let table = document.querySelector("#shopListTable");
    let tableContent = "";

    for (let i = 0; i < state.items.length; i++) {
        let item = state.items[i];
        let textStyle = "";
        if (item.isBought) {
            textStyle = `style="text-decoration: line-through;"`
        }

        tableContent +=
            `
            <tr>
                <td><span ${textStyle}> ${item.description}</span></td>
                <td><button class="itemActionButton" onclick="markAsBuyed(${i})">Mark as buyed</button></td>
            </tr>
        `;
    }

    table.querySelector("tbody").innerHTML = tableContent;
}


function markAsBuyed(index) {
    state.items[index].isBought = true;
    loadTable();
}

function addItem(event) {
    event.preventDefault();

    let item = document.querySelector("[name='inputItem']").value;
    state.items.push({
        description: item,
        isBought: false
    });

    document.querySelector("form").reset();
    loadTable();
}

function onKeyPress(event) {
    if (event.keyCode === 13) {
        addItem(event);
    }
}

function sort(direction) {
    if (direction === "asc") {
        state.items = state.items.sort((a, b) => {
            if (a.description > b.description) return 1;
            if (a.description < b.description) return -1;
            return 0;
        });
    } else {
        state.items = state.items.sort((a, b) => {
            if (a.description > b.description) return -1;
            if (a.description < b.description) return 1;
            return 0;
        });
    }

    loadTable();
}