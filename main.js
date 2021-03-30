// variable definitions
let turnScore, globalScore, gameState, activePlayer;

init();

// open rules modal
document.querySelector('.read-rules').addEventListener('click', function() {
    let modal = document.getElementById('rules-modal');
    modal.classList.add('flex');
    modal.classList.remove('hidden');
});

// close rules modal
document.querySelector('#close-btn').addEventListener('click', function(){
    let modal = document.getElementById('rules-modal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
});

// roll dice
document.querySelector('.roll-dice').addEventListener('click', function(){
    if(gameState) {
        // calculate the number rolled
        let dice;
        dice = Math.floor(Math.random() * 6) + 1;

        // modify the dice image
        document.querySelector('#diceImg').src = '/img/dice-' + dice + '.svg';

        // play dice audio
        document.querySelector('#dice-audio').play();

        // unhide dice
        document.querySelector('#dice').classList.remove('hidden');

        // add value of dice to turnScore
        if(dice > 1){
            turnScore += dice;

            // show change in UI
            document.querySelector('.current-score-' + activePlayer).textContent = turnScore;
        } else {
            changePlayer();
        }
    }
});

// save & pass
document.querySelector('.save-score').addEventListener('click', function() {
    if(gameState) {
        // save value of current score to active player's global score
        globalScore[activePlayer] += turnScore;

        // check if player won
        if (globalScore[activePlayer] >= 100){
            winner();
        }

        // reflect change in UI
        document.querySelector('.global-score-' + activePlayer).textContent = globalScore[activePlayer];

        changePlayer();
    }

})




// Initialisation function
function init(){

    // initial values
    turnScore = 0;
    globalScore = [0, 0];
    gameState = true;
    activePlayer = 0;

    // change html to follow
    document.querySelector('.global-score-0').textContent = globalScore[0];
    document.querySelector('.global-score-1').textContent = globalScore[1];
    document.querySelector('.current-score-0').textContent = turnScore;
    document.querySelector('.current-score-1').textContent = turnScore;

    // set active player to player 1
    document.querySelector('#player-0').classList.remove('bg-red-200');
    document.querySelector('#player-0').classList.add('bg-red-200');
    document.querySelector('#player-1').classList.remove('bg-red-200');


    // reset text of player names
    document.querySelector('.player-1-name').textContent = 'Player 1';
    document.querySelector('.player-2-name').textContent = 'Player 2';

    // remove red color from name
    document.querySelector('.player-1-name').classList.remove('text-red-500');
    document.querySelector('.player-2-name').classList.remove('text-red-500');

    // hide dice
    document.querySelector('#dice').classList.add('hidden');

}

// change player
function changePlayer() {
    // player loses his current score
    turnScore = 0;
    // show change in UI
    document.querySelector('.current-score-' + activePlayer).textContent = turnScore;
    // change of active player
    activePlayer = +!activePlayer;
    // reflect change of active player in UI
    document.querySelector('#player-0').classList.toggle('bg-red-200');
    document.querySelector('#player-1').classList.toggle('bg-red-200');
}

// new game
document.querySelector('.new-game').addEventListener('click', function(){
    init();
    document.querySelector('#new-audio').play();
});

// winner
function winner(){

    document.querySelector(`.player-${activePlayer + 1}-name`).textContent = 'Winner!!!';

    document.querySelector(`.player-${activePlayer + 1}-name`).classList.add('text-red-500');

    document.querySelector('#win-audio').play();

    // hide dice
    document.querySelector('#dice').classList.add('hidden');

    gameState = false;

}
