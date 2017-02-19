var items = {
    getPropertyName: function(obj) {
        //return the property name of one object
        var propertyNameArray = [];
        for (var i in obj) {
            propertyNameArray.push(i);
        };
        return propertyNameArray;
    },

    isNum: function(obj, propertyName) {
        //return true if the value of a property is a number and vice versa
        return (!isNaN(obj[propertyName]) )
    },

    compareNum: function(itemA, itemB, propertyName) {
        //compare two object based on a number value
        var compareNumFunction = function(itemA, itemB, propertyName) {
            return itemA[propertyName] - itemB[propertyName];
        };
        return compareNumFunction
    },

    compareNotNum: function(itemA, itemB, propertyName) {
        ////compare two object based on a value that is not a number
        var compareNotNumFunction = function(itemA, itemB, propertyName) {
            if (itemA[propertyName] > itemB[propertyName]) {
                return 1;
            } else if (itemA[propertyName] === itemB[propertyName]) {
                return 0;
            } else {
                return -1;
            }
        }
        return compareNotNumFunction
    },

    generateFunctions: function(obj) {
        //given an object, return an array of objects composed of property name and its corresponding function
        var propertyNameArray = this.getPropertyName(obj);
        var functionArray = []
        for (var i = 0; i < propertyNameArray.length; i++) {
            if (this.isNum(obj, propertyNameArray[i])) {
                var functionObj = {};
                functionObj[propertyNameArray[i]] = this.compareNum;
                functionArray.push(functionObj);
            } else {
                var functionObj = {};
                functionObj[propertyNameArray[i]] = this.compareNotNum;
                functionArray.push(functionObj);
            }
        }
        return functionArray;
    }
};

var controller = {
    printProducts: function(products) {
        for (var i = 0; i < products.length; i++) {
        console.log("Name: " + products[i].name +
                    ", calories: " + products[i].calories + 
                    ", color: " + products[i].color +
                    ", sold: " + products[i].sold);
    }
    },

    sortProducts: function(products, compareFunction) {
        return products.sort(compareFunction);
    },

    processOrder: function(products, order) {
        //receive order and output the compare function
        var obj = products[Math.floor(Math.random()*products.length)];
        var functionArray = items.generateFunctions(obj);
        var compareFunction
        for (var i = 0; i < functionArray.length; i++) {
                var proAndFuncObj = functionArray[i]
                for (var j in proAndFuncObj) {
                    var propertyName = j;
                    if (order === propertyName) {
                        compareFunction = proAndFuncObj[propertyName];
                        return compareFunction;
                    }
                }
            }
        },

    printReorderedProducts: function(products, order) {
        var compareFunction = this.processOrder(products, order);
        var compare
        var reOrderedProducts = this.sortProducts(products, compareFunction);
        this.printProducts(reOrderedProducts);
    }
    }

var products = [ { name: "Grapefruit", calories: 170, color: "red", sold: 8200 },
                 { name: "Orange", calories: 160, color: "orange", sold: 12101 },
                 { name: "Cola", calories: 210, color: "caramel", sold: 25412 },
                 { name: "Diet Cola", calories: 0, color: "caramel", sold: 43922 },
                 { name: "Lemon", calories: 200, color: "clear", sold: 14983 },
                 { name: "Raspberry", calories: 180, color: "pink", sold: 9427 },
                 { name: "Root Beer", calories: 200, color: "caramel", sold: 9909 },
                 { name: "Water", calories: 0, color: "clear", sold: 62123 } ];




var functionArray = items.generateFunctions({ name: "Grapefruit", calories: 170, color: "red", sold: 8200 });
for (var i = 0; i<functionArray.length; i++) {
    for (j in functionArray[i]) {
        console.log("propertyName: ", j)
        console.log("function: ", functionArray[i][j])
    }
}

//although I have the compare function compareNum and compareNotNum, I cannot set the propertyname right. May I can 
//try to make compareNum and compareNotNum return functions depending on different property names?

