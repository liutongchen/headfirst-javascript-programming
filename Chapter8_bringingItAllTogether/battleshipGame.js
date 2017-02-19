//global variable
guessList = [];

//helper function
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocation();
};



function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
};

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess[0];
        var row = alphabet.indexOf(firstChar);
        var column = guess[1];
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.")
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!")
        } else {
            return row + column
        }
    }
    return null
}

function trackGuess(guess) {
    //return true if the guess is new and false if already exists
    if (guessList.indexOf(guess) === -1) {
        guessList.push(guess);
        return true;
    } else {
        alert("You've already made this guess!");
        return false
    }
}

//global object
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}
       
var model = {
    boardSize: 7,
    numShips: 3,
    shipSunk: 0,
    shipLength: 3,
    ships: [{locations: [0, 0, 0], hits:["", "", ""]},
            {locations: [0, 0, 0], hits:["", "", ""]},
            {locations: [0, 0, 0], hits:["", "", ""]}],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                //display message on the page and the grid
                view.displayHit(guess);
                view.displayMessage("HIT!");
                //check whether is sunk
                
                if (this.isSunk(ship)) {
                    this.shipSunk++;
                    view.displayMessage("You sank my battleship!");
                };
                return true
            } 
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false
    },

    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true
    },

    generateShipLocation: function() {
        var locations
        for (var i = 0; i < this.numShips; i++) {
            do {
            locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row;
        var col;
        var newShipLocations = [];
        if (direction === 1) {
            //generate a starting location for a horizontal ship 
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * ((this.boardSize - this.shipLength) + 1));
            //add all the locations for the horizontal ship 
            for (var i = 0; i < this.shipLength; i++) {
                newShipLocations.push(row + "" + (col + i));
            }
        } else {
            //generate a starting location for a vertical ship
            row = Math.floor(Math.random() * ((this.boardSize - this.shipLength) + 1));
            col = Math.floor(Math.random() * this.boardSize);
            //add all the locations for the vertical ship
            for (var i = 0; i < this.shipLength; i++) {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        var shipLocation
        for (var i = 0; i < this.numShips; i++) {
            shipLocation = this.ships[i].locations;
            for (var j = 0; j < this.shipLength; j++) {
                if (shipLocation.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

var controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            var isNewGuess = trackGuess(location);
            if (isNewGuess) {
                this.guesses ++;
                var hit = model.fire(location);
                if (hit && model.shipSunk === model.numShips) {
                    view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");
                    alert("Game Over");
                }
            }
        }
    }
}

window.onload = init;