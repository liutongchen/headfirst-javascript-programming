var scores = [60, 50, 60, 58, 54, 54,
              58, 50, 52, 54, 48, 69, 
              34, 55, 51, 52, 44, 51,
              69, 64, 66, 55, 52, 61, 
              46, 31, 57, 52, 44, 18, 
              41, 53, 55, 61, 51, 44];

function findMax(lst) {
    var presentMaxSolution = lst[0];
    var presentMaxIndex = [0];
    for(var j = 0; j < lst.length; j++) {
        if (lst[j] > presentMaxSolution) {
            presentMaxSolution = lst[j];
            presentMaxIndex = [];
            presentMaxIndex.push(j);
        } else if (lst[j] == presentMaxSolution) {
            presentMaxIndex.push(j);
        }
        
    };
    return [presentMaxSolution, presentMaxIndex];
}
//to print out the solution and the result
for (var i = 0; i < scores.length; i++) {
    document.write("Bubble solution #" + i + " score: " + scores[i] + "<br>");
};  

//to find out the how many tests
document.write("<br>" + "<br>" + "Bubbles tests: " + scores.length + "<br>");

//to find out the best solution and its indices
var maxSolution = findMax(scores)[0];
var maxIndex = findMax(scores)[1];
document.write("Highest bubble score: " + maxSolution + "<br>");
document.write("Solutions with highest score: ");
for (var id = 0; id < maxIndex.length; id++) {
     document.write("#" + maxIndex[id] + "  ");
}

