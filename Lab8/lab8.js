const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 1. Función para calcular el promedio de un arreglo
function calcularPromedio(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error('Debe proporcionar un arreglo no vacío de números');
    }
    
    const suma = numeros.reduce((acc, curr) => acc + curr, 0);
    return suma / numeros.length;
}

// 2. Función para escribir string en archivo
function escribirEnArchivo(contenido, nombreArchivo) {
    try {
        fs.writeFileSync(nombreArchivo, contenido);
        console.log(`Contenido escrito exitosamente en ${nombreArchivo}`);
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
        throw error;
    }
}

// 3. Implementación del algoritmo 6k±1 para números primos
function esPrimo(numero) {
    if (numero <= 1) return false;
    if (numero <= 3) return true;
    if (numero % 2 === 0 || numero % 3 === 0) return false;

    for (let k = 5; k * k <= numero; k += 6) {
        if (numero % k === 0 || numero % (k + 2) === 0) {
            return false;
        }
    }
    return true;
}

function encontrarPrimosHasta(limite) {
    const primos = [];
    for (let n = 2; n <= limite; n++) {
        if (esPrimo(n)) {
            primos.push(n);
        }
    }
    return primos;
}

// Menú principal
function mostrarMenu() {
    console.log('\n=== MENÚ DE OPCIONES ===');
    console.log('1. Calcular promedio de números');
    console.log('2. Escribir texto en archivo');
    console.log('3. Encontrar números primos');
    console.log('4. Salir');
    console.log('=====================');
}

// Función para manejar el cálculo de promedio
async function manejarPromedio() {
    return new Promise((resolve) => {
        rl.question('Ingresa los números separados por comas (ejemplo: 1,2,3,4,5): ', (input) => {
            const numeros = input.split(',').map(num => parseFloat(num.trim()));
            if (numeros.some(isNaN)) {
                console.log('Error: Ingresa solo números válidos');
            } else {
                const promedio = calcularPromedio(numeros);
                console.log(`El promedio es: ${promedio}`);
            }
            resolve();
        });
    });
}

// Función para manejar la escritura en archivo
async function manejarEscrituraArchivo() {
    return new Promise((resolve) => {
        rl.question('Ingresa el contenido a escribir: ', (contenido) => {
            rl.question('Ingresa el nombre del archivo: ', (nombreArchivo) => {
                escribirEnArchivo(contenido, nombreArchivo);
                resolve();
            });
        });
    });
}

// Función para manejar búsqueda de primos
async function manejarPrimos() {
    return new Promise((resolve) => {
        rl.question('Ingresa hasta qué número quieres encontrar primos: ', (input) => {
            const limite = parseInt(input);
            if (isNaN(limite) || limite < 2) {
                console.log('Error: Ingresa un número válido mayor o igual a 2');
            } else {
                const primos = encontrarPrimosHasta(limite);
                console.log(`Números primos hasta ${limite}: ${primos.join(', ')}`);
            }
            resolve();
        });
    });
}

// Función principal que maneja el menú
async function main() {
    while (true) {
        mostrarMenu();
        const respuesta = await new Promise((resolve) => {
            rl.question('Selecciona una opción (1-4): ', resolve);
        });

        switch (respuesta) {
            case '1':
                await manejarPromedio();
                break;
            case '2':
                await manejarEscrituraArchivo();
                break;
            case '3':
                await manejarPrimos();
                break;
            case '4':
                rl.close();
                return;
            default:
                console.log('Opción no válida. Por favor, intenta de nuevo.');
        }
    }
}

// Iniciar el programa
main().catch(console.error);