// Ejercicio 1: Tabla de cuadrados y cubos
function generarTabla() {
    const numero = parseInt(prompt("Ingrese un número:"));
    if (isNaN(numero) || numero <= 0) {
        alert("Por favor ingrese un número válido mayor a 0");
        return;
    }

    let tabla = "<table class='w-full border-collapse'>";
    tabla += "<tr class='bg-gray-100'><th class='border p-2'>Número</th><th class='border p-2'>Cuadrado</th><th class='border p-2'>Cubo</th></tr>";
    
    for (let i = 1; i <= numero; i++) {
        tabla += `<tr>
            <td class='border p-2'>${i}</td>
            <td class='border p-2'>${i * i}</td>
            <td class='border p-2'>${i * i * i}</td>
        </tr>`;
    }
    tabla += "</table>";
    document.getElementById("resultadoTabla").innerHTML = tabla;
}

// Ejercicio 2: Suma y tiempo de respuesta
function iniciarSuma() {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const inicio = new Date().getTime();
    
    const respuesta = prompt(`¿Cuánto es ${num1} + ${num2}?`);
    const fin = new Date().getTime();
    const tiempoTranscurrido = (fin - inicio) / 1000;
    
    const sumaCorrecta = num1 + num2;
    const esCorrecta = parseInt(respuesta) === sumaCorrecta;
    
    document.getElementById("resultadoSuma").innerHTML = `
        <p class='mb-2'>Respuesta ${esCorrecta ? 'correcta' : 'incorrecta'}.</p>
        <p class='mb-2'>Tiempo: ${tiempoTranscurrido.toFixed(2)} segundos.</p>
        <p>La suma de ${num1} + ${num2} = ${sumaCorrecta}</p>`;
}

// Ejercicio 3: Contador
function contador(arr) {
    let negativos = 0, ceros = 0, positivos = 0;
    
    for (let num of arr) {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    }
    
    return { negativos, ceros, positivos };
}

function probarContador() {
    const casos = [
        [-1, 0, 2, -3, 4, 0, 5],
        [1, 2, 3, 4, 5],
        [-1, -2, -3],
        [0, 0, 0]
    ];

    let resultado = "<h4 class='font-bold mb-4'>Pruebas del contador:</h4>";
    casos.forEach(caso => {
        const conteo = contador(caso);
        resultado += `
            <div class='mb-4'>
                <p class='mb-2'>Arreglo: [${caso}]</p>
                <p>Negativos: ${conteo.negativos}, 
                   Ceros: ${conteo.ceros}, 
                   Positivos: ${conteo.positivos}</p>
            </div>`;
    });

    document.getElementById("resultadoContador").innerHTML = resultado;
}

// Ejercicio 4: Promedios
function promedios(matriz) {
    return matriz.map(fila => {
        const suma = fila.reduce((a, b) => a + b, 0);
        return suma / fila.length;
    });
}

function probarPromedios() {
    const matriz = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const resultado = promedios(matriz);
    let salida = "<h4 class='font-bold mb-4'>Matriz original:</h4>";
    matriz.forEach(fila => {
        salida += `<p class='mb-2'>[${fila}]</p>`;
    });
    salida += "<h4 class='font-bold my-4'>Promedios:</h4>";
    salida += `<p>[${resultado.map(n => n.toFixed(2))}]</p>`;

    document.getElementById("resultadoPromedios").innerHTML = salida;
}

// Ejercicio 5: Inverso
function inverso(numero) {
    return parseInt(numero.toString().split('').reverse().join(''));
}

function calcularInverso() {
    const numero = document.getElementById("numeroInverso").value;
    if (!numero) {
        alert("Por favor ingrese un número");
        return;
    }
    const resultado = inverso(Math.abs(parseInt(numero)));
    document.getElementById("resultadoInverso").innerHTML = `
        <p class='mb-2'>Número original: ${numero}</p>
        <p>Número inverso: ${resultado}</p>`;
}

// Ejercicio 6: Conversor de temperatura
class ConversorTemperatura {
    constructor() {
        this.unidades = ['C', 'F', 'K'];
    }

    convertirDesdeC(temp, unidadDestino) {
        switch(unidadDestino) {
            case 'C': return temp;
            case 'F': return (temp * 9/5) + 32;
            case 'K': return temp + 273.15;
        }
    }

    convertirA(temp, unidadOrigen, unidadDestino) {
        let tempC;
        switch(unidadOrigen) {
            case 'C': tempC = temp; break;
            case 'F': tempC = (temp - 32) * 5/9; break;
            case 'K': tempC = temp - 273.15; break;
        }
        return this.convertirDesdeC(tempC, unidadDestino);
    }
}

function convertirTemperatura() {
    const conversor = new ConversorTemperatura();
    const temp = parseFloat(document.getElementById("temperatura").value);
    const unidadOrigen = document.getElementById("unidadOrigen").value;
    
    if (isNaN(temp)) {
        alert("Por favor ingrese una temperatura válida");
        return;
    }

    let resultado = "<h4 class='font-bold mb-4'>Resultados de la conversión:</h4>";
    conversor.unidades.forEach(unidadDestino => {
        if (unidadDestino !== unidadOrigen) {
            const tempConvertida = conversor.convertirA(temp, unidadOrigen, unidadDestino);
            resultado += `<p class='mb-2'>${temp}°${unidadOrigen} = ${tempConvertida.toFixed(2)}°${unidadDestino}</p>`;
        }
    });

    document.getElementById("resultadoTemperatura").innerHTML = resultado;
}

// Pruebas automáticas
console.assert(inverso(123) === 321, "Error en inverso(123)");
console.assert(inverso(500) === 5, "Error en inverso(500)");

const testContador = contador([-1, 0, 2, -3, 4, 0, 5]);
console.assert(testContador.negativos === 2, "Error en contador - negativos");
console.assert(testContador.ceros === 2, "Error en contador - ceros");
console.assert(testContador.positivos === 3, "Error en contador - positivos");

const testPromedios = promedios([[1,2,3], [4,5,6]]);
console.assert(testPromedios[0] === 2, "Error en promedios - primera fila");
console.assert(testPromedios[1] === 5, "Error en promedios - segunda fila");