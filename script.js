
// array to represent gameboard
const gameboard = ["","","","","","","","",""];
let player = "X";

// array of arrays for winning pattern
/*      0 1 2
        3 4 5
        6 7 8 */

const winningPattern = [[0,1,2],[3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let checkButton = document.querySelectorAll(".checkspot");

//function to mark each square
checkButton.forEach((button) => {
    button.addEventListener("click", function(e) {
        console.log(e.srcElement); 
        let id = e.srcElement.id.replace(/[^0-9]/g, "");
        if (gameboard[id] === "") {
            e.srcElement.innerHTML = `${player}`;
            updateGameboard(player, id);
            checkForWin(player);
            playerTurn(player);
        }
        
    });
});

//function to alternate player turns


const playerTurn = (turn) => {
    if(turn === "X") {
        player = "O";
    }
    else if(turn === "O") {
        player = "X";
    }
}


// function to update "gameboard" array

const updateGameboard = (turn, id) => gameboard[id] = turn;

// function to check for winning pattern

const checkForWin = (turn) => {
    for (let x=0; x < winningPattern.length; x++) {
        if (gameboard[winningPattern[x][0]] === turn && gameboard[winningPattern[x][1]] === turn && gameboard[winningPattern[x][2]] === turn) {
            console.log('win');
        }
    }
}
    
        
    