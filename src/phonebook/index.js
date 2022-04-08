let state = {
    contacts: [
        {
            "firstName": "Jane",
            "lastName": "Mathis",
            "phoneNumber": "(861) 503-3670"
        },
        {
            "firstName": "Ivy",
            "lastName": "Sweeney",
            "phoneNumber": "(879) 553-2344"
        },
        {
            "firstName": "Noelle",
            "lastName": "Lang",
            "phoneNumber": "(877) 465-2680"
        },
        {
            "firstName": "Kennedy",
            "lastName": "Stokes",
            "phoneNumber": "(857) 539-2279"
        },
        {
            "firstName": "Liliana",
            "lastName": "Love",
            "phoneNumber": "(881) 438-2643"
        },
        {
            "firstName": "Rene",
            "lastName": "Ellis",
            "phoneNumber": "(948) 430-2541"
        },
        {
            "firstName": "Lopez",
            "lastName": "Carlson",
            "phoneNumber": "(957) 536-3111"
        },
        {
            "firstName": "Penelope",
            "lastName": "Hess",
            "phoneNumber": "(821) 454-2343"
        },
        {
            "firstName": "Patsy",
            "lastName": "Maxwell",
            "phoneNumber": "(968) 550-2345"
        },
        {
            "firstName": "Melisa",
            "lastName": "Frederick",
            "phoneNumber": "(924) 457-2117"
        },
        {
            "firstName": "Cote",
            "lastName": "Griffith",
            "phoneNumber": "(823) 592-2236"
        },
        {
            "firstName": "Dawson",
            "lastName": "Barlow",
            "phoneNumber": "(858) 502-2273"
        },
        {
            "firstName": "Eva",
            "lastName": "Terry",
            "phoneNumber": "(869) 580-3189"
        }
    ]
}


function onBodyLoad() {
    loadContacts();
}

function loadContacts() {
    let contacts = document.querySelector("#contacts");

    let tableContent = " ";
    for (let i = 0; i < state.contacts.length; i++) {
        let contact = state.contacts[i];
        tableContent += addContactRow(contact, i);
    }

    contacts.querySelector("tbody").innerHTML = tableContent;
}

function addContactRow(contact, index) {
    return `
        <tr>
            <td>${contact.firstName} ${contact.lastName}</td>
            <td>${contact.phoneNumber}</td>
            <td style="text-align: center;">
                <button onclick="editContact(${index});">
                    <img src="./assets/edit.png">
                </button>
            </td>
            <td>
                <button onclick="deleteContact(${index});">
                    <img src="./assets/delete.png">
                </button>
            </td>
        </tr>
    `;
}

function onAdd(event) {
    event.preventDefault();
    let firstName = document.querySelector("[name='firstName']").value;
    let lastName = document.querySelector("[name='lastName']").value;
    let phone = document.querySelector("[name='phone']").value;

    console.log(`Adding: ${firstName} ${lastName} ${phone}`);

    state.contacts.push({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone
    });

    loadContacts();
}


function editContact(index) {
    console.log(`Edit contact: ${index}`);
}

function deleteContact(index) {
    console.log(`Delete contact: ${index}`);
}
