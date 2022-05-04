const databaseUrl = "https://chat-si-79de3-default-rtdb.europe-west1.firebasedatabase.app/";

let userName = null;

function startChat() {
    let name = document.querySelector("[name='name']").value;
    name = name.trim();
    if (name.length < 3) {
        document.querySelector("[name='name']").classList.add("error");
    }
    else {
        userName = name;
        document.querySelector("[name='name']").classList.remove("error");
        document.querySelector("#signUpForm").classList.add("hidden");
        document.querySelector("#chatContainer").classList.remove("hidden");
    }
}

async function addMessage() {
    let message = document.querySelector("[name='chatMessage']").value.trim();
    let requestUrl = databaseUrl + "messages/.json"
    let response = await fetch(requestUrl, {
        method: "POST",
        body: JSON.stringify({
            userName: userName,
            message: message,
            date: new Date()
        })
    });

    document.querySelector("[name='chatMessage']").value = "";
}

function displayMessage(data) {

    let template =
        `
    <div class="chatBubble ${data.userName === userName ? "self" : ""}">
        <div class="userName">${data.userName}</div>
        <div class="chatMessage">${data.message}</div>
        <div class="time">${data.date}</div>
    </div>
    `;

    document.querySelector("#chat").insertAdjacentHTML("beforeend", template);
}