//global variables
var hit = 0;
var guessTimes = 0;
var isSunk = false;
while (!isSunk) {
    //get user guess 
    var userGuess = prompt("Guess a number from 0 to 6 to attack: ");
    if (userGuess < 0 || userGuess > 6 || Number(userGuess == NaN)) {
        alert("Please enter a valid input")
    } else if (userGuess == null) {
        break
    }
    else {
        guessTimes += 1;

        //get ship position
        var shipHead = Math.floor(Math.random() * 7);
        var shipTail = shipHead + (2 - hit);

        //evaluate user guess 
        if ((userGuess >= shipHead) && (userGuess <= shipTail)) {
            hit += 1;
            alert("You have hit the ship!");
            if (hit == 3) {
                isSunk = true;
                alert("You have sank the ship!");
            };
        } else {
            alert("You missed...");
        };
    };
    }
    

alert("You took " + guessTimes + " guesses to sink the battleship, " +
"which means your shooting accuracy was " + (3/guessTimes));