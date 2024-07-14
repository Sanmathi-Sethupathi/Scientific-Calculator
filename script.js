// JavaScript for Scientific Calculator

// Selecting elements
var screen = document.getElementById('scr');
var btns = document.querySelectorAll('.button');
var historyList = []; // Array to store calculation history

// Add event listeners for button clicks

// Add event listener for keyboard input
document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior
        equal();
    } else if (/[\d\.+\-*/%()]/.test(key)) {
        handleInput(key);
    } else if (key === 'Backspace') {
        handleInput('CE');
    }
});

// Add event listener for clicking on the screen
screen.addEventListener('click', function() {
    this.focus(); // Ensure the screen is focused for keyboard input
});

// Function to handle input from both buttons and keyboard
function handleInput(value) {
    switch(value) {
        case 'C':
            screen.value = '';
            break;
        case 'CE':
            screen.value = screen.value.slice(0, -1);
            break;
        case '=':
            equal();
            break;
        default:
            addToScreen(value);
            break;
    }
}

// Function to add value to the calculator screen
function addToScreen(value) {
    // Handle specific button values
    switch(value) {
        case 'x²':
            screen.value += '^2';
            break;
        case 'Mod':
            screen.value += '%';
            break;
        case 'Abs':
            screen.value += 'abs(';
            break;
        case '&radic;':
            screen.value += 'sqrt(';
            break;
        case '&plusmn;':
            screen.value = '-' + screen.value;
            break;
        default:
            if (value === '.' && screen.value.includes('.')) {
                // Prevent adding multiple decimal points
                return;
            }
            screen.value += value;
            break;
    }
}

// Function to evaluate the expression on the screen
function equal() {
    try {
        var expression = screen.value;
        var result = eval(expression);

        // Check for mathematical errors
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }

        screen.value = result;
        addToHistory(expression, result); // Add to history
    } catch(err) {
        screen.value = 'Error!';
    }
}

// Function to calculate factorial of a number
function factorial() {
    var num = parseFloat(screen.value);
    if (isNaN(num)) {
        screen.value = 'Error!';
    } else if (num < 0) {
        screen.value = 'Error! Factorial of a negative number is undefined.';
    } else {
        var f = 1;
        for (var i = 1; i <= num; i++) {
            f *= i;
        }
        screen.value = f;
        addToHistory(`factorial(${num})`, f); // Add to history
    }
}

// Function to negate the number on the screen
function negate() {
    var num = parseFloat(screen.value);
    if (isNaN(num)) {
        screen.value = 'Error!';
    } else {
        var neg = -num;
        screen.value = neg;
        addToHistory(`-${num}`, neg); // Add to history
    }
}

// Function to calculate percentage of a number
function percentage() {
    var num = parseFloat(screen.value);
    if (isNaN(num)) {
        screen.value = 'Error!';
    } else {
        var per = num / 100;
        screen.value = per;
        addToHistory(`${num}%`, per); // Add to history
    }
}

// Function to add a calculation to history
function addToHistory(expression, result) {
    historyList.push({ expression: expression, result: result });
}

// Function to show the calculation history
function showHistory() {
    var historyString = "Calculation History:\n";
    historyList.forEach((item, index) => {
        historyString += `${index + 1}. ${item.expression} = ${item.result}\n`;
    });
    alert(historyString);
}

// Function to turn off the calculator screen and disable buttons
function offScreen() {
    screen.value = "";
    screen.style.background = "#636361";
    screen.style.border = "1px solid #636361";

    btns.forEach(btn => {
        btn.disabled = true;
    });
}

// Initially turn off the screen and disable buttons
offScreen();

// Function to turn off the calculator screen and disable buttons
function s_off() {
    offScreen();
}

// Function to turn on the calculator screen and enable buttons
function s_on() {
    screen.style.background = "rgb(241, 241, 241)";
    screen.style.border = "2px solid #c0c0c0";
    btns.forEach(btn => {
        btn.disabled = false;
    });
}
