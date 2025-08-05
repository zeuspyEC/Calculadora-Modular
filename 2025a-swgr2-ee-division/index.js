/**
 * Módulo de división optimizado para rendimiento y escalabilidad
 * @module 2025a-swgr2-ee-division
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
 * Realiza la división de dos números con validación avanzada
 * @param {number|string|bigint} dividendo - Número a dividir
 * @param {number|string|bigint} divisor - Número por el cual dividir
 * @returns {number} - Resultado de la división
 * @throws {Error} - Si los parámetros no son válidos o división por cero
 */
exports.division = (dividendo, divisor) => {
    // Validación de entrada
    if (!esNumeroValido(dividendo)) {
        throw new Error(`El dividendo "${dividendo}" no es un número válido`);
    }
    if (!esNumeroValido(divisor)) {
        throw new Error(`El divisor "${divisor}" no es un número válido`);
    }

    // Conversión optimizada
    const num1 = convertirANumero(dividendo);
    const num2 = convertirANumero(divisor);

    // Validación de división por cero
    if (num2 === 0) {
        throw new Error('División por cero no permitida');
    }

    // Casos especiales optimizados
    if (num1 === 0) return 0;
    if (num2 === 1) return num1;
    if (num2 === -1) return -num1;

    // Cálculo del resultado
    const resultado = num1 / num2;
    
    // Verificar resultado válido
    if (!isFinite(resultado)) {
        throw new Error('El resultado excede los límites numéricos permitidos');
    }

    return resultado;
};

/**
 * Realiza divisiones en cadena
 * @param {number|string|bigint} inicial - Número inicial
 * @param {...(number|string|bigint)} divisores - Divisores a aplicar secuencialmente
 * @returns {number} - Resultado de las divisiones en cadena
 * @throws {Error} - Si algún parámetro no es válido
 */
exports.divisionMultiple = (inicial, ...divisores) => {
    if (!esNumeroValido(inicial)) {
        throw new Error(`El valor inicial "${inicial}" no es un número válido`);
    }

    if (divisores.length === 0) {
        return convertirANumero(inicial);
    }

    // Validar todos los divisores
    for (let i = 0; i < divisores.length; i++) {
        if (!esNumeroValido(divisores[i])) {
            throw new Error(`El divisor en la posición ${i + 1} "${divisores[i]}" no es un número válido`);
        }
        if (convertirANumero(divisores[i]) === 0) {
            throw new Error(`División por cero en la posición ${i + 1}`);
        }
    }

    // División optimizada usando reduce
    return divisores.reduce((acumulador, divisor) => {
        const num = convertirANumero(divisor);
        const resultado = acumulador / num;
        
        if (!isFinite(resultado)) {
            throw new Error('El resultado excede los límites numéricos permitidos');
        }
        
        return resultado;
    }, convertirANumero(inicial));
};

/**
 * Realiza división entera (cociente)
 * @param {number|string} dividendo - Número a dividir
 * @param {number|string} divisor - Número divisor
 * @returns {number} - Cociente entero
 */
exports.divisionEntera = (dividendo, divisor) => {
    const resultado = exports.division(dividendo, divisor);
    return Math.trunc(resultado);
};

/**
 * Calcula el módulo (resto de la división)
 * @param {number|string} dividendo - Número a dividir
 * @param {number|string} divisor - Número divisor
 * @returns {number} - Resto de la división
 */
exports.modulo = (dividendo, divisor) => {
    if (!esNumeroValido(dividendo)) {
        throw new Error(`El dividendo "${dividendo}" no es un número válido`);
    }
    if (!esNumeroValido(divisor)) {
        throw new Error(`El divisor "${divisor}" no es un número válido`);
    }

    const num1 = convertirANumero(dividendo);
    const num2 = convertirANumero(divisor);

    if (num2 === 0) {
        throw new Error('División por cero no permitida');
    }

    return num1 % num2;
};

/**
 * Realiza la división con precisión decimal específica
 * @param {number|string} dividendo - Número a dividir
 * @param {number|string} divisor - Número divisor
 * @param {number} decimales - Número de decimales en el resultado
 * @returns {number} - Resultado redondeado
 */
exports.divisionPrecision = (dividendo, divisor, decimales = 2) => {
    const resultado = exports.division(dividendo, divisor);
    return Math.round(resultado * Math.pow(10, decimales)) / Math.pow(10, decimales);
};

/**
 * Calcula el inverso multiplicativo (1/x)
 * @param {number|string} numero - Número para calcular su inverso
 * @returns {number} - Inverso del número
 */
exports.inverso = (numero) => {
    return exports.division(1, numero);
};

/**
 * Divide dos arrays elemento por elemento
 * @param {Array<number>} arrayDividendo - Array de dividendos
 * @param {Array<number>} arrayDivisor - Array de divisores
 * @returns {Array<number>} - Array con los cocientes
 */
exports.dividirArrays = (arrayDividendo, arrayDivisor) => {
    if (!Array.isArray(arrayDividendo) || !Array.isArray(arrayDivisor)) {
        throw new Error('Ambos parámetros deben ser arrays');
    }

    if (arrayDividendo.length !== arrayDivisor.length) {
        throw new Error('Los arrays deben tener la misma longitud');
    }

    return arrayDividendo.map((dividendo, index) => {
        return exports.division(dividendo, arrayDivisor[index]);
    });
};

/**
 * Calcula el promedio de un array de números
 * @param {Array<number>} numeros - Array de números
 * @returns {number} - Promedio
 */
exports.promedio = (numeros) => {
    if (!Array.isArray(numeros)) {
        throw new Error('El parámetro debe ser un array');
    }

    if (numeros.length === 0) {
        throw new Error('El array no puede estar vacío');
    }

    const suma = numeros.reduce((acc, num) => {
        if (!esNumeroValido(num)) {
            throw new Error(`El valor "${num}" no es un número válido`);
        }
        return acc + convertirANumero(num);
    }, 0);

    return exports.division(suma, numeros.length);
};

// Exportar funciones de utilidad
exports.utils = {
    esNumeroValido,
    convertirANumero
};
