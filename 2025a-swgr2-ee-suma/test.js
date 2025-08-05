/**
 * Archivo de pruebas para el módulo de suma
 */

const moduloSuma = require('./index.js');

console.log('===== PRUEBAS DEL MÓDULO DE SUMA =====\n');

// Prueba básica
console.log('Prueba 1 - Suma básica (1 + 2):');
console.log('Resultado:', moduloSuma.suma(1, 2));
console.log('Esperado: 3\n');

// Prueba con strings
console.log('Prueba 2 - Suma con strings ("10" + "20"):');
console.log('Resultado:', moduloSuma.suma("10", "20"));
console.log('Esperado: 30\n');

// Prueba con decimales
console.log('Prueba 3 - Suma con decimales (0.1 + 0.2):');
console.log('Resultado:', moduloSuma.suma(0.1, 0.2));
console.log('Esperado: 0.30000000000000004\n');

// Prueba suma múltiple
console.log('Prueba 4 - Suma múltiple (1, 2, 3, 4, 5):');
console.log('Resultado:', moduloSuma.sumaMultiple(1, 2, 3, 4, 5));
console.log('Esperado: 15\n');

// Prueba suma array
console.log('Prueba 5 - Suma array ([10, 20, 30]):');
console.log('Resultado:', moduloSuma.sumaArray([10, 20, 30]));
console.log('Esperado: 60\n');

// Prueba suma con precisión
console.log('Prueba 6 - Suma con precisión (0.1 + 0.2, 2 decimales):');
console.log('Resultado:', moduloSuma.sumaPrecision(0.1, 0.2, 2));
console.log('Esperado: 0.3\n');

// Prueba con números grandes
console.log('Prueba 7 - Suma números grandes:');
console.log('Resultado:', moduloSuma.suma(999999999, 1));
console.log('Esperado: 1000000000\n');

// Pruebas de error
console.log('===== PRUEBAS DE MANEJO DE ERRORES =====\n');

try {
    console.log('Prueba Error 1 - Parámetro no numérico:');
    moduloSuma.suma("abc", 2);
} catch (error) {
    console.log('Error capturado:', error.message);
}

try {
    console.log('\nPrueba Error 2 - Parámetro null:');
    moduloSuma.suma(null, 2);
} catch (error) {
    console.log('Error capturado:', error.message);
}

console.log('\n===== TODAS LAS PRUEBAS COMPLETADAS =====');
