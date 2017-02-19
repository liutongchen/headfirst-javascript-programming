var cadi = {
    make: "GM",
    model: "Cadillac",
    year: 1955,
    color: "tan",
    passengers: 5,
    convertible: false,
    mileage: 12892
}

function prequal(car) {
    if (car.year > 1960) {
        return false;
    } else if (car.mileage > 10000) {
        return false;
    } else {
        return true;
    }
}

function printSuggestions(car) {
    var worthLook = prequal(car);
    if (worthLook) {
        console.log("You gotta check out this " + car.make + " " + car.model);
    } else {
        console.log("You shoud really pass on the " + car.make + " " + car.model);
    }
}

printSuggestions(cadi);