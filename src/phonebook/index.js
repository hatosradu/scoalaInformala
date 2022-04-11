let state = {
    contacts: [
        {
            "firstName": "Jane",
            "lastName": "Mathis",
            "phoneNumber": "8615033670"
        },
        {
            "firstName": "Ivy",
            "lastName": "Sweeney",
            "phoneNumber": "8795532344"
        },
        {
            "firstName": "Noelle",
            "lastName": "Lang",
            "phoneNumber": "8774652680"
        },
        {
            "firstName": "Kennedy",
            "lastName": "Stokes",
            "phoneNumber": "8575392279"
        },
        {
            "firstName": "Liliana",
            "lastName": "Love",
            "phoneNumber": "8814382643"
        },
        {
            "firstName": "Rene",
            "lastName": "Ellis",
            "phoneNumber": "9484302541"
        },
        {
            "firstName": "Lopez",
            "lastName": "Carlson",
            "phoneNumber": "9575363111"
        },
        {
            "firstName": "Penelope",
            "lastName": "Hess",
            "phoneNumber": "8214542343"
        },
        {
            "firstName": "Patsy",
            "lastName": "Maxwell",
            "phoneNumber": "9685502345"
        },
        {
            "firstName": "Melisa",
            "lastName": "Frederick",
            "phoneNumber": "9244572117"
        },
        {
            "firstName": "Cote",
            "lastName": "Griffith",
            "phoneNumber": "8235922236"
        },
        {
            "firstName": "Dawson",
            "lastName": "Barlow",
            "phoneNumber": "8585022273"
        },
        {
            "firstName": "Eva",
            "lastName": "Terry",
            "phoneNumber": "8695803189"
        }
    ],
    isEditMode: false,
    editIndex: null
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
            <td>${contact.phoneNumber.splice(4, 0, " ").splice(8, 0, " ")}</td>
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

function formState() {
    let btn = document.querySelector("[type='submit']");
    if (state.isEditMode) {
        btn.innerText = "Edit";
    } else {
        btn.innerText = "Add";
    }
}

function onKeyPress(event) {
    if (event.keyCode === 13) {
        onAdd(event);
    }
}

function onAdd(event) {
    event.preventDefault();

    let invalidInput = false;

    let firtNameValidationText = document.querySelector("#firtNameValidationText");
    let lastNameValidationText = document.querySelector("#lastNameValidationText");
    let phoneValidationText = document.querySelector("#phoneValidationText");

    let firstNameElem = document.querySelector("[name='firstName']");
    let lastNameElem = document.querySelector("[name='lastName']");
    let phoneElem = document.querySelector("[name='phone']");


    let firstName = firstNameElem.value;
    let lastName = lastNameElem.value;
    let phone = phoneElem.value;

    //validate inputs
    if (isStringNullOrWhiteSpace(firstName)) {
        firstNameElem.classList.add("invalidInput");
        firtNameValidationText.innerText = "Please type a valid first name.";
        invalidInput = true;
    } else {
        firstNameElem.classList.remove("invalidInput");
        firtNameValidationText.innerText = "";
    }

    if (isStringNullOrWhiteSpace(lastName)) {
        lastNameElem.classList.add("invalidInput");
        lastNameValidationText.innerText = "Please type a valid last name.";
        invalidInput = true;
    } else {
        lastNameElem.classList.remove("invalidInput");
        lastNameValidationText.innerText = "";
    }

    if (isStringNullOrWhiteSpace(phone) || !validatePhoneNumber(phone)) {
        phoneElem.classList.add("invalidInput");
        phoneValidationText.innerText = "Phone number must be valid.";
        invalidInput = true;
    } else {
        phoneElem.classList.remove("invalidInput");
        phoneValidationText.innerText = "";
    }

    if (invalidInput) {
        return;
    }

    if (state.isEditMode) {
        state.contacts[state.editIndex] = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone
        };

        state.isEditMode = false;
        state.editIndex = null;
    } else {
        state.contacts.push({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone
        });
    }

    loadContacts();
    formState();
    document.querySelector("form").reset();
}

function validatePhoneNumber(str) {
    if (str.length !== 10) {
        return false;
    }

    let number = Number(str);
    if (isNaN(number)) {
        return false;
    }

    return true;
}

function editContact(index) {
    console.log(`Edit contact: ${index}`);

    let contanct = state.contacts[index];
    document.querySelector("[name='firstName']").value = contanct.firstName;
    document.querySelector("[name='lastName']").value = contanct.lastName;
    document.querySelector("[name='phone']").value = contanct.phoneNumber;

    let inputs = document.querySelectorAll(".invalidInput");
    for (let item of inputs) {
        item.classList.remove("invalidInput");
    }

    document.querySelector("#firtNameValidationText").innerText = "";
    document.querySelector("#lastNameValidationText").innerText = "";
    document.querySelector("#phoneValidationText").innerText = "";

    state.isEditMode = true;
    state.editIndex = index;
    formState();
}

function deleteContact(index) {
    let contanct = state.contacts[index];
    if (confirm(`Are you sure you want to remove ${contanct.firstName} ${contanct.lastName} from contacts list?`)) {
        if (state.isEditMode && state.editIndex === index) {
            state.isEditMode = false;
            formState();
        }

        state.contacts.splice(index, 1);
        loadContacts();

    }
}

function isStringNullOrWhiteSpace(str) {
    if (str === null || str === undefined) {
        return true;
    }

    if (str === "") {
        return true;
    }

    if (str.trim().length === 0) {
        return true;
    }

    return false;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};