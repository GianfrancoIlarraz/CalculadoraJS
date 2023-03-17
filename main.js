const sum = (num1, num2) => num1 + num2

const subtract = (num1, num2) => num1 - num2

const multiply = (num1, num2) => num1 * num2

const divide = (num1, num2) => num1 / num2

const readElement1 = () => {
    let element
    do {
        element = parseInt(prompt('Enter the first element to operate on: '))
        if (isNaN(element)) {
            alert('Please enter a number')
        }
    } while (isNaN(element));
    return element
}


const readElement2 = () => {
    let element
    do {
        element = parseInt(prompt('Enter the second element to operate on: '))
        if (isNaN(element)) {
            alert('Please enter a number')
        }
    } while (isNaN(element));
    return element
}

const calculate = (operation) => {
    let num1
    let num2

    switch (operation) {
        case '+':
            num1 = readElement1()
            num2 = readElement2()
            alert('The result was: ' + sum(num1, num2))
            break;
        case '-':
            num1 = readElement1()
            num2 = readElement2()
            alert('The result was: ' + subtract(num1, num2))
            break;
        case '*':
            num1 = readElement1()
            num2 = readElement2()
            alert('The result was: ' + multiply(num1, num2))
            break;
        case '/':
            num1 = readElement1()
            num2 = readElement2()
            alert('The result was: ' + divide(num1, num2))
            break;

        default:
            alert('Unknown operation: ' + operation)
            break;
    }
}



alert('Welcome to the Calculator')
let keepGoing = false
do {
    let operation = prompt('What operation do you want to do? (+, -, *, /)')
    calculate(operation)
    keepGoing = confirm('Do you want to do another operation?')
} while (keepGoing);
alert('Thanks for using the Calculator')


