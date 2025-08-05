/**
 * Demo completa de la calculadora modular
 * Muestra todas las funcionalidades disponibles
 */

const { calculadora, operaciones } = require('./index.js');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║             DEMO - CALCULADORA MODULAR NPM                   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Función auxiliar para mostrar resultados
const mostrarResultado = (operacion, resultado) => {
    console.log(`✓ ${operacion} = ${resultado}`);
};

// Función para manejar errores
const ejecutarOperacion = (descripcion, funcion) => {
    try {
        const resultado = funcion();
        mostrarResultado(descripcion, resultado);
    } catch (error) {
        console.log(`✗ ${descripcion} - Error: ${error.message}`);
    }
};

console.log('📊 OPERACIONES BÁSICAS');
console.log('═════════════════════\n');

ejecutarOperacion('10 + 20', () => calculadora.sumar(10, 20));
ejecutarOperacion('100 - 45', () => calculadora.restar(100, 45));
ejecutarOperacion('15 × 6', () => calculadora.multiplicar(15, 6));
ejecutarOperacion('144 ÷ 12', () => calculadora.dividir(144, 12));

console.log('\n📈 OPERACIONES CON MÚLTIPLES NÚMEROS');
console.log('═══════════════════════════════════\n');

ejecutarOperacion('Suma múltiple: 1 + 2 + 3 + 4 + 5', () => calculadora.sumar(1, 2, 3, 4, 5));
ejecutarOperacion('Resta en cadena: 100 - 10 - 15 - 5', () => calculadora.restar(100, 10, 15, 5));
ejecutarOperacion('Producto múltiple: 2 × 3 × 4', () => calculadora.multiplicar(2, 3, 4));
ejecutarOperacion('División en cadena: 1000 ÷ 10 ÷ 5', () => calculadora.dividir(1000, 10, 5));

console.log('\n🔬 OPERACIONES ESPECIALES');
console.log('═══════════════════════\n');

ejecutarOperacion('Potencia: 2^10', () => calculadora.potencia(2, 10));
ejecutarOperacion('Factorial: 6!', () => calculadora.factorial(6));
ejecutarOperacion('Promedio: [85, 90, 78, 92, 88]', () => calculadora.promedio([85, 90, 78, 92, 88]));

console.log('\n🧮 OPERACIONES CON DECIMALES');
console.log('═══════════════════════════\n');

ejecutarOperacion('0.1 + 0.2', () => calculadora.sumar(0.1, 0.2));
ejecutarOperacion('Suma con precisión: 0.1 + 0.2 (2 decimales)', 
    () => operaciones.suma.sumaPrecision(0.1, 0.2, 2));
ejecutarOperacion('3.14159 × 2', () => calculadora.multiplicar(3.14159, 2));
ejecutarOperacion('División con precisión: 10 ÷ 3 (4 decimales)', 
    () => operaciones.division.divisionPrecision(10, 3, 4));

console.log('\n⚡ OPERACIONES CON STRINGS Y NÚMEROS GRANDES');
console.log('═════════════════════════════════════════\n');

ejecutarOperacion('Suma con strings: "1000" + "2000"', () => calculadora.sumar("1000", "2000"));
ejecutarOperacion('Números con comas: "1,234" × "2"', () => calculadora.multiplicar("1,234", "2"));
ejecutarOperacion('Números grandes: 999999999 + 1', () => calculadora.sumar(999999999, 1));

console.log('\n🛡️ MANEJO DE ERRORES');
console.log('═══════════════════\n');

ejecutarOperacion('División por cero: 10 ÷ 0', () => calculadora.dividir(10, 0));
ejecutarOperacion('Entrada inválida: "abc" + 5', () => calculadora.sumar("abc", 5));
ejecutarOperacion('Factorial negativo: (-5)!', () => calculadora.factorial(-5));
ejecutarOperacion('Array vacío promedio', () => calculadora.promedio([]));

console.log('\n📋 FUNCIONES ADICIONALES DE LOS MÓDULOS');
console.log('═══════════════════════════════════════\n');

// Usando funciones específicas de cada módulo
ejecutarOperacion('Diferencia absoluta: |5 - 10|', 
    () => operaciones.resta.diferenciaAbsoluta(5, 10));
ejecutarOperacion('División entera: 17 ÷ 5', 
    () => operaciones.division.divisionEntera(17, 5));
ejecutarOperacion('Módulo: 17 % 5', 
    () => operaciones.division.modulo(17, 5));
ejecutarOperacion('Inverso: 1/4', 
    () => operaciones.division.inverso(4));

console.log('\n🔄 OPERACIONES CON ARRAYS');
console.log('═════════════════════════\n');

const array1 = [10, 20, 30];
const array2 = [2, 4, 5];

ejecutarOperacion('Suma de array: [10, 20, 30]', 
    () => operaciones.suma.sumaArray(array1));
ejecutarOperacion('Multiplicar arrays: [10, 20, 30] × [2, 4, 5]', 
    () => operaciones.multiplicacion.multiplicarArrays(array1, array2));
ejecutarOperacion('Dividir arrays: [10, 20, 30] ÷ [2, 4, 5]', 
    () => operaciones.division.dividirArrays(array1, array2));

console.log('\n📜 HISTORIAL DE OPERACIONES');
console.log('══════════════════════════\n');

const historial = calculadora.obtenerHistorial(5);
console.log('Últimas 5 operaciones:');
historial.forEach((op, index) => {
    console.log(`${index + 1}. ${op.operacion}: ${op.operandos.join(', ')} = ${op.resultado}`);
});

console.log('\n✨ ESTADÍSTICAS DE LA SESIÓN');
console.log('══════════════════════════\n');

const totalOperaciones = calculadora.obtenerHistorial(1000).length;
const operacionesPorTipo = calculadora.obtenerHistorial(1000).reduce((acc, op) => {
    acc[op.operacion] = (acc[op.operacion] || 0) + 1;
    return acc;
}, {});

console.log(`Total de operaciones realizadas: ${totalOperaciones}`);
console.log('Desglose por tipo:');
Object.entries(operacionesPorTipo).forEach(([tipo, cantidad]) => {
    console.log(`  - ${tipo}: ${cantidad}`);
});

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║                    DEMO COMPLETADA                           ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
