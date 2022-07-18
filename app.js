const Player = (name, mark) => {
    return {name, mark}
}

const player1 = Player("You", "X");
const player2 = Player("PC", "O")

const gameboard = (() => {

    let currentPlayer = player1;

    const gameboard = ["","","",
                       "","","",
                       "","",""];

    // cache dom
    const gameboardContainer = document.querySelector(".gameboard-container");

    // binding elements
    for(let i = 0; i<gameboardContainer.children.length; i++) {
        gameboardContainer.children[i].addEventListener("click", (e) => {
            addMark(e.target.dataset.index, currentPlayer.mark)
        })
    }

    // render board
    const render = () => {
        for(let i = 0; i<gameboard.length; i++) {
            gameboardContainer.children[i].textContent = gameboard[i];
        }
    }
        
    // functions
    const addMark = (index, mark) => {
        if(gameboard[index] !== "") {
            return;
        }
        gameboard[index] = mark; 
        render();
        swapPlayer();
        console.log(checkWhoWon())
    }

    const swapPlayer = () => {
        if(currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    const checkWhoWon = () => {
        if(gameboard[0] === gameboard[1] && gameboard[2] === gameboard[1]) {
            return gameboard[0];
        } else if(gameboard[3] === gameboard[4] && gameboard[5] === gameboard[4]) {
            return gameboard[3];
        } else if(gameboard[6] === gameboard[7] && gameboard[8] === gameboard[7]) {
            return gameboard[6];
        } else if(gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]) {
            return gameboard[0];
        } else if(gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7]) {
            return gameboard[1];
        } else if(gameboard[2] === gameboard[5] && gameboard[8] === gameboard[5]) {
            return gameboard[2];
        } else if(gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8]) {
            return gameboard[0];
        } else if(gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6]) {
            return gameboard[2];
        }
    }


    render();

})();

