/**
 * Módulo de resta optimizado para rendimiento y escalabilidad
 * @module 2025a-swgr2-ee-resta
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
 * Realiza la resta de dos números con validación avanzada
 * @param {number|string|bigint} minuendo - Número del cual se resta
 * @param {number|string|bigint} sustraendo - Número a restar
 * @returns {number} - Resultado de la resta
 * @throws {Error} - Si los parámetros no son números válidos
 */
exports.resta = (minuendo, sustraendo) => {
    // Validación de entrada
    if (!esNumeroValido(minuendo)) {
        throw new Error(`El minuendo "${minuendo}" no es un número válido`);
    }
    if (!esNumeroValido(sustraendo)) {
        throw new Error(`El sustraendo "${sustraendo}" no es un número válido`);
    }

    // Conversión optimizada
    const num1 = convertirANumero(minuendo);
    const num2 = convertirANumero(sustraendo);

    // Cálculo del resultado
    const resultado = num1 - num2;
    
    // Verificar overflow/underflow
    if (!isFinite(resultado)) {
        throw new Error('El resultado excede los límites numéricos permitidos');
    }

    return resultado;
};

/**
 * Realiza la resta en cadena de múltiples números
 * @param {number|string|bigint} inicial - Número inicial
 * @param {...(number|string|bigint)} sustraendos - Números a restar secuencialmente
 * @returns {number} - Resultado de las restas en cadena
 * @throws {Error} - Si algún parámetro no es un número válido
 */
exports.restaMultiple = (inicial, ...sustraendos) => {
    if (!esNumeroValido(inicial)) {
        throw new Error(`El valor inicial "${inicial}" no es un número válido`);
    }

    if (sustraendos.length === 0) {
        return convertirANumero(inicial);
    }

    // Validar todos los sustraendos
    for (let i = 0; i < sustraendos.length; i++) {
        if (!esNumeroValido(sustraendos[i])) {
            throw new Error(`El sustraendo en la posición ${i + 1} "${sustraendos[i]}" no es un número válido`);
        }
    }

    // Resta optimizada usando reduce
    return sustraendos.reduce((acumulador, sustraendo) => {
        const num = convertirANumero(sustraendo);
        const resultado = acumulador - num;
        
        if (!isFinite(resultado)) {
            throw new Error('El resultado excede los límites numéricos permitidos');
        }
        
        return resultado;
    }, convertirANumero(inicial));
};

/**
 * Calcula la diferencia absoluta entre dos números
 * @param {number|string} numeroUno - Primer número
 * @param {number|string} numeroDos - Segundo número
 * @returns {number} - Diferencia absoluta
 */
exports.diferenciaAbsoluta = (numeroUno, numeroDos) => {
    const resultado = exports.resta(numeroUno, numeroDos);
    return Math.abs(resultado);
};

/**
 * Realiza la resta con precisión decimal específica
 * @param {number|string} minuendo - Número del cual se resta
 * @param {number|string} sustraendo - Número a restar
 * @param {number} decimales - Número de decimales en el resultado
 * @returns {number} - Resultado redondeado
 */
exports.restaPrecision = (minuendo, sustraendo, decimales = 2) => {
    const resultado = exports.resta(minuendo, sustraendo);
    return Math.round(resultado * Math.pow(10, decimales)) / Math.pow(10, decimales);
};

/**
 * Realiza la resta de arrays elemento por elemento
 * @param {Array<number>} arrayMinuendo - Array de minuendos
 * @param {Array<number>} arraySustraendo - Array de sustraendos
 * @returns {Array<number>} - Array con los resultados
 * @throws {Error} - Si los arrays no tienen la misma longitud
 */
exports.restaArrays = (arrayMinuendo, arraySustraendo) => {
    if (!Array.isArray(arrayMinuendo) || !Array.isArray(arraySustraendo)) {
        throw new Error('Ambos parámetros deben ser arrays');
    }

    if (arrayMinuendo.length !== arraySustraendo.length) {
        throw new Error('Los arrays deben tener la misma longitud');
    }

    return arrayMinuendo.map((minuendo, index) => {
        return exports.resta(minuendo, arraySustraendo[index]);
    });
};

// Exportar funciones de utilidad
exports.utils = {
    esNumeroValido,
    convertirANumero
};
