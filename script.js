var secret_code = generateCode();
var chances = 0;
document.getElementById("submit").addEventListener("click", getInput);


function getInput() {
    var x = document.getElementById('i_p').value;
    var o_p = document.getElementById("o_p");
    o_p.innerHTML = x;
    processInput(x);
}

function processInput(input) {
    var n = input.length;
    if (document.getElementById("submit").innerHTML === "Reset") {
        cleanAll();
        return;
    }
    else if (n > 4) {
        o_p.innerHTML = "Input exceeds 4 digits!";
        return;
    }
    else if (n < 4) {
        o_p.innerHTML = "Input is less than 4 digits!";
        return;
    }
    else if (chances === 5) {
        document.getElementById("is_game").innerHTML = "SORRY YOU LOST:(";
        resetGame();
        return;
    }
    else {
        chances++;
        checkSubmission(input);
        return;
    }

    return;
}

function generateCode() {
    var code = "";
    for (var i = 0; i < 4; i++) {
        var n = getRandomIntInclusive(0, 9);
        code += n.toString();
    }
    return code;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function checkSubmission(usr_input) {
    var match = false;
    if (usr_input === secret_code) {
        document.getElementById("is_game").innerHTML = "Good guess! You won!!";
        resetGame();
    }
    var result = ""

    for (var i = 0; i < 4; i++) {
        var found = false;
        if (usr_input[i] === secret_code[i]) {
            result += "Y";
            found = true;
            continue;
        }
        for (var j = 0; j < 4; j++) {
            if (usr_input[i] === secret_code[j]) {
                result += "E";
                found = true;
                break;
            }
        }
        if (!found) {
            result += "X";
        }
    }
    document.getElementById("check").innerHTML = result;
    showSubmission(result, usr_input);
    return;
}

function showSubmission(result, usr_input) {
    var ul = document.getElementById("step");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(usr_input + " >>>   " + result));
    ul.appendChild(li);
}

function resetGame() {
    document.getElementById("submit").innerHTML = "Reset";
}

function cleanAll() {
    secret_code = generateCode();
    step_counter = 0;
    document.getElementById("o_p").innerHTML = "";
    document.getElementById("check").innerHTML = "";
    document.getElementById("is_game").innerHTML = "Keep Guessing!!";
    document.getElementById("step").innerHTML = "<li><b>Guess    &nbsp;&nbsp;&nbsp;     Result</b></li>";
    document.getElementById("submit").innerHTML = "Submit";
    return;
}

