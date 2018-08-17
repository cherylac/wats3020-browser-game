/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// TODO: Create a class called `Player`. The `constructor()` should look for a
// parameter called `token` and should set `this.token` as a property of
// the class.
class Player {
    constructor(token){
        this.token = token;
    }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // TODO: Set up `this.player1` and `this.player2` properties.
        // These properties should be new Player class instances.
        // You may set the "token" to anything that corresponds to a Glyphicon
        // icon name ('heart', 'star', 'remove-sign', 'unchecked', 'bell',
        // 'certificate', etc.)
        this.player1 = new Player('remove-sign');
        this.player2 = new Player('unchecked');

        // TODO: Initialize several  properties that will be used to track game
        // progress.

        
        this.currentPlayer = null;
       
        this.gameStatus = null;
        
        this.winner = null;
        
        this.moveCount = 0;
       
        this.startPrompt = document.querySelector('#start-prompt');
        
        this.movePrompt = document.querySelector('#move-prompt');
       
        this.currentPlayerToken = document.querySelector('#player-token');
        
        this.gameboard = document.querySelector('#gameboard');
       
        this.winScreen = document.querySelector('#win-screen');
      
        this.winnerToken = document.querySelector('#winner-token');
       
        this.drawScreen = document.querySelector('#draw-screen');
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // If we've gotten here, then we need to createa  `win` event and
                // dispatch it.

                
                let winEvent = new Event('win');
                document.dispatchEvent(winEvent);
                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

           
            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent');
        }
    }

    recordMove(event){
        console.log('Recording Player Move.');
        // This method handles recording a move in the `this.gameState` property.
        // To record a move, we must accmoplish the following:

        // 1. Find the X, Y coordinates of the tile that was just selected
        // 2. Claim that tile in the `this.gameState` array
        // 3. Set the class attribute of the tile to reflect which player has claimed it

        // TODO: Define a variable called `tile_x` that equals the `data-x` attribute on the `event.target`.
        let tileX = event.target.dataset.x;
        // TODO: Define a variable called `tile_y` that equals the `data-y` attribute on the `event.target`.
        let tileY = event.target.dataset.y;
        // TODO: Claim this spot in the `this.gameState` array for the player.
        this.gameState[tileX][tileY] = this.currentPlayer.token;
        // TODO: Set the class on the `event.target` to show the player's token. The class
        // should be: `tile played glyphicon glyphicon-${this.currentPlayer.token}`.
        event.target.setAttribute('class', `tile glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    switchPlayer(){
        console.log('Switching Player.');
        // This method handles switching between players after each move.
        // It must determine who the current player is, and then switch to the
        // other player. After that, it must set the class on the
        // `this.currentPlayerToken` property to show the proper class.

        // TODO: Make a conditional that checks to see if `this.currentPlayer`
        // is equal to `this.player1` If so, set `this.currentPlayer` to
        // `this.player2`. If not, set `this.currentPlayer` equal to
        // `this.player1`. (You will use an if/else statement to do this.)
        if (this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
        }   else {
            this.currentPlayer = this.player1;
        }

        
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    setUpTileListeners(){
        console.log('Setting up tile listeners.');
        // This method sets up event listeners for tiles. It is called when we
        // start a new game. It must find all the tiles and apply event listeners
        // to them.

        // TODO: Select all of the `.tile` elements into a variable called
        // `tileElements`.
        let tileElements = document.querySelectorAll('.tile');
        // TODO: Use a loop to add a "click" event listener to each tile that
        // will call the `handleMove` function whenever a tile is clicked.
        for (let tile of tileElements){
            tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
        // This method displays the end game screen for a Win.

        // TODO: Change the `class` attribute on the `this.winScreen` property
        // to "show".

        // TODO: Change the `class` attribute on the `this.winnerToken` property
        // to show the proper winner's token.
    }
    showDrawScreen(){
        // This method displays the end game screen for a Draw.

        // TODO: Set the `class` attribute on the `this.drawScreen` property
        // to "show".
    }
    setUpBoard(){
        console.log('Setting up gameboard.');
        this.gameboard.innerHTML = '';
        // We must draw the game board by using a loop to create rows with
        // tiles in them. We want to create the same structure as we see in the
        // index.html file.
        for (let i=0; i<3; i++){  
            
            let newRow = document.createElement('div');
            
            newRow.setAttribute('class', 'row');
            // TODO: Create another `for` loop to make the colums to contain the
            // tiles. This `for` loop should also loop 3 times. The counter
            // variable in this loop should be called `j`.
            for (let j=0; j<3; j++){
               
                let newCol = document.createElement('div');
                
                newCol.setAttribute('class', 'col-xs-3');
                
                let newTile = document.createElement('span');    
                
                newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');
                
                newTile.dataset.x = i;
                
                newTile.dataset.y = j;

                newCol.appendChild(newTile);
                
                newRow.appendChild(newCol);
            }
                
            // Second `for` loop ends here.

            this.gameboard.appendChild(newRow);
        }
       

        // NOTE: Your first `for` loop should end here.

        // TODO: Call `this.setUpTileListeners()` to add event listeners to the
        // `.tile` elements.
        this.setUpTileListeners();
    }
    initializeMovePrompt(){
        console.log('Initializing Move Prompt.');
        // This method initializes the `this.movePrompt` element.
        
        this.startPrompt.setAttribute('class', 'hidden');
        
        this.movePrompt.setAttribute('class', '');
        
        this.currentPlayer = this.player1;
        
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    start(){
        // This method handles the logic to create a new game. 
        console.log('Starting game');
        
        this.setUpBoard();
        
        this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfull play.
let game;

document.addEventListener('DOMContentLoaded', function(event){
     
    let startButton = document.querySelector('#start-button');
    
    startButton.addEventListener('click', function(event){
        game = new TicTacToe();
        game.start();
    });
        

        

    // NOTE: End of the `startButton` event listener here.
     
})
  

// NOTE: End of the "DOMContentLoaded" event listener here.


// TODO: Add an event listener on the `document` object that listens for the
// "win" event signal.

    // TODO: In the handler for the "win" event, call the `game.showWinScreen()`
    // method to display the winning screen.
document.addEventListener('win', function(event){
    console.log('Detected win event.');
    game.showWinScreen();
})
// NOTE: End of the "win" event listener.

// TODO: Add an event listener on the `document` object that listens for the
// "draw" event signal.

    // TODO: In the handler for the "draw" event, call the `game.showDrawScreen()`
    // method to display the tie game screen.
document.addEventListener('draw', function(event){
    console.log('Detected draw event.');
    game.showDrawScreen();
})
// NOTE: End of the "draw" event listener.

// External function for event listeners provided for you.
function handleMove(event){
    console.log('Handling Player move.');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
