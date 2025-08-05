@echo off
REM Script de instalación automatizada para la calculadora modular (Windows)
REM Este script realiza npm link en todos los módulos y los vincula en la app

echo ╔══════════════════════════════════════════════════════════════╗
echo ║        INSTALACION DE CALCULADORA MODULAR NPM                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Verificar que estamos en el directorio correcto
if not exist "2025a-swgr2-ee-suma" (
    echo ERROR: Este script debe ejecutarse desde el directorio raiz del proyecto
    pause
    exit /b 1
)

echo Paso 1: Instalando modulos localmente con npm link
echo ==================================================
echo.

REM Instalar módulo de suma
echo Instalando modulo: 2025a-swgr2-ee-suma
cd 2025a-swgr2-ee-suma
call npm link >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar modulo de suma
    pause
    exit /b 1
)
echo [OK] Modulo de suma instalado
cd ..

REM Instalar módulo de resta
echo Instalando modulo: 2025a-swgr2-ee-resta
cd 2025a-swgr2-ee-resta
call npm link >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar modulo de resta
    pause
    exit /b 1
)
echo [OK] Modulo de resta instalado
cd ..

REM Instalar módulo de multiplicación
echo Instalando modulo: 2025a-swgr2-ee-multiplicacion
cd 2025a-swgr2-ee-multiplicacion
call npm link >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar modulo de multiplicacion
    pause
    exit /b 1
)
echo [OK] Modulo de multiplicacion instalado
cd ..

REM Instalar módulo de división
echo Instalando modulo: 2025a-swgr2-ee-division
cd 2025a-swgr2-ee-division
call npm link >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar modulo de division
    pause
    exit /b 1
)
echo [OK] Modulo de division instalado
cd ..

echo.
echo Paso 2: Vinculando modulos en la aplicacion principal
echo ====================================================
echo.

REM Cambiar a directorio de la app
cd calculadora-app

REM Vincular módulos
echo Vinculando modulos...
call npm link 2025a-swgr2-ee-suma >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al vincular modulo de suma
    pause
    exit /b 1
)
echo [OK] Modulo de suma vinculado

call npm link 2025a-swgr2-ee-resta >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al vincular modulo de resta
    pause
    exit /b 1
)
echo [OK] Modulo de resta vinculado

call npm link 2025a-swgr2-ee-multiplicacion >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al vincular modulo de multiplicacion
    pause
    exit /b 1
)
echo [OK] Modulo de multiplicacion vinculado

call npm link 2025a-swgr2-ee-division >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Fallo al vincular modulo de division
    pause
    exit /b 1
)
echo [OK] Modulo de division vinculado

echo.
echo Paso 3: Verificando instalacion
echo ===============================
echo.

REM Verificar que funciona
echo Ejecutando prueba basica...
node -e "const {calculadora} = require('./index.js'); console.log('Prueba: 2 + 2 =', calculadora.sumar(2, 2));"

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║              INSTALACION COMPLETADA CON EXITO                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Proximos pasos:
echo   1. cd calculadora-app
echo   2. npm start          (Ejecutar la aplicacion)
echo   3. npm run demo       (Ver demostracion completa)
echo.
echo Todo listo para usar!
echo.

pause
