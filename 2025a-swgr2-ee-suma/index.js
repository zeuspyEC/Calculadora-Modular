/**
 * Módulo de suma optimizado para rendimiento y escalabilidad
 * @module 2025a-swgr2-ee-suma
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
        // Manejo especial para BigInt
        return Number(value);
    }
    if (typeof value === 'string') {
        // Limpia espacios y caracteres especiales
        value = value.trim().replace(/,/g, '');
    }
    return Number(value);
};

/**
 * Realiza la suma de dos números con validación avanzada
 * @param {number|string|bigint} numeroUno - Primer número a sumar
 * @param {number|string|bigint} numeroDos - Segundo número a sumar
 * @returns {number} - Resultado de la suma
 * @throws {Error} - Si los parámetros no son números válidos
 */
exports.suma = (numeroUno, numeroDos) => {
    // Validación de entrada
    if (!esNumeroValido(numeroUno)) {
        throw new Error(`El primer parámetro "${numeroUno}" no es un número válido`);
    }
    if (!esNumeroValido(numeroDos)) {
        throw new Error(`El segundo parámetro "${numeroDos}" no es un número válido`);
    }

    // Conversión optimizada
    const num1 = convertirANumero(numeroUno);
    const num2 = convertirANumero(numeroDos);

    // Verificación de límites seguros
    const resultado = num1 + num2;
    
    // Verificar overflow
    if (!isFinite(resultado)) {
        throw new Error('El resultado excede los límites numéricos permitidos');
    }

    return resultado;
};

/**
 * Realiza la suma de múltiples números (escalable)
 * @param {...(number|string|bigint)} numeros - Números a sumar
 * @returns {number} - Resultado de la suma
 * @throws {Error} - Si algún parámetro no es un número válido
 */
exports.sumaMultiple = (...numeros) => {
    if (numeros.length === 0) {
        return 0;
    }

    // Validar todos los números primero para fail-fast
    for (let i = 0; i < numeros.length; i++) {
        if (!esNumeroValido(numeros[i])) {
            throw new Error(`El parámetro en la posición ${i + 1} "${numeros[i]}" no es un número válido`);
        }
    }

    // Suma optimizada usando reduce
    return numeros.reduce((acumulador, numero) => {
        const num = convertirANumero(numero);
        const resultado = acumulador + num;
        
        if (!isFinite(resultado)) {
            throw new Error('El resultado excede los límites numéricos permitidos');
        }
        
        return resultado;
    }, 0);
};

/**
 * Realiza la suma de un array de números (para procesamiento en lotes)
 * @param {Array<number|string|bigint>} arrayNumeros - Array de números a sumar
 * @returns {number} - Resultado de la suma
 * @throws {Error} - Si el parámetro no es un array o contiene valores no numéricos
 */
exports.sumaArray = (arrayNumeros) => {
    if (!Array.isArray(arrayNumeros)) {
        throw new Error('El parámetro debe ser un array');
    }

    if (arrayNumeros.length === 0) {
        return 0;
    }

    return exports.sumaMultiple(...arrayNumeros);
};

/**
 * Realiza la suma con precisión decimal específica
 * @param {number|string} numeroUno - Primer número
 * @param {number|string} numeroDos - Segundo número
 * @param {number} decimales - Número de decimales en el resultado
 * @returns {number} - Resultado redondeado
 */
exports.sumaPrecision = (numeroUno, numeroDos, decimales = 2) => {
    const resultado = exports.suma(numeroUno, numeroDos);
    return Math.round(resultado * Math.pow(10, decimales)) / Math.pow(10, decimales);
};

// Exportar también las funciones de utilidad para reutilización
exports.utils = {
    esNumeroValido,
    convertirANumero
};
