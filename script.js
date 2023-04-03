let fields = [];
let currentShape = 'cross';
let gameOver = false;
let currentMove = 0;
let winner;

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player-1').classList.add('player-inactive');
            document.getElementById('player-2').classList.remove('player-inactive');
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {document.getElementById(`circle-${i}`).classList.remove('d-none');}
        if (fields[i] == 'cross') {document.getElementById(`cross-${i}`).classList.remove('d-none');}
    }
    currentMove++;
}

function checkForWin() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {checkWinnerTemplate(0, 1, 'scaleX(0.8)');}
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {checkWinnerTemplate(3, 2, 'scaleX(0.8)');}
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {checkWinnerTemplate(6, 3, 'scaleX(0.8)');}
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {checkWinnerTemplate(0, 4, 'rotate(90deg) scaleX(0.8)');}
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {checkWinnerTemplate(1, 5, 'rotate(90deg) scaleX(0.8)');}
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {checkWinnerTemplate(2, 6, 'rotate(90deg) scaleX(0.8)');}
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {checkWinnerTemplate(0, 7, 'rotate(45deg) scaleX(1)');}
    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {checkWinnerTemplate(2, 8, 'rotate(-45deg) scaleX(1)');}
    if (winner == "cross") { manageWinner('Player 1'); }
    else if (winner == "circle") { manageWinner('Player 2'); }
    else if (!winner && currentMove == 9) { manageWinner('Niemand'); }
}

function checkWinnerTemplate(id, number, winnerTransform) {
    winner = fields[id];
    document.getElementById(`line-${number}`).style.transform = `${winnerTransform}`;
}

function manageWinner(winnerName) {
    gameOver = true;
    document.getElementById('game-over').classList.remove('d-none');
    document.getElementById('restart-btn').classList.remove('d-none');
    document.getElementById('game-over').style.zIndex = 2;
    document.getElementById('game-over').style.backgroundColor = "rgb(255 255 255 / 80%)";
    document.getElementById('game-over').innerHTML = `<span class="game-over-text">${winnerName} hat gewonnen! </span>`;
}

function restart() {
    winner = '';
    currentMove = 0;
    gameOver = false;
    fields = [];
    document.getElementById('game-over').innerHTML = '';
    document.getElementById('game-over').style.zIndex = -10;
    document.getElementById('restart-btn').classList.add('d-none');
    for (let i = 1; i < 9; i++) { document.getElementById(`line-${i}`).style.transform = ''; }
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cross-${i}`).classList.add('d-none');
        document.getElementById(`circle-${i}`).classList.add('d-none');
    }
}
