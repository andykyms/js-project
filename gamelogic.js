const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
// const modal = document.getElementById("modal");
// const playerForm = document.getElementById("playerForm");
// const player1Input = document.getElementById("player1");
// const player2Input = document.getElementById("player2");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
let options = [ "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();
function initializeGame(){
    cell.forEach(cell => cell.addEventListener("click", cellClicked))
    restartBtn.addEventListener("click", restartGame)
    statusText.textContent = `${currentPlayer} turn`;
    // showModal();
    // statusText.textContent = ${player1Name}'s turn;
    running = true;
    // running = true
};
// function showModal() {
//     modal.style.display = "block";
// }

// function hideModal() {
//     modal.style.display = "none";
// }

// playerForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const player1Name = player1Input.value;
//     const player2Name = player2Input.value;
//     hideModal();
//     if(player1Name === ""){
//         alert("Please enter a name for Player 1.");
//         return;
//     }
//     if(player2Name === ""){
//         alert("Please enter a name for Player 2");
//         return;
//     }
    
// });
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    
    checkWinner();

}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `${currentPlayer} turn`;

}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i ++){
        const condition =  winConditions[i]
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){ continue;}
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }else if(!options.includes("")){
        statusText.textContent = "Draw!"
        running = false;
    }else {
        changePlayer();
    }

}
function restartGame(){
    currentPlayer = "X";
    options = [ "", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} turn`;
    cell.forEach(cell => cell.textContent = "");
    running=true}