# 📚 Guía de Git Submodules

Esta guía explica cómo integrar repositorios externos dentro de tu proyecto de calculadora modular usando Git submodules.

## ¿Qué son los Git Submodules?

Los submodules de Git te permiten incluir un repositorio Git dentro de otro repositorio Git. Esto es útil cuando quieres:
- Mantener proyectos separados pero relacionados
- Incluir librerías externas manteniendo su historial independiente
- Colaborar con otros equipos manteniendo la modularidad

## Agregar un Submodule

Para agregar el repositorio de un compañero como submodule:

```bash
# Sintaxis general
git submodule add <URL_del_repositorio> <directorio_destino>

# Ejemplo con el repositorio mencionado
git submodule add https://github.com/2025A-Constr-SWGR1/Const-GR1-granizo-ayala-dylan-jhossue.git submodulos
```

Esto creará:
- Una carpeta `submodulos` con el contenido del repositorio
- Un archivo `.gitmodules` que registra la configuración del submodule
- Una entrada en el índice de Git para el submodule

## Estructura con Submodules

```
calculadora-modular/
├── 2025a-swgr2-ee-suma/          # Tu módulo de suma
├── 2025a-swgr2-ee-resta/         # Tu módulo de resta
├── 2025a-swgr2-ee-multiplicacion/ # Tu módulo de multiplicación
├── 2025a-swgr2-ee-division/      # Tu módulo de división
├── calculadora-app/              # Tu aplicación principal
├── submodulos/                   # Carpeta con repositorios externos
│   └── [contenido del repo externo]
├── .gitmodules                   # Configuración de submodules
└── README.md
```

## Comandos Útiles

### Clonar un proyecto con submodules

```bash
# Opción 1: Clonar e inicializar en pasos separados
git clone <URL_de_tu_repositorio>
cd calculadora-modular
git submodule init
git submodule update

# Opción 2: Clonar con submodules incluidos
git clone --recurse-submodules <URL_de_tu_repositorio>
```

### Actualizar submodules

```bash
# Actualizar todos los submodules
git submodule update --remote

# Actualizar un submodule específico
git submodule update --remote submodulos
```

### Ver estado de submodules

```bash
git submodule status
```

### Trabajar dentro de un submodule

```bash
# Entrar al directorio del submodule
cd submodulos

# Hacer cambios (si tienes permisos)
git checkout -b nueva-rama
# ... hacer cambios ...
git add .
git commit -m "Descripción de cambios"
git push origin nueva-rama

# Volver al proyecto principal
cd ..

# Actualizar la referencia del submodule en el proyecto principal
git add submodulos
git commit -m "Actualizar referencia del submodule"
```

## Integración con la Calculadora Modular

Si los compañeros han creado sus propios módulos de calculadora, puedes:

1. **Agregar sus repositorios como submodules**:
```bash
git submodule add https://github.com/companero1/2025a-swgr2-xx-suma.git submodulos/modulo-suma-companero1
git submodule add https://github.com/companero2/2025a-swgr2-yy-resta.git submodulos/modulo-resta-companero2
```

2. **Usar sus módulos en tu aplicación**:
```javascript
// En calculadora-app/index.js
const miModuloSuma = require('2025a-swgr2-ee-suma');
const moduloSumaCompanero = require('../submodulos/modulo-suma-companero1');

// Comparar implementaciones
console.log('Mi suma:', miModuloSuma.suma(10, 20));
console.log('Suma compañero:', moduloSumaCompanero.suma(10, 20));
```

## Mejores Prácticas

1. **No modificar directamente el código en submodules** a menos que tengas permisos
2. **Documentar qué submodules son necesarios** en el README principal
3. **Especificar versiones/commits específicos** para estabilidad:
   ```bash
   cd submodulos
   git checkout <commit-especifico>
   cd ..
   git add submodulos
   git commit -m "Fijar submodule a versión específica"
   ```

4. **Mantener los submodules actualizados** regularmente
5. **Usar rutas relativas** cuando sea posible para portabilidad

## Ejemplo de .gitmodules

```ini
[submodule "submodulos"]
    path = submodulos
    url = https://github.com/2025A-Constr-SWGR1/Const-GR1-granizo-ayala-dylan-jhossue.git
    branch = main

[submodule "submodulos/modulo-suma-companero"]
    path = submodulos/modulo-suma-companero
    url = https://github.com/companero/modulo-suma.git
    branch = main
```

## Solución de Problemas

### Error: "fatal: 'submodulos' already exists in the index"
```bash
git rm -r --cached submodulos
git submodule add <URL> submodulos
```

### Submodule vacío después de clonar
```bash
git submodule init
git submodule update
```

### Conflictos con submodules
```bash
# Ver qué commit está registrado
git ls-tree HEAD submodulos

# Actualizar a la versión correcta
cd submodulos
git checkout <commit-correcto>
cd ..
git add submodulos
git commit -m "Resolver conflicto de submodule"
```

## Flujo de Trabajo Colaborativo

1. **Cada estudiante crea su módulo** en su propio repositorio
2. **El coordinador del grupo** agrega todos como submodules
3. **Se crea la aplicación principal** que integra todos los módulos
4. **Cada estudiante puede actualizar su módulo** independientemente
5. **El coordinador actualiza las referencias** cuando hay cambios importantes

---

💡 **Tip**: Los submodules son excelentes para mantener la modularidad y permitir desarrollo independiente, pero requieren coordinación entre el equipo para evitar conflictos.
