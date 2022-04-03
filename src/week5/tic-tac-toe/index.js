let state = {
    player: false, //x === true, o === false
    game: [null, null, null, null, null, null, null, null, null]
}


function play(pos) {
    if (state.game[pos] !== null) {
        return;
    }

    let tile = document.querySelectorAll("#game>.box")[pos];
    tile.innerHTML = `<img src="./assets/${state.player ? "x" : "o"}.svg"/>`;
    state.game[pos] = state.player;
    state.player = !state.player;
}


const test = {
    hatosra
}