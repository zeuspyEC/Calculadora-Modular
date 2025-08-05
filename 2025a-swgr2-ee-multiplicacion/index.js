/**
 * Módulo de multiplicación optimizado para rendimiento y escalabilidad
 * @module 2025a-swgr2-ee-multiplicacion
 */

/**
 * Valida si un valor es un número válido
 * @param {*} value - Valor a validar
 * @returns {boolean} - true si es un número válido
 */
const esNumeroValido = (value) => {
    if (value === null || value === undefined || value === '') {
        return false;
    }
    const numero = Number(value);
    return !isNaN(numero) && isFinite(numero);
};

/**
 * Convierte un valor a número con precisión mejorada
 * @param {*} value - Valor a convertir
 * @returns {number} - Número convertido
 */
const convertirANumero = (value) => {
    if (typeof value === 'bigint') {
        return Number(value);
    }
    if (typeof value === 'string') {
        value = value.trim().replace(/,/g, '');
    }
    return Number(value);
};

/**
 * Realiza la multiplicación de dos números con validación avanzada
 * @param {number|string|bigint} factor1 - Primer factor
 * @param {number|string|bigint} factor2 - Segundo factor
 * @returns {number} - Resultado de la multiplicación
 * @throws {Error} - Si los parámetros no son números válidos
 */
exports.multiplicacion = (factor1, factor2) => {
    // Validación de entrada
    if (!esNumeroValido(factor1)) {
        throw new Error(`El primer factor "${factor1}" no es un número válido`);
    }
    if (!esNumeroValido(factor2)) {
        throw new Error(`El segundo factor "${factor2}" no es un número válido`);
    }

    // Conversión optimizada
    const num1 = convertirANumero(factor1);
    const num2 = convertirANumero(factor2);

    // Optimización para casos especiales
    if (num1 === 0 || num2 === 0) return 0;
    if (num1 === 1) return num2;
    if (num2 === 1) return num1;

    // Cálculo del resultado
    const resultado = num1 * num2;
    
    // Verificar overflow
    if (!isFinite(resultado)) {
        throw new Error('El resultado excede los límites numéricos permitidos');
    }

    return resultado;
};

/**
 * Realiza el producto de múltiples números
 * @param {...(number|string|bigint)} factores - Factores a multiplicar
 * @returns {number} - Producto de todos los factores
 * @throws {Error} - Si algún parámetro no es un número válido
 */
exports.productoMultiple = (...factores) => {
    if (factores.length === 0) {
        return 1; // Elemento neutro de la multiplicación
    }

    // Validar todos los factores primero
    for (let i = 0; i < factores.length; i++) {
        if (!esNumeroValido(factores[i])) {
            throw new Error(`El factor en la posición ${i + 1} "${factores[i]}" no es un número válido`);
        }
    }

    // Optimización: si algún factor es 0, el resultado es 0
    const factoresNumeros = factores.map(convertirANumero);
    if (factoresNumeros.includes(0)) {
        return 0;
    }

    // Multiplicación optimizada usando reduce
    return factoresNumeros.reduce((acumulador, factor) => {
        const resultado = acumulador * factor;
        
        if (!isFinite(resultado)) {
            throw new Error('El resultado excede los límites numéricos permitidos');
        }
        
        return resultado;
    }, 1);
};

/**
 * Calcula la potencia de un número
 * @param {number|string} base - Base
 * @param {number|string} exponente - Exponente
 * @returns {number} - Resultado de la potencia
 */
exports.potencia = (base, exponente) => {
    if (!esNumeroValido(base)) {
        throw new Error(`La base "${base}" no es un número válido`);
    }
    if (!esNumeroValido(exponente)) {
        throw new Error(`El exponente "${exponente}" no es un número válido`);
    }

    const baseNum = convertirANumero(base);
    const expNum = convertirANumero(exponente);

    // Casos especiales
    if (expNum === 0) return 1;
    if (expNum === 1) return baseNum;
    if (baseNum === 0) return 0;
    if (baseNum === 1) return 1;

    const resultado = Math.pow(baseNum, expNum);

    if (!isFinite(resultado)) {
        throw new Error('El resultado excede los límites numéricos permitidos');
    }

    return resultado;
};

/**
 * Realiza la multiplicación con precisión decimal específica
 * @param {number|string} factor1 - Primer factor
 * @param {number|string} factor2 - Segundo factor
 * @param {number} decimales - Número de decimales en el resultado
 * @returns {number} - Resultado redondeado
 */
exports.multiplicacionPrecision = (factor1, factor2, decimales = 2) => {
    const resultado = exports.multiplicacion(factor1, factor2);
    return Math.round(resultado * Math.pow(10, decimales)) / Math.pow(10, decimales);
};

/**
 * Calcula el factorial de un número
 * @param {number|string} n - Número para calcular factorial
 * @returns {number} - Factorial del número
 * @throws {Error} - Si el número es negativo o no es entero
 */
exports.factorial = (n) => {
    if (!esNumeroValido(n)) {
        throw new Error(`El valor "${n}" no es un número válido`);
    }

    const num = convertirANumero(n);

    if (num < 0) {
        throw new Error('El factorial no está definido para números negativos');
    }

    if (!Number.isInteger(num)) {
        throw new Error('El factorial solo está definido para números enteros');
    }

    // Optimización para valores pequeños
    if (num === 0 || num === 1) return 1;
    if (num === 2) return 2;
    if (num === 3) return 6;
    if (num === 4) return 24;
    if (num === 5) return 120;

    // Para valores más grandes, usar iteración en lugar de recursión
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
        resultado *= i;
        if (!isFinite(resultado)) {
            throw new Error(`El factorial de ${num} excede los límites numéricos`);
        }
    }

    return resultado;
};

/**
 * Multiplica dos arrays elemento por elemento
 * @param {Array<number>} array1 - Primer array
 * @param {Array<number>} array2 - Segundo array
 * @returns {Array<number>} - Array con los productos
 */
exports.multiplicarArrays = (array1, array2) => {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('Ambos parámetros deben ser arrays');
    }

    if (array1.length !== array2.length) {
        throw new Error('Los arrays deben tener la misma longitud');
    }

    return array1.map((valor, index) => {
        return exports.multiplicacion(valor, array2[index]);
    });
};

// Exportar funciones de utilidad
exports.utils = {
    esNumeroValido,
    convertirANumero
};
