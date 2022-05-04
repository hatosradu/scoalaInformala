
const dbUrl = "https://tic-tac-toe-real-time-d1a56-default-rtdb.europe-west1.firebasedatabase.app";

const playerImage = {
  true: "./x.svg",
  false: "./o.svg",
};

const displayPlayer = {
  true: "X",
  false: "0",
};

let iAmPlayer = null;

let state = {
  player: true, //x e true; 0 e false
  game: [undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined],
  finished: false
};

async function play(pos) {

  if (state.player !== iAmPlayer) {
    return;
  }

  if (state.finished) {
    await newGame();
    return;
  }
  if (state.game[pos] !== undefined) {
    return;
  }

  let boxes = document.querySelectorAll("#game>.box");
  let box = boxes[pos];

  await putDb("game/" + pos, state.player);
  state.game[pos] = state.player;

  box.innerHTML = `<img src="${playerImage[state.player + ""]}" />`;

  if (state.game[0] === state.game[1] && state.game[1] === state.game[2] && state.game[2] !== undefined) {
    showMessage(`Player ${displayPlayer[state.player]} has won`);
    await putDb("finished", true);

    return;
  }

  await putDb("player", !state.player);
  state.player = !state.player;

  showMessage(`It's players ${displayPlayer[state.player]}'s turn!`);
  let isDraw = true;
  for (let g of state.game) {
    if (g === null) {
      isDraw = false;
    }
  }

  await putDb("finished", isDraw);
  state.finished = isDraw;

  if (isDraw) {
    showMessage(`It's a draw! Click for new game`);
  }
}

function showMessage(msg) {
  document.querySelector("#gameMessage").innerText = msg;
}

async function newGame() {
  showMessage("Joaca un X si 0");
  let boxes = document.querySelectorAll("#game>.box");
  for (let box of boxes) {
    box.innerText = "";
  }

  state.player = true;
  state.game = [undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined];
  state.finished = false;

  await putDb("", {
    "player": true,
    "game": [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    "finished": false
  })
}

async function chosePlayer(value) {
  iAmPlayer = value;

  document.querySelector("#chosePlayer").classList.add("hidden");
  document.querySelector("#gameContent").classList.remove("hidden");

  if (value) {
    await newGame();
  }

  setInterval(getDb, 2000);
}

async function putDb(path, value) {
  await fetch(dbUrl + "/" + path + ".json", {
    method: "PUT",
    body: JSON.stringify(value)
  });
}

async function getDb() {
  let response = await fetch(dbUrl + "/.json");
  let jsonReponse = await response.json();

  if (jsonReponse.player !== state.player) {
    state.player = jsonReponse.player;
    showMessage(`It's players ${displayPlayer[state.player]}'s turn!`);

    if (jsonReponse.game !== undefined) {

      let boxes = document.querySelectorAll("#game>.box");

      for (let idx = 0; idx < 9; idx++) {
        let game = state.game[idx];
        if (!isLooseEquals(game, jsonReponse.game[idx])) {
          console.log("player has made the move: " + idx);
          let box = boxes[idx];

          box.innerHTML = `<img src="${playerImage[state.game[idx]+""]}" />`;
        }
      }
    }
  }
}

function isLooseEquals(val1, val2) {
  if (val1 === val2) {
    return true;
  }

  if ((val1 === null || val1 === undefined) && (val2 === null || val2 === undefined)) {
    return true;
  }

  return false;
}

