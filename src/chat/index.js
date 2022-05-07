const databaseUrl = "https://chat-si-79de3-default-rtdb.europe-west1.firebasedatabase.app/";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQfV9JeaUOj1LkWQs5N97rTQBHvhXQ90I",
    authDomain: "chat-si-79de3.firebaseapp.com",
    databaseURL: "https://chat-si-79de3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-si-79de3",
    storageBucket: "chat-si-79de3.appspot.com",
    messagingSenderId: "362599631435",
    appId: "1:362599631435:web:5c75e5a854537deb5b1bce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const messagesRef = ref(database, 'messages');
onChildAdded(messagesRef, (snapshot) => {
    const data = snapshot.val();
    let date = new Date(data.date);
    let hour =  date.toLocaleString('en-US', { hour: 'numeric', hour12: false });
    let minute =  date.toLocaleString('en-US', { minute: 'numeric' });

    let template =
        `
    <div class="chatBubble ${data.userName === userName ? "self" : ""}">
        <div class="userName">${data.userName}</div>
        <div class="chatMessage">${data.message}</div>
        <div class="time">${hour}:${minute}</div>
    </div>
    `;

    document.querySelector("#chat").insertAdjacentHTML("beforeend", template);

    document.querySelector("#chatBubble:last-child").scrollIntoView();});

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
    let date = new Date(data.date);
    let hour =  date.toLocaleString('en-US', { hour: 'numeric', hour12: false });
    let minute =  date.toLocaleString('en-US', { minute: 'numeric' });

    let template =
        `
    <div class="chatBubble ${data.userName === userName ? "self" : ""}">
        <div class="userName">${data.userName}</div>
        <div class="chatMessage">${data.message}</div>
        <div class="time">${hour}:${minute}</div>
    </div>
    `;

    document.querySelector("#chat").insertAdjacentHTML("beforeend", template);

    document.querySelector("#chatBubble:last-child").scrollIntoView();
}

window.addMessage = addMessage;
window.startChat = startChat;