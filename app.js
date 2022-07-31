const gameboard = (() => {
    
    let gameboardActive = true;
    let aiMode = false;

    // Player Factory
    const playerFactory = (name, mark) => {
        function setName(newName) {
            this.name = newName;
        }
        return {name, mark, setName}
    }

    const player1 = playerFactory("player1", "X");
    const player2 = playerFactory("player2", "O");

    let currentPlayer = player1;

    // cache dom
    const gameboardFields = document.querySelectorAll(".field");
    const restartButton = document.querySelector(".restart-button");
    const display = document.querySelector(".display");
    const inputPlayer1 = document.querySelector("#player1");
    const inputPlayer2 = document.querySelector("#player2");
    const aiBtn = document.querySelector(".ai-button");

    // event listeners
    gameboardFields.forEach(field => {
        field.addEventListener("click", (event) => {
            addMark(event.target.dataset.index, currentPlayer)
        })
    })
    restartButton.addEventListener("click", restart);
    inputPlayer1.addEventListener("keyup", changeName);
    inputPlayer2.addEventListener("keyup", changeName);
    aiBtn.addEventListener("click", startAi)

    let gameboard = ["","","",
                     "","","",
                     "","",""];

    function render() {
        for(let i = 0; i<gameboard.length; i++) {
            gameboardFields[i].textContent = gameboard[i].mark;
        }
    }

    function addMark(index, player) {

        if(gameboard[index] !== "" || gameboardActive == false) {
            return;
        }
        gameboard[index] = currentPlayer;
        render();
        swapCurrentPlayer();
        
        if(aiMode) {
            setTimeout(makeAiMove, 1000);
        }
        console.log(returnWinner())
        if(returnWinner() != false) {
            endgame();
        }

    }

    function swapCurrentPlayer() {
        if(currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function returnWinner() {
        if(gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2] && gameboard[1] != "") {
            return gameboard[0]
        } else if(gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5] && gameboard[4] != "") {
            return gameboard[3]
        } else if(gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8] && gameboard[7] != "") {
            return gameboard[6]
        } else if(gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6] && gameboard[3] != "") {
            return gameboard[0]
        } else if(gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7] && gameboard[1] != "") {
            return gameboard[1]
        } else if(gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8] && gameboard[5] != "") {
            return gameboard[2]
        } else if(gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8] && gameboard[4] != "") {
            return gameboard[0]
        } else if(gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6] && gameboard[4] != "") {
            return gameboard[0]
        } else {
            return false;
        }
    }

    function endgame() {
        display.textContent = returnWinner().name + " won!"
        gameboardActive = false;
    }

    function restart() {
        gameboardActive = true;
        for(let i = 0; i<gameboard.length; i++) {
            gameboard[i] = "";
        };
        render();
        display.textContent = "";
        aiMode = false;
    }

    function changeName(e) {
        if(e.target.id == "player1") {
            player1.setName(e.target.value)
        } else {
            player2.setName(e.target.value)
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }     

    function makeAiMove() {
        if(!gameboardActive) {
            return;
        }
        let randomInt;
        while(true) {
            randomInt = getRandomInt(9);
            if(gameboard[randomInt] == "") {
                break
            }
        }

        gameboard[randomInt] = currentPlayer;
        swapCurrentPlayer();
        render();
        aiTurn = false;
        if(returnWinner() != false) {
            endgame();
        }
    }

    function startAi() {
        restart();
        aiMode = true;
        makeAiMove();
    }

    // init
    render();

})();

