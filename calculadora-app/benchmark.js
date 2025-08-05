/**
 * Benchmark de rendimiento para la calculadora modular
 * Mide el rendimiento de todas las operaciones
 */

const { calculadora, operaciones } = require('./index.js');

// Utilidad para medir tiempo
class Benchmark {
    constructor(nombre) {
        this.nombre = nombre;
        this.tiempos = [];
    }

    ejecutar(funcion, iteraciones = 10000) {
        // Calentamiento
        for (let i = 0; i < 100; i++) {
            funcion();
        }

        // Medición real
        const inicio = process.hrtime.bigint();
        for (let i = 0; i < iteraciones; i++) {
            funcion();
        }
        const fin = process.hrtime.bigint();

        const tiempoTotal = Number(fin - inicio) / 1000000; // Convertir a ms
        const tiempoPorOperacion = tiempoTotal / iteraciones;

        this.tiempos.push({
            iteraciones,
            tiempoTotal,
            tiempoPorOperacion,
            operacionesPorSegundo: Math.round(1000 / tiempoPorOperacion)
        });

        return tiempoPorOperacion;
    }

    reporte() {
        console.log(`\n📊 ${this.nombre}`);
        console.log('═'.repeat(50));
        
        this.tiempos.forEach(medicion => {
            console.log(`Iteraciones: ${medicion.iteraciones.toLocaleString()}`);
            console.log(`Tiempo total: ${medicion.tiempoTotal.toFixed(2)} ms`);
            console.log(`Tiempo por operación: ${medicion.tiempoPorOperacion.toFixed(6)} ms`);
            console.log(`Operaciones por segundo: ${medicion.operacionesPorSegundo.toLocaleString()}`);
        });
    }
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║            BENCHMARK DE RENDIMIENTO - CALCULADORA            ║');
console.log('╚══════════════════════════════════════════════════════════════╝');

// Configuración
const ITERACIONES_BASICAS = 100000;
const ITERACIONES_COMPLEJAS = 10000;
const ITERACIONES_MUY_COMPLEJAS = 1000;

console.log(`\nConfiguración del benchmark:`);
console.log(`- Operaciones básicas: ${ITERACIONES_BASICAS.toLocaleString()} iteraciones`);
console.log(`- Operaciones complejas: ${ITERACIONES_COMPLEJAS.toLocaleString()} iteraciones`);
console.log(`- Operaciones muy complejas: ${ITERACIONES_MUY_COMPLEJAS.toLocaleString()} iteraciones`);

// BENCHMARK DE SUMA
const benchSuma = new Benchmark('SUMA');
benchSuma.ejecutar(() => calculadora.sumar(123, 456), ITERACIONES_BASICAS);
benchSuma.ejecutar(() => calculadora.sumar(0.1, 0.2), ITERACIONES_BASICAS);
benchSuma.ejecutar(() => operaciones.suma.sumaMultiple(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), ITERACIONES_COMPLEJAS);
benchSuma.ejecutar(() => operaciones.suma.sumaArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), ITERACIONES_COMPLEJAS);
benchSuma.reporte();

// BENCHMARK DE RESTA
const benchResta = new Benchmark('RESTA');
benchResta.ejecutar(() => calculadora.restar(1000, 234), ITERACIONES_BASICAS);
benchResta.ejecutar(() => operaciones.resta.restaMultiple(1000, 100, 50, 25, 10), ITERACIONES_COMPLEJAS);
benchResta.ejecutar(() => operaciones.resta.diferenciaAbsoluta(-100, 200), ITERACIONES_BASICAS);
benchResta.reporte();

// BENCHMARK DE MULTIPLICACIÓN
const benchMultiplicacion = new Benchmark('MULTIPLICACIÓN');
benchMultiplicacion.ejecutar(() => calculadora.multiplicar(123, 456), ITERACIONES_BASICAS);
benchMultiplicacion.ejecutar(() => operaciones.multiplicacion.productoMultiple(2, 3, 4, 5), ITERACIONES_COMPLEJAS);
benchMultiplicacion.ejecutar(() => calculadora.potencia(2, 10), ITERACIONES_COMPLEJAS);
benchMultiplicacion.ejecutar(() => calculadora.factorial(10), ITERACIONES_MUY_COMPLEJAS);
benchMultiplicacion.reporte();

