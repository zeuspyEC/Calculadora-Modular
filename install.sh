#!/bin/bash
# Script de instalación automatizada para la calculadora modular
# Este script realiza npm link en todos los módulos y los vincula en la app

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        INSTALACIÓN DE CALCULADORA MODULAR NPM                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para manejar errores
handle_error() {
    echo -e "${RED}✗ Error: $1${NC}"
    exit 1
}

# Función para mostrar éxito
show_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Función para mostrar información
show_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -d "2025a-swgr2-ee-suma" ] || [ ! -d "calculadora-app" ]; then
    handle_error "Este script debe ejecutarse desde el directorio raíz del proyecto calculadora-modular"
fi

# Array de módulos
declare -a modulos=(
    "2025a-swgr2-ee-suma"
    "2025a-swgr2-ee-resta"
    "2025a-swgr2-ee-multiplicacion"
    "2025a-swgr2-ee-division"
)

echo "Paso 1: Instalando módulos localmente con npm link"
echo "=================================================="
echo ""

# Instalar cada módulo
for modulo in "${modulos[@]}"
do
    show_info "Instalando módulo: $modulo"
    cd "$modulo" || handle_error "No se pudo acceder al directorio $modulo"
    
    # Ejecutar npm link
    if npm link > /dev/null 2>&1; then
        show_success "Módulo $modulo instalado correctamente"
    else
        handle_error "Fallo al instalar módulo $modulo"
    fi
    
    cd ..
done

echo ""
echo "Paso 2: Vinculando módulos en la aplicación principal"
echo "===================================================="
echo ""

# Cambiar a directorio de la app
cd calculadora-app || handle_error "No se pudo acceder al directorio calculadora-app"

# Vincular cada módulo
for modulo in "${modulos[@]}"
do
    show_info "Vinculando módulo: $modulo"
    
    if npm link "$modulo" > /dev/null 2>&1; then
        show_success "Módulo $modulo vinculado correctamente"
    else
        handle_error "Fallo al vincular módulo $modulo"
    fi
done

echo ""
echo "Paso 3: Verificando instalación"
echo "==============================="
echo ""

# Verificar que la app funciona
show_info "Ejecutando prueba básica..."

if node -e "const {calculadora} = require('./index.js'); console.log('Prueba: 2 + 2 =', calculadora.sumar(2, 2));" 2>/dev/null | grep -q "4"; then
    show_success "La calculadora está funcionando correctamente"
else
    handle_error "La calculadora no está funcionando correctamente"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              INSTALACIÓN COMPLETADA CON ÉXITO                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Próximos pasos:"
echo "  1. cd calculadora-app"
echo "  2. npm start          # Ejecutar la aplicación"
echo "  3. npm run demo       # Ver demostración completa"
echo ""
show_success "¡Todo listo para usar!"
