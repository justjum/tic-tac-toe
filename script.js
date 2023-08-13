let currentPlayer = "";
const gameboard = ["","","","","","","","",""];


// factory function to create player

const playerFactory = (number, name, marker, score, human) => {
    let playerScoreboard = document.getElementById(`scoreplayer${number}`);
    let playerQuestion = document.getElementById(`question${number}`);
    playerQuestion.setAttribute("hidden", true);
    const playerName = document.createElement("p");
    const playerScore = document.createElement("button"); 
    playerName.innerHTML = name;
    playerScore.setAttribute("class", "player-score");
    playerScore.setAttribute("id", `player${number}-score`);
    playerScore.innerHTML = score;
    playerScoreboard.appendChild(playerName);
    playerScoreboard.appendChild(playerScore);
    human = human;
    return {number, name, marker, score, human}
} 

// check for human / AI
const humanAI = (id) => {
    const humanCheck = document.getElementsByName(`human-AI${id}`);
    if (humanCheck[0].checked) {
        return true;
    }
    else if (humanCheck[1].checked) {
        return false;    
    }
    else {       
        alert("Please select human or AI")
        return undefined;
    } 
};





// function to load player

let loadPlayer = document.querySelectorAll(".loadPlayer");
loadPlayer.forEach((loadPlayerButton) => {
    

    loadPlayerButton.addEventListener("click", function(e) {
        e.preventDefault();
        let id = e.target.id.replace(/[^0-9]/g, "");
        let human = humanAI(id); 
        if (human === undefined) {
            console.log("this");
            return;
        }
           
        if (+id === 1) {
            if (document.getElementById("player1name").value === "") {
                alert("Please enter name for Player 1")
                return;
            }
            player1 = playerFactory(`${id}`, document.getElementById("player1name").value, "X", 0, human);
            loadPlayerButton.removeAttribute("id");
        }
        else if(+id === 2) {
            if (document.getElementById("player2name").value === "") {
                alert("Please enter name for Player 2")
                return;
            }
            player2 = playerFactory(`${id}`, document.getElementById("player2name").value, "O", 0, human);
            loadPlayerButton.removeAttribute("id");
        }
    });
});


    // function to play game
    let letsPlay = document.getElementById("lets-play");
    letsPlay.addEventListener("click", function() {
        if (typeof(player1) === "undefined") {
            alert("Please load Player 1");
        }
        else if (typeof(player2) === "undefined") {
            alert("Please load Player 2");
        }
        else {
            Gameboard.generateGameboard();
        }
    })

const Gameboard = (() => {

    // array of arrays for winning pattern
    /*      0 1 2
            3 4 5
            6 7 8 */

    const winningPattern = [[0,1,2],[3,4,5], [6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const loadButtons = () => {

        let checkButton = document.querySelectorAll(".checkspot");

        //function to mark each square
        checkButton.forEach((button) => {
            button.addEventListener("click", function(e) {
                console.log(e)
                let id = e.target.id.replace(/[^0-9]/g, "");
                let checkbox = e.target;
                markBoard(id, checkbox);
                
            });
        });

    /* "Reset" functionality removed and moved to alert/confirm controls
    /*     let resetButton = document.querySelector(".reset-button");
        resetButton.addEventListener("click", () => {
            let newGameboard = document.getElementById("gameboard");
            while (newGameboard.hasChildNodes()) {
                newGameboard.removeChild(newGameboard.firstChild);
            }
            for (let x=0; x<9; x++) {
                gameboard[x] = "";
            }
            generateGameboard();
        }); */

    }

    const newGameboard = () => {
        let newGameboard = document.getElementById("gameboard");
            while (newGameboard.hasChildNodes()) {
                newGameboard.removeChild(newGameboard.firstChild);
            }
            for (let x=0; x<9; x++) {
                gameboard[x] = "";
            }
            generateGameboard();
    }

    //function to alternate player turns
    const playerTurn = (turn) => {
        if(turn === 'X') {
            currentPlayer = player2;
        }
        else if(turn === 'O') {
            currentPlayer = player1;
        }
        makeMove();
    }

    // function for human AI turn 
    const makeMove = () => {
        if (!currentPlayer.human) {
            let aiTurn = Math.floor(Math.random() * 9);
            while (gameboard[aiTurn] !== "") {
                aiTurn = Math.floor(Math.random() * 9);
                console.log("repeat");
            }
            let checkBox = document.getElementById(`checkspot${aiTurn}`);
            markBoard(aiTurn, checkBox);
        }
    }
 
    // function to mark board

    const markBoard = (id, checkbox) => {
        if (gameboard[id] === "") {
            console.log(checkbox);
            checkbox.innerHTML = currentPlayer.marker;        
            updateGameboard(currentPlayer.marker, id);
            const renderTime = setTimeout(stepForward, 100);
            //stepForward();           
        }
    }

    const stepForward = () => {
        if (checkForWin(currentPlayer.marker)) {
            return;
        }
        else if (checkForDraw()) {
            return;
        }
        else {
            playerTurn(currentPlayer.marker);
        };
    }


    // function to update "gameboard" array
    const updateGameboard = (turn, id) => {
        gameboard[id] = turn;
    }

    // functions to check for draw or winning pattern
    const checkForDraw = () => {
        for (let x=0; x < 9; x++) {
            if (gameboard[x] !== "") {
                if (x === 8) {
                    alert("It's a draw...");
                    newGameboard();
                }
            }
            else {
                return;
            }
        }
    }

    const checkForWin = (turn) => {
        for (let x=0; x < winningPattern.length; x++) {
            if (gameboard[winningPattern[x][0]] === turn && gameboard[winningPattern[x][1]] === turn && gameboard[winningPattern[x][2]] === turn) {
                currentPlayer.score += 1;
                if (currentPlayer.score === 3) {
                    let updateScore = document.getElementById(`player${currentPlayer.number}-score`);
                    updateScore.innerHTML = currentPlayer.score;
                    alert(`${currentPlayer.name} is the Champion!!`)
                    if (confirm("Is there a new challenger??")) {
                        location.reload();
                        return;
                    }
                }
                let updateScore = document.getElementById(`player${currentPlayer.number}-score`);
                updateScore.innerHTML = currentPlayer.score;
                alert(`${currentPlayer.name} wins this round!!`);
                if (confirm("Play another round?")) {
                    newGameboard();
                }
                else {
                    location.reload();
                };
                
            
            }
            
        }
    }



    //function to generate gameboard
    const generateGameboard = () => {
        // array to represent gameboard
        
        currentPlayer = player1;
        // function to render gameboard in HTML
        document.getElementById("gamestart").style.display = "none";
        let newGameboard = document.getElementById("gameboard");
        for (let x=0; x<9; x++) {   
            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "checkspot");
            newDiv.setAttribute("id",  `checkspot${x}`);
            newGameboard.appendChild(newDiv);
            
            //document.getElementById("new-gameboard").innerHTML = `<div class="checkspot" id="checkspot${x}"></div>`;
        }

        loadButtons();
        return 
    };


    return { generateGameboard };
})();

