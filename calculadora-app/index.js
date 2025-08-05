/**
 * Aplicación principal de calculadora modular
 * Integra todos los módulos de operaciones matemáticas
 */

// Importar los módulos (después de npm link)
const moduloSuma = require('2025a-swgr2-ee-suma');
const moduloResta = require('2025a-swgr2-ee-resta');
const moduloMultiplicacion = require('2025a-swgr2-ee-multiplicacion');
const moduloDivision = require('2025a-swgr2-ee-division');

/**
 * Clase Calculadora que encapsula todas las operaciones
 */
class Calculadora {
    constructor() {
        this.historial = [];
        this.precision = 2;
    }

    /**
     * Establece la precisión decimal para los cálculos
     * @param {number} decimales - Número de decimales
     */
    setPrecision(decimales) {
        this.precision = decimales;
    }

    /**
     * Registra una operación en el historial
     * @param {string} operacion - Tipo de operación
     * @param {Array} operandos - Operandos utilizados
     * @param {number} resultado - Resultado obtenido
     */
    registrarOperacion(operacion, operandos, resultado) {
        this.historial.push({
            operacion,
            operandos,
            resultado,
            fecha: new Date().toISOString()
        });
    }

    /**
     * Suma dos o más números
     * @param {...number} numeros - Números a sumar
     * @returns {number} - Resultado
     */
    sumar(...numeros) {
        try {
            const resultado = numeros.length === 2 
                ? moduloSuma.suma(numeros[0], numeros[1])
                : moduloSuma.sumaMultiple(...numeros);
            
            this.registrarOperacion('suma', numeros, resultado);
            return resultado;
        } catch (error) {
            console.error('Error en suma:', error.message);
            throw error;
        }
    }

    /**
     * Resta dos números o realiza resta en cadena
     * @param {...number} numeros - Números a restar
     * @returns {number} - Resultado
     */
    restar(...numeros) {
        try {
            const resultado = numeros.length === 2
                ? moduloResta.resta(numeros[0], numeros[1])
                : moduloResta.restaMultiple(...numeros);
            
            this.registrarOperacion('resta', numeros, resultado);
            return resultado;
        } catch (error) {
            console.error('Error en resta:', error.message);
            throw error;
        }
    }

    /**
     * Multiplica dos o más números
     * @param {...number} numeros - Números a multiplicar
     * @returns {number} - Resultado
     */
    multiplicar(...numeros) {
        try {
            const resultado = numeros.length === 2
                ? moduloMultiplicacion.multiplicacion(numeros[0], numeros[1])
                : moduloMultiplicacion.productoMultiple(...numeros);
            
            this.registrarOperacion('multiplicación', numeros, resultado);
            return resultado;
        } catch (error) {
            console.error('Error en multiplicación:', error.message);
            throw error;
        }
    }

    /**
     * Divide dos números o realiza división en cadena
     * @param {...number} numeros - Números a dividir
     * @returns {number} - Resultado
     */
    dividir(...numeros) {
        try {
            const resultado = numeros.length === 2
                ? moduloDivision.division(numeros[0], numeros[1])
                : moduloDivision.divisionMultiple(...numeros);
            
            this.registrarOperacion('división', numeros, resultado);
            return resultado;
        } catch (error) {
            console.error('Error en división:', error.message);
            throw error;
        }
    }

    /**
     * Calcula la potencia
     * @param {number} base - Base
     * @param {number} exponente - Exponente
     * @returns {number} - Resultado
     */
    potencia(base, exponente) {
        try {
            const resultado = moduloMultiplicacion.potencia(base, exponente);
            this.registrarOperacion('potencia', [base, exponente], resultado);
            return resultado;
        } catch (error) {
            console.error('Error en potencia:', error.message);
            throw error;
        }
    }

    /**
     * Calcula el factorial
     * @param {number} n - Número
     * @returns {number} - Factorial
     */
    factorial(n) {
        try {
            const resultado = moduloMultiplicacion.factorial(n);
            this.registrarOperacion('factorial', [n], resultado);
            return resultado;
        } catch (error) {
            console.error('Error en factorial:', error.message);
            throw error;
        }
    }

    /**
     * Calcula el promedio
     * @param {Array<number>} numeros - Array de números
     * @returns {number} - Promedio
     */
    promedio(numeros) {
        try {
            const resultado = moduloDivision.promedio(numeros);
            this.registrarOperacion('promedio', numeros, resultado);
            return resultado;
        } catch (error) {
            console.error('Error en promedio:', error.message);
            throw error;
        }
    }

    /**
     * Obtiene el historial de operaciones
     * @param {number} limite - Número máximo de operaciones a retornar
     * @returns {Array} - Historial
     */
    obtenerHistorial(limite = 10) {
        return this.historial.slice(-limite);
    }

    /**
     * Limpia el historial
     */
    limpiarHistorial() {
        this.historial = [];
    }

    /**
     * Realiza una operación compleja expresada como string
     * @param {string} expresion - Expresión a evaluar (ej: "2 + 3 * 4")
     * @returns {number} - Resultado
     */
    evaluar(expresion) {
        // Esta es una implementación básica. En producción, usar un parser seguro
        console.warn('Función evaluar() es experimental y no debe usarse con entrada no confiable');
        
        try {
            // Reemplazar operadores por llamadas a funciones
            let resultado = expresion
                .replace(/(\d+)\s*\+\s*(\d+)/g, (match, a, b) => this.sumar(a, b))
                .replace(/(\d+)\s*-\s*(\d+)/g, (match, a, b) => this.restar(a, b))
                .replace(/(\d+)\s*\*\s*(\d+)/g, (match, a, b) => this.multiplicar(a, b))
                .replace(/(\d+)\s*\/\s*(\d+)/g, (match, a, b) => this.dividir(a, b));
            
            return Number(resultado);
        } catch (error) {
            console.error('Error al evaluar expresión:', error.message);
            throw error;
        }
    }
}

// Crear instancia global de calculadora
const calculadora = new Calculadora();

// Exportar la clase y la instancia
module.exports = {
    Calculadora,
    calculadora,
    // Exportar también las funciones individuales para acceso directo
    operaciones: {
        suma: moduloSuma,
        resta: moduloResta,
        multiplicacion: moduloMultiplicacion,
        division: moduloDivision
    }
};

// Si se ejecuta directamente, mostrar ejemplos
if (require.main === module) {
    console.log('=== CALCULADORA MODULAR ===\n');
    
    console.log('Suma: 10 + 20 =', calculadora.sumar(10, 20));
    console.log('Resta: 50 - 15 =', calculadora.restar(50, 15));
    console.log('Multiplicación: 7 * 8 =', calculadora.multiplicar(7, 8));
    console.log('División: 100 / 4 =', calculadora.dividir(100, 4));
    console.log('Potencia: 2^8 =', calculadora.potencia(2, 8));
    console.log('Factorial: 5! =', calculadora.factorial(5));
    console.log('Promedio: [10, 20, 30, 40] =', calculadora.promedio([10, 20, 30, 40]));
    
    console.log('\n=== HISTORIAL ===');
    console.log(calculadora.obtenerHistorial(5));
}
