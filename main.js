const calculator = {
    suma: (num1, num2) => num1 + num2,
    resta: (num1, num2) => num1 - num2,
    multiplicacion: (num1, num2) => num1 * num2,
    division: (num1, num2) => {
        if (num2 === 0) {
            return 'No se puede dividir por cero'
        } else {
            return num1 / num2
        }
    }
}



const readElement1 = () => {
    let element
    do {
        element = parseInt(prompt('Ingresa el primer valor: '))
        if (isNaN(element)) {
            alert('Por favor ingresa un número')
        }
    } while (isNaN(element));
    return element
}


const readElement2 = () => {
    let element
    do {
        element = parseInt(prompt('Ingresa el segundo valor: '))
        if (isNaN(element)) {
            alert('Por favor ingresa un número')
        }
    } while (isNaN(element));
    return element
}

const calculate = (operation, historial) => {
    let num1
    let num2

    switch (operation) {
        case '+':
            num1 = readElement1()
            num2 = readElement2()
            alert(`El resultado es ${calculator.suma(num1,num2)}`)
            aniadirHistorial(historial, calculator.suma(num1,num2))
            break;
        case '-':
            num1 = readElement1()
            num2 = readElement2()
            alert('El resultado es: ' + calculator.resta(num1,num2))
            aniadirHistorial(historial, calculator.resta(num1,num2))
            break;
        case '*':
            num1 = readElement1()
            num2 = readElement2()
            alert('El resultado es: ' + calculator.multiplicacion(num1,num2))
            aniadirHistorial(historial, calculator.multiplicacion(num1,num2))
            break;
        case '/':
            num1 = readElement1()
            num2 = readElement2()
            res = calculator.division(num1, num2)
            alert('El resultado es: ' + res)
            aniadirHistorial(historial, res)
            break;
            
        case 'H':
            alert('Tus últimos resultados fueron: \n' + historial)
            break;

        default:
            alert('Operación inválida: "' + operation +'"')
            break;
    }
}

const aniadirHistorial = (historial, resultado) => {
    historial.push(resultado)
}





alert('Bienvenido a mi Calculadora')
let keepGoing = false
let historial = []
do {
    let operation = prompt('¿Qué operación quieres hacer? \n\n -Suma ( + ) \n -Resta ( - ) \n -Multiplicación ( * ) \n -División ( / ) \n -Ver historial (H)')
    calculate(operation, historial)
    keepGoing = confirm('¿Quieres hacer alguna otra operación?')
} while (keepGoing);
alert('Gracias por usar mi Calculadora')


