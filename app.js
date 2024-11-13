let players = [];
let scores = [];
let turnScore = 0;
let currentPlayerIndex = 0;
let diceCount = 1;
const targetScore = 100;

function generatePlayerInputs() {
    const playerCount = parseInt(document.getElementById("player-count").value);
    const playerNamesDiv = document.getElementById("player-names");
    playerNamesDiv.innerHTML = '';

    for (let i = 1; i <= playerCount; i++) {
        playerNamesDiv.innerHTML += `<input type="text" id="player${i}" placeholder="Pelaaja ${i}" required>`;
    }
}

function startGame() {
    const playerCount = parseInt(document.getElementById("player-count").value);
    players = [];
    scores = Array(playerCount).fill(0);
    diceCount = parseInt(document.getElementById("dice-count").value);

    for (let i = 0; i < playerCount; i++) {
        const playerName = document.getElementById(`player${i + 1}`).value || `Pelaaja ${i + 1}`;
        players.push(playerName);
    }

    document.getElementById("setup").style.display = "none";
    document.getElementById("game-info").style.display = "block";
    document.getElementById("scoreboard").style.display = "block";
    updateCurrentPlayer();
    updateScoreboard();
}

function rollDice() {
    let rollSum = 0;
    let rolls = [];

    for (let i = 0; i < diceCount; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        rolls.push(roll);

        if (roll === 1) {
            turnScore = 0;
            document.getElementById("last-roll").innerText = `Heitit: ${rolls.join(", ")}`;
            document.getElementById("message").innerText = "Hups! Heitit 1, vuoro päättyy!";
            
            setTimeout(() => {
                document.getElementById("message").innerText = ""; 
                endTurn(); 
            }, 1500); 
            
            return;
        }
        rollSum += roll;
    }

    turnScore += rollSum;
    document.getElementById("turn-score").innerText = turnScore;
    document.getElementById("last-roll").innerText = `Heitit: ${rolls.join(", ")}`;
    document.getElementById("message").innerText = ""; 
}

function holdTurn() {
    scores[currentPlayerIndex] += turnScore;
    if (scores[currentPlayerIndex] >= targetScore) {
        announceWinner(players[currentPlayerIndex]);
        return;
    }
    endTurn();
}

function endTurn() {
    turnScore = 0;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
    updateScoreboard();
}

function updateCurrentPlayer() {
    document.getElementById("current-player").innerText = players[currentPlayerIndex];
    document.getElementById("turn-score").innerText = turnScore;
}

function updateScoreboard() {
    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = '';
    players.forEach((player, index) => {
        scoreList.innerHTML += `<li>${player}: ${scores[index]} pistettä</li>`;
    });
}

function announceWinner(winner) {
    document.getElementById("game-info").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("winner-announcement").style.display = "block";
    document.getElementById("winner-message").innerText = `${winner} voitti ${scores[currentPlayerIndex]} pisteellä!`;
}

function resetGame() {
    document.getElementById("setup").style.display = "block";
    document.getElementById("game-info").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("winner-announcement").style.display = "none";
    turnScore = 0;
    currentPlayerIndex = 0;
    document.getElementById("turn-score").innerText = turnScore;
}
