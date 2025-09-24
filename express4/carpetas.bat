REM ESTE SCRIPT CREA LA ESTRUCTURA DE CARPETAS Y LOS ARCHIVOS VACIOS DEL PROYECTO.
@echo off
ECHO Creando subcarpetas y archivos vacios para el proyecto diario-app...

:: Crear subcarpetas
mkdir controllers
mkdir models
mkdir views
mkdir views\partials
mkdir public

:: Crear archivos vacios
echo. > app.js
echo. > .env
echo. > controllers\entryController.js
echo. > models\entryModel.js
echo. > views\index.ejs
echo. > views\new.ejs
echo. > views\view.ejs
echo. > views\edit.ejs
echo. > views\partials\header.ejs
echo. > views\partials\footer.ejs

ECHO Estructura de carpetas y archivos creada exitosamente.
pause