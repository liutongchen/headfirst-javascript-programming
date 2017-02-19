//helper functions
/*
function compareSold(colaA, colaB) {
    //sort the cola by number of bottles sold in ascending order
    return colaA.sold - colaB
}

function compareName(colaA, colaB) {
    if (colaA.name > colaB.name) {
        return 1
    } else if (colaA.name === colaB.name) {
        return 0
    } else {
        return -1
    }
}

function compareCalories(colaA, colaB) {
    return colaA.calories - colaB.calories
}

function compareColor(colaA, colaB) {
    if (colaA.color > colaB.color) {
        return 1;
    } else if (colaA.color === colaB.color) {
        return 0;
    } else {
        return -1
    }
}
*/


function printProducts(products) {
    for (var i = 0; i < products.length; i++) {
        console.log("Name: " + products[i].name +
                    ", calories: " + products[i].calories + 
                    ", color: " + products[i].color +
                    ", sold: " + products[i].sold);
    }
}

//controller function
function printOrderedProducts(order) {
    var functionName = "compare" + order[0].toUpperCase() + order.substring(1);
    var orderedProducts = products.sort(window[functionName]);
    printProducts(orderedProducts)
}


var products = [ { name: "Grapefruit", calories: 170, color: "red", sold: 8200 },
                 { name: "Orange", calories: 160, color: "orange", sold: 12101 },
                 { name: "Cola", calories: 210, color: "caramel", sold: 25412 },
                 { name: "Diet Cola", calories: 0, color: "caramel", sold: 43922 },
                 { name: "Lemon", calories: 200, color: "clear", sold: 14983 },
                 { name: "Raspberry", calories: 180, color: "pink", sold: 9427 },
                 { name: "Root Beer", calories: 200, color: "caramel", sold: 9909 },
                 { name: "Water", calories: 0, color: "clear", sold: 62123 } ];

var order = prompt("In what order do you want to reorganize your products? Please enter Name/Colories/Color/Sold:")
printOrderedProducts(order);

/*
products.sort(compareName);
console.log("Products sorted by name:");
printProducts(products);

products.sort(compareCalories);
console.log("Products sorted by calories:");
printProducts(products);

products.sort(compareColor);
console.log("Products sorted by color: ");
printProducts(products);
*/