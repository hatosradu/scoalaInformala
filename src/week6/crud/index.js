let state = {
    list: [
        {
            id: 0,
            title: "GOOGLE",
            url: "https://www.google.com",
            difficulty: "2",
            tags: ["JS", "HTML"]
        }
    ],

    difficulty: {
        "": "Not selected",
        "0": "Entry Level",
        "1": "Easy",
        "2": "Medium",
        "3": "Hard",
        "4": "Hacker"
    }
}


function adauga() {
    event.preventDefault();

    let id = Number(document.querySelector("[name='id']").value);
    let title = document.querySelector("[name='title']").value.trim();
    let url = document.querySelector("[name='url']").value.trim();
    let difficulty = document.querySelector("[name='difficulty']").value.trim();
    let tagsElements = document.querySelectorAll(".addedTag");
    let tags = [];
    for (let tag of tagsElements) {
        if (tag.value !== "") {
            tags.push(tag.value.trim());
        }
    }

    let listItem = createObject(title, url, difficulty, tags);

    let type = document.querySelector("[type='submit']").value;
    if (type === "Adauga") {
        state.list.push(listItem);
    }
    else {
        for(let elem of state.list){
            if(id === elem.id){
                elem.title = title;
                elem.url = url;
                elem.difficulty = difficulty;
                elem.tags = tags;
            }
        }

        document.querySelector("[type='submit']").value = "Adauga";

    }

    document.querySelector("form").reset();

    


    draw();
}


function addTag(button, event) {
    //click on button triggered the submit event
    event.preventDefault();
    let tag = document.querySelector("[name='tag']").value.trim();

    button.insertAdjacentHTML("afterend", addTagElement(tag));

    document.querySelector("[name='tag']").value = "";
    document.querySelector("[name='tag']").focus();
}

function addTagElement(tag) {
    return `
            <div>
                <input type="text" placeholder="Tag" class="addedTag" value="${tag}" readonly/> 
                <button onclick="removeTag(this)">-</button> 
            </div>
        `;
}

function draw() {
    let table = document.querySelector("#listTable tbody")
    let bodyOfTable = "";

    for (let item of state.list) {
        bodyOfTable += createTableRow(item);
    }

    table.innerHTML = bodyOfTable;
}

function createTableRow(item) {
    return ` 
        <tr>
            <td><a href="${item.url}" target="_blank">${item.title}</th>
            <td style="width: 20%;">${state.difficulty[item.difficulty]}</th>
            <td>${item.tags.join(", ")}</th>
            <td><button onclick="removeRow(this, ${item.id});">-</button></td>
            <td><button onclick="edit(${item.id});">edit</button></td>
        </tr>
    `;
}

function removeTag(button) {
    button.parentNode.remove();

}

function createObject(title, url, difficulty, tags) {
    return {
        id: Math.random(),
        title: title,
        url: url,
        difficulty: difficulty,
        tags: tags
    };
}

function removeRow(element, id) {
    if (confirm(`Are you sure you want to remove the link?`)) {
        for (var i = 0; i < state.list.length; i++) {
            if (state.list[i].id === id) {
                state.list.splice(i, 1);
            }
        }

        draw();
    }
}

function edit(id) {
    let elem = null;

    for (let item of state.list) {
        if (item.id === id) {
            elem = item;
            break;
        }
    }
    
    document.querySelector("[name='id']").value = elem.id;
    document.querySelector("[name='title']").value = elem.title;
    document.querySelector("[name='url']").value = elem.url;
    document.querySelector("[name='difficulty']").value = elem.difficulty;

    let button = document.querySelector("#addTagBtn");
    for (let tag of elem.tags) {
        button.insertAdjacentHTML("afterend", addTagElement(tag));
    }

    document.querySelector("[type='submit']").value = "Edit";
}