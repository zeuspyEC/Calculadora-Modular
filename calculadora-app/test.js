/**
 * Suite de pruebas para la aplicación de calculadora
 */

const { calculadora, operaciones, Calculadora } = require('./index.js');

// Colores para output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

let testsPasados = 0;
let testsFallidos = 0;

// Función auxiliar para pruebas
function test(descripcion, funcion) {
    try {
        funcion();
        console.log(`${colors.green}✓${colors.reset} ${descripcion}`);
        testsPasados++;
    } catch (error) {
        console.log(`${colors.red}✗${colors.reset} ${descripcion}`);
        console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
        testsFallidos++;
    }
}

// Función para comparar valores
function assert(actual, esperado, mensaje = '') {
    if (actual !== esperado) {
        throw new Error(`${mensaje} - Esperado: ${esperado}, Obtenido: ${actual}`);
    }
}

// Función para comparar valores aproximados (para decimales)
function assertAprox(actual, esperado, tolerancia = 0.0001) {
    if (Math.abs(actual - esperado) > tolerancia) {
        throw new Error(`Esperado: ${esperado} (±${tolerancia}), Obtenido: ${actual}`);
    }
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║                  SUITE DE PRUEBAS - CALCULADORA              ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// PRUEBAS DE SUMA
console.log(`${colors.blue}PRUEBAS DE SUMA${colors.reset}`);
console.log('═══════════════\n');

test('Suma básica de enteros', () => {
    assert(calculadora.sumar(5, 3), 8);
});

test('Suma de números negativos', () => {
    assert(calculadora.sumar(-5, -3), -8);
});

test('Suma con decimales', () => {
    assertAprox(calculadora.sumar(0.1, 0.2), 0.3);
});

test('Suma múltiple', () => {
    assert(calculadora.sumar(1, 2, 3, 4, 5), 15);
});

test('Suma con strings numéricas', () => {
    assert(calculadora.sumar("10", "20"), 30);
});

// PRUEBAS DE RESTA
console.log(`\n${colors.blue}PRUEBAS DE RESTA${colors.reset}`);
console.log('════════════════\n');

test('Resta básica', () => {
    assert(calculadora.restar(10, 4), 6);
});

test('Resta con resultado negativo', () => {
    assert(calculadora.restar(4, 10), -6);
});

test('Resta múltiple', () => {
    assert(calculadora.restar(100, 10, 20, 5), 65);
});

test('Diferencia absoluta', () => {
    assert(operaciones.resta.diferenciaAbsoluta(5, 10), 5);
});

// PRUEBAS DE MULTIPLICACIÓN
console.log(`\n${colors.blue}PRUEBAS DE MULTIPLICACIÓN${colors.reset}`);
console.log('═════════════════════════\n');

test('Multiplicación básica', () => {
    assert(calculadora.multiplicar(6, 7), 42);
});

test('Multiplicación por cero', () => {
    assert(calculadora.multiplicar(100, 0), 0);
});

test('Multiplicación múltiple', () => {
    assert(calculadora.multiplicar(2, 3, 4), 24);
});

test('Potencia', () => {
    assert(calculadora.potencia(2, 10), 1024);
});

test('Factorial', () => {
    assert(calculadora.factorial(5), 120);
});

test('Factorial de 0', () => {
    assert(calculadora.factorial(0), 1);
});

// PRUEBAS DE DIVISIÓN
console.log(`\n${colors.blue}PRUEBAS DE DIVISIÓN${colors.reset}`);
console.log('═══════════════════\n');

test('División básica', () => {
    assert(calculadora.dividir(20, 4), 5);
});

test('División con decimales', () => {
    assertAprox(calculadora.dividir(10, 3), 3.33333, 0.00001);
});

test('División múltiple', () => {
    assert(calculadora.dividir(100, 2, 5), 10);
});

test('División entera', () => {
    assert(operaciones.division.divisionEntera(17, 5), 3);
});

test('Módulo', () => {
    assert(operaciones.division.modulo(17, 5), 2);
});

test('Promedio', () => {
    assert(calculadora.promedio([10, 20, 30, 40]), 25);
});

// PRUEBAS DE ERRORES
console.log(`\n${colors.blue}PRUEBAS DE MANEJO DE ERRORES${colors.reset}`);
console.log('════════════════════════════\n');

test('Error: División por cero', () => {
    try {
        calculadora.dividir(10, 0);
        throw new Error('Debería lanzar error de división por cero');
    } catch (error) {
        if (!error.message.includes('División por cero')) {
            throw error;
        }
    }
});

test('Error: Entrada no numérica en suma', () => {
    try {
        calculadora.sumar('abc', 5);
        throw new Error('Debería lanzar error de número inválido');
    } catch (error) {
        if (!error.message.includes('no es un número válido')) {
            throw error;
        }
    }
});

test('Error: Factorial de número negativo', () => {
    try {
        calculadora.factorial(-5);
        throw new Error('Debería lanzar error de factorial negativo');
    } catch (error) {
        if (!error.message.includes('números negativos')) {
            throw error;
        }
    }
});

test('Error: Promedio de array vacío', () => {
    try {
        calculadora.promedio([]);
        throw new Error('Debería lanzar error de array vacío');
    } catch (error) {
        if (!error.message.includes('vacío')) {
            throw error;
        }
    }
});

// PRUEBAS DE HISTORIAL
console.log(`\n${colors.blue}PRUEBAS DE HISTORIAL${colors.reset}`);
console.log('═══════════════════\n');

test('Historial registra operaciones', () => {
    const calc = new Calculadora();
    calc.sumar(1, 2);
    calc.restar(5, 3);
    const historial = calc.obtenerHistorial();
    assert(historial.length >= 2, true, 'El historial debe tener al menos 2 operaciones');
});

test('Limpiar historial', () => {
    const calc = new Calculadora();
    calc.sumar(1, 2);
    calc.limpiarHistorial();
    assert(calc.obtenerHistorial().length, 0);
});

// PRUEBAS DE FUNCIONES ESPECIALES
console.log(`\n${colors.blue}PRUEBAS DE FUNCIONES ESPECIALES${colors.reset}`);
console.log('══════════════════════════════\n');

test('Suma con precisión decimal', () => {
    const resultado = operaciones.suma.sumaPrecision(0.1, 0.2, 2);
    assert(resultado, 0.3);
});

test('Operaciones con arrays', () => {
    const arr1 = [10, 20, 30];
    const arr2 = [2, 4, 5];
    const resultado = operaciones.multiplicacion.multiplicarArrays(arr1, arr2);
    assert(resultado[0], 20);
    assert(resultado[1], 80);
    assert(resultado[2], 150);
});

test('Inverso multiplicativo', () => {
    assert(operaciones.division.inverso(4), 0.25);
});

// RESUMEN DE PRUEBAS
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║                        RESUMEN DE PRUEBAS                    ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const totalPruebas = testsPasados + testsFallidos;
const porcentaje = ((testsPasados / totalPruebas) * 100).toFixed(2);

console.log(`Total de pruebas: ${totalPruebas}`);
console.log(`${colors.green}Pruebas pasadas: ${testsPasados}${colors.reset}`);
console.log(`${colors.red}Pruebas fallidas: ${testsFallidos}${colors.reset}`);
console.log(`Porcentaje de éxito: ${porcentaje}%`);

if (testsFallidos === 0) {
    console.log(`\n${colors.green}✨ ¡Todas las pruebas pasaron exitosamente! ✨${colors.reset}`);
    process.exit(0);
} else {
    console.log(`\n${colors.red}❌ Algunas pruebas fallaron. Por favor revisa los errores.${colors.reset}`);
    process.exit(1);
}
