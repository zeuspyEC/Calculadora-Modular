# 🧮 Calculadora Modular NPM

Un proyecto de calculadora modular construido con Node.js y NPM, diseñado con enfoque en **rendimiento**, **sostenibilidad** y **escalabilidad**. Cada operación matemática está implementada como un módulo NPM independiente que puede ser instalado y utilizado por separado.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Módulos Disponibles](#módulos-disponibles)
- [API Completa](#api-completa)
- [Ejemplos](#ejemplos)
- [Testing](#testing)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- **Modular**: Cada operación es un módulo NPM independiente
- **Optimizado**: Algoritmos optimizados para máximo rendimiento
- **Robusto**: Validación exhaustiva de entradas y manejo de errores
- **Escalable**: Soporta operaciones con múltiples números y arrays
- **Preciso**: Manejo especial de decimales y números grandes
- **Documentado**: JSDoc completo para todas las funciones
- **Historial**: Sistema de registro de operaciones integrado

## 📁 Estructura del Proyecto

```
calculadora-modular/
├── 2025a-swgr2-ee-suma/          # Módulo de suma
│   ├── package.json
│   ├── index.js
│   └── test.js
├── 2025a-swgr2-ee-resta/         # Módulo de resta
│   ├── package.json
│   └── index.js
├── 2025a-swgr2-ee-multiplicacion/ # Módulo de multiplicación
│   ├── package.json
│   └── index.js
├── 2025a-swgr2-ee-division/      # Módulo de división
│   ├── package.json
│   └── index.js
├── calculadora-app/              # Aplicación principal
│   ├── package.json
│   ├── index.js
│   └── demo.js
└── README.md
```

## 🚀 Instalación

### Opción 1: Instalación Local (npm link)

1. **Clonar el repositorio**:
```bash
git clone [URL_DEL_REPOSITORIO]
cd calculadora-modular
```

2. **Instalar cada módulo localmente**:

Para el módulo de suma:
```bash
cd 2025a-swgr2-ee-suma
npm link
cd ..
```

Repetir para cada módulo:
```bash
cd 2025a-swgr2-ee-resta
npm link
cd ..

cd 2025a-swgr2-ee-multiplicacion
npm link
cd ..

cd 2025a-swgr2-ee-division
npm link
cd ..
```

3. **Vincular módulos en la aplicación**:
```bash
cd calculadora-app
npm link 2025a-swgr2-ee-suma
npm link 2025a-swgr2-ee-resta
npm link 2025a-swgr2-ee-multiplicacion
npm link 2025a-swgr2-ee-division
```

### Opción 2: Instalación desde NPM (cuando estén publicados)

```bash
npm install 2025a-swgr2-ee-suma
npm install 2025a-swgr2-ee-resta
npm install 2025a-swgr2-ee-multiplicacion
npm install 2025a-swgr2-ee-division
```

## 💻 Uso

### Uso Básico

```javascript
const { calculadora } = require('./calculadora-app');

// Operaciones básicas
console.log(calculadora.sumar(10, 20));        // 30
console.log(calculadora.restar(50, 15));       // 35
console.log(calculadora.multiplicar(7, 8));    // 56
console.log(calculadora.dividir(100, 4));      // 25
```

### Uso de Módulos Individuales

```javascript
// Usar solo el módulo de suma
const moduloSuma = require('2025a-swgr2-ee-suma');
console.log(moduloSuma.suma(5, 3));                    // 8
console.log(moduloSuma.sumaMultiple(1, 2, 3, 4, 5)); // 15

// Usar solo el módulo de división
const moduloDivision = require('2025a-swgr2-ee-division');
console.log(moduloDivision.division(10, 3));           // 3.3333...
console.log(moduloDivision.divisionPrecision(10, 3, 2)); // 3.33
```

### Ejecutar Demo

```bash
cd calculadora-app
npm run demo
```

## 📦 Módulos Disponibles

### 1. Módulo de Suma (`2025a-swgr2-ee-suma`)

- `suma(a, b)`: Suma básica de dos números
- `sumaMultiple(...numeros)`: Suma de múltiples números
- `sumaArray(array)`: Suma todos los elementos de un array
- `sumaPrecision(a, b, decimales)`: Suma con precisión decimal específica

### 2. Módulo de Resta (`2025a-swgr2-ee-resta`)

- `resta(minuendo, sustraendo)`: Resta básica
- `restaMultiple(inicial, ...sustraendos)`: Resta en cadena
- `diferenciaAbsoluta(a, b)`: Valor absoluto de la diferencia
- `restaPrecision(a, b, decimales)`: Resta con precisión decimal

### 3. Módulo de Multiplicación (`2025a-swgr2-ee-multiplicacion`)

- `multiplicacion(a, b)`: Multiplicación básica
- `productoMultiple(...factores)`: Producto de múltiples números
- `potencia(base, exponente)`: Cálculo de potencias
- `factorial(n)`: Cálculo de factorial
- `multiplicacionPrecision(a, b, decimales)`: Multiplicación con precisión

### 4. Módulo de División (`2025a-swgr2-ee-division`)

- `division(dividendo, divisor)`: División básica
- `divisionMultiple(inicial, ...divisores)`: División en cadena
- `divisionEntera(a, b)`: División entera (cociente)
- `modulo(a, b)`: Resto de la división
- `promedio(array)`: Cálculo de promedio
- `inverso(n)`: Inverso multiplicativo (1/n)

## 📖 API Completa

### Clase Calculadora

```javascript
const calculadora = new Calculadora();

// Configuración
calculadora.setPrecision(4); // Establece 4 decimales de precisión

// Operaciones
calculadora.sumar(a, b, ...más);
calculadora.restar(a, b, ...más);
calculadora.multiplicar(a, b, ...más);
calculadora.dividir(a, b, ...más);
calculadora.potencia(base, exponente);
calculadora.factorial(n);
calculadora.promedio(array);

// Historial
calculadora.obtenerHistorial(limite);
calculadora.limpiarHistorial();
```

## 🔍 Ejemplos

### Ejemplo 1: Calculadora Financiera

```javascript
const { calculadora } = require('./calculadora-app');

// Calcular interés compuesto
const principal = 10000;
const tasaAnual = 0.05;
const años = 10;

const montoFinal = calculadora.multiplicar(
    principal, 
    calculadora.potencia(calculadora.sumar(1, tasaAnual), años)
);

console.log(`Inversión inicial: $${principal}`);
console.log(`Monto final después de ${años} años: $${montoFinal.toFixed(2)}`);
```

### Ejemplo 2: Procesamiento de Datos

```javascript
const { operaciones } = require('./calculadora-app');

// Datos de ventas
const ventas = [1500, 2300, 1800, 2100, 2500];

// Calcular estadísticas
const total = operaciones.suma.sumaArray(ventas);
const promedio = operaciones.division.promedio(ventas);
const comision = operaciones.multiplicacion.multiplicacionPrecision(total, 0.05, 2);

console.log(`Ventas totales: $${total}`);
console.log(`Promedio de ventas: $${promedio.toFixed(2)}`);
console.log(`Comisión (5%): $${comision}`);
```

### Ejemplo 3: Validación y Manejo de Errores

```javascript
const { calculadora } = require('./calculadora-app');

function calcularSeguro(operacion, ...args) {
    try {
        const resultado = operacion(...args);
        console.log(`✓ Resultado: ${resultado}`);
        return resultado;
    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
        return null;
    }
}

// Intentar operaciones válidas e inválidas
calcularSeguro(calculadora.dividir.bind(calculadora), 10, 2);    // ✓ Resultado: 5
calcularSeguro(calculadora.dividir.bind(calculadora), 10, 0);    // ✗ Error: División por cero
calcularSeguro(calculadora.sumar.bind(calculadora), "abc", 5);   // ✗ Error: No es número válido
```

## 🧪 Testing

Cada módulo incluye sus propias pruebas. Para ejecutarlas:

```bash
# Probar módulo de suma
cd 2025a-swgr2-ee-suma
npm test

# Probar aplicación completa
cd calculadora-app
npm test
```

## 🛠️ Scripts Disponibles

En `calculadora-app`:
- `npm start`: Ejecuta la aplicación principal
- `npm run demo`: Ejecuta la demostración completa
- `npm test`: Ejecuta las pruebas
- `npm run benchmark`: Ejecuta pruebas de rendimiento (si está implementado)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

### Guías de Contribución

- Mantener la modularidad del proyecto
- Incluir pruebas para nuevas funcionalidades
- Documentar todas las funciones con JSDoc
- Seguir el estilo de código existente
- Optimizar para rendimiento y escalabilidad

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Erick** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Inspirado en las mejores prácticas de NPM
- Diseñado para aprendizaje y uso en producción
- Construido con enfoque en la calidad del código

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
