@echo off
ECHO Creando estructura de carpetas y archivos vacios para el proyecto separado...

:: Backend
mkdir backend
cd backend
mkdir controllers
mkdir models
mkdir routes
echo. > .env
echo. > app.js
echo. > controllers\entryController.js
echo. > models\entryModel.js
echo. > routes\entryRoutes.js
cd ..

:: Frontend EJS
mkdir frontend-ejs
cd frontend-ejs
mkdir public
mkdir public\css
mkdir public\js
mkdir public\summernote
mkdir views
mkdir views\partials
echo. > .env
echo. > app.js
echo. > views\index.ejs
echo. > views\new.ejs
echo. > views\view.ejs
echo. > views\edit.ejs
echo. > views\partials\header.ejs
echo. > views\partials\footer.ejs
cd ..

:: Frontend React
mkdir frontend-react
cd frontend-react
mkdir public
mkdir src
mkdir src\components
echo. > .env
echo. > vite.config.js
echo. > src\App.jsx
echo. > src\index.jsx
echo. > src\components\EntryList.jsx
echo. > src\components\NewEntry.jsx
echo. > src\components\ViewEntry.jsx
echo. > src\components\EditEntry.jsx
cd ..

:: Frontend Tkinter
mkdir frontend-tkinter
cd frontend-tkinter
echo. > .env
echo. > app.py
echo. > api.py
cd ..

ECHO Estructura creada exitosamente. Descarga Bootstrap y Summernote manualmente en las carpetas public correspondientes para frontend-ejs.
ECHO Para frontend-tkinter, instala dependencias: pip install requests python-dotenv
pause