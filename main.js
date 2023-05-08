let num1, num2, operacion

let historial
if (localStorage.getItem('historial') == null) {
    historial = []
} else {
    historial = JSON.parse(localStorage.getItem('historial'))
    historial.slice().reverse().forEach(element => {
        let hist = document.createElement("p")
        hist.innerHTML = `${element.num1} ${element.operation} ${element.num2} = ${element.result}`
        document.getElementById("historial").appendChild(hist)
    })
}

class ultimaCuenta {
    constructor(num1, num2, operation, result) {
        this.num1 = num1
        this.num2 = num2
        this.operation = operation
        this.result = result
    }
}

const calculator = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => {
        if (num2 === 0) {
            return "No se puede dividir por cero"
        } else {
            return num1 / num2;
        }
    },
};

function obtenerValores() {
    num1 = parseFloat(document.getElementById("num1").value)
    num2 = parseFloat(document.getElementById("num2").value)
    operacion = document.getElementById("operacion").value
}

function reset() {
    document.getElementById("num1").value = ""
    document.getElementById("num2").value = ""
    document.getElementById("resultado").innerHTML = ""
}

const calculate = () => {
    obtenerValores()
    let resultado
    if (isNaN(num1) || isNaN(num2)) {
        resultado = null
    } else {
        switch (operacion) {
            case "+":
                resultado = calculator.add(num1, num2)
                break;
            case "-":
                resultado = calculator.subtract(num1, num2)
                break;
            case "*":
                resultado = calculator.multiply(num1, num2)
                break;
            case "/":
                resultado = calculator.divide(num1, num2)
                break;

            default:
                resultado = "Uno de los valores no es un numero."
                break;
        }
        if (historial.length >= 10) {
            historial = historial.slice(1)
            historial.push(new ultimaCuenta(num1, num2, operacion, resultado))
        } else {
            historial.push(new ultimaCuenta(num1, num2, operacion, resultado))
        }
        localStorage.setItem("historial", JSON.stringify(historial))
        const docHist = document.getElementById("historial")
        while (docHist.hasChildNodes()) {
            docHist.removeChild(docHist.firstChild)
        }
        historial.slice().reverse().forEach(element => {
            let hist = document.createElement("p")
            hist.innerHTML = `${element.num1} ${element.operation} ${element.num2} = ${element.result}`
            document.getElementById("historial").appendChild(hist)
        })
    }
    document.getElementById("resultado").innerHTML =  resultado ?? 'La operación no es válida'
};

const reiniciarHistorial = () => {
    localStorage.removeItem("historial")
    historial = []
    const docHist = document.getElementById("historial")
    while (docHist.hasChildNodes()) {
        docHist.removeChild(docHist.firstChild)
    }
    reset()
}




const cambioDivisas = () => {
    let original = document.getElementById('original').value
    let cantidad = document.getElementById('cantidad').value
    let divisa = document.getElementById('divisa').value

    let myHeaders = new Headers();
    myHeaders.append("apikey", "dIPlqUY5OZbX7LXntxyCUOuuNDtmlupH");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    if (!isNaN(parseInt(cantidad)) && cantidad >= 0){
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${divisa}&from=${original}&amount=${cantidad}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            document.getElementById('cambioMoneda').innerHTML = JSON.parse(result).result + ` ${divisa}`
        })
        .catch(error => console.log('error', error));
    } else {
        document.getElementById('cambioMoneda').innerHTML = 'No has ingresado un valor válido'
    }
}

document.getElementById('calcularDivisa').addEventListener('click', (e) => {
    cambioDivisas()
})


const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (e) => {
    if (e.target.id == "calcularOperacion") {
        calculate();
    }
    if (e.target.id == "resetForm") {
        reset();
    }
});

document.getElementById("resetHist").addEventListener("click", (e) => {
    swal.fire({
        title: '¿Quieres borrar el historial?',
        text: 'No podrás deshacer este cambio',
        confirmButtonText: 'Sí',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarHistorial()
            swal.fire('Historial borrado :)')
        }
    })
})

document.getElementById("num2").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        document.getElementById("calcularOperacion").click()
    }
})