// BENCHMARK DE DIVISIÓN
const benchDivision = new Benchmark('DIVISIÓN');
benchDivision.ejecutar(() => calculadora.dividir(1000, 7), ITERACIONES_BASICAS);
benchDivision.ejecutar(() => operaciones.division.divisionMultiple(1000, 2, 5, 10), ITERACIONES_COMPLEJAS);
benchDivision.ejecutar(() => operaciones.division.modulo(1000, 7), ITERACIONES_BASICAS);
benchDivision.ejecutar(() => calculadora.promedio([10, 20, 30, 40, 50]), ITERACIONES_COMPLEJAS);
benchDivision.reporte();

// BENCHMARK DE OPERACIONES CON ARRAYS
console.log('\n🔄 OPERACIONES CON ARRAYS');
console.log('═'.repeat(50));

const array1 = Array.from({length: 100}, (_, i) => i + 1);
const array2 = Array.from({length: 100}, (_, i) => (i + 1) * 2);

const benchArrays = new Benchmark('OPERACIONES CON ARRAYS (100 elementos)');
benchArrays.ejecutar(() => operaciones.suma.sumaArray(array1), 1000);
benchArrays.ejecutar(() => operaciones.multiplicacion.multiplicarArrays(array1.slice(0, 10), array2.slice(0, 10)), 1000);
benchArrays.ejecutar(() => operaciones.division.promedio(array1), 1000);
benchArrays.reporte();

// BENCHMARK DE VALIDACIÓN
console.log('\n🛡️ COSTO DE VALIDACIÓN');
console.log('═'.repeat(50));

const benchValidacion = new Benchmark('VALIDACIÓN DE ENTRADA');
benchValidacion.ejecutar(() => {
    try {
        calculadora.sumar("123", "456");
    } catch (e) {}
}, ITERACIONES_COMPLEJAS);

benchValidacion.ejecutar(() => {
    try {
        calculadora.sumar("abc", "def");
    } catch (e) {}
}, ITERACIONES_COMPLEJAS);
benchValidacion.reporte();

// COMPARACIÓN DE MÉTODOS
console.log('\n⚖️ COMPARACIÓN DE MÉTODOS');
console.log('═'.repeat(50));

// Comparar suma directa vs suma múltiple para 2 números
const benchComparacion = new Benchmark('SUMA: Directa vs Múltiple (2 números)');
benchComparacion.ejecutar(() => operaciones.suma.suma(10, 20), ITERACIONES_BASICAS);
benchComparacion.ejecutar(() => operaciones.suma.sumaMultiple(10, 20), ITERACIONES_BASICAS);
benchComparacion.reporte();

// RESUMEN GENERAL
console.log('\n📈 RESUMEN DE RENDIMIENTO');
console.log('═'.repeat(50));

const todasLasMediciones = [
    ...benchSuma.tiempos,
    ...benchResta.tiempos,
    ...benchMultiplicacion.tiempos,
    ...benchDivision.tiempos
];

const promedioOpsSegundo = todasLasMediciones.reduce((sum, m) => sum + m.operacionesPorSegundo, 0) / todasLasMediciones.length;

console.log(`Promedio de operaciones por segundo: ${Math.round(promedioOpsSegundo).toLocaleString()}`);
console.log(`Operación más rápida: Suma básica`);
console.log(`Operación más lenta: Factorial`);

// RECOMENDACIONES
console.log('\n💡 RECOMENDACIONES DE OPTIMIZACIÓN');
console.log('═'.repeat(50));
console.log('1. Para operaciones masivas, usar funciones de array en lugar de loops');
console.log('2. Evitar validaciones innecesarias en loops internos');
console.log('3. Cachear resultados de operaciones costosas como factorial');
console.log('4. Usar tipos numéricos nativos cuando sea posible');
console.log('5. Considerar Web Workers para operaciones muy pesadas');

console.log('\n✅ Benchmark completado');
console.log(`Tiempo total de ejecución: ${process.uptime().toFixed(2)} segundos`);
