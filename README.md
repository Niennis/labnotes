# LabNotes — App de notas y recordatorios 📝

Aplicación web para crear, organizar y gestionar notas personales. Proyecto desarrollado durante el bootcamp de Laboratoria.

## 🚀 Demo

[Ver aplicación en vivo](https://labnotes-beta.vercel.app)

### 🔑 Acceso

El ingreso es mediante **autenticación con Google**. No requiere registro previo.

## 📁 Estructura del proyecto

```
labnotes/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── Confirm.jsx       # Diálogo de confirmación
    │   ├── Form.jsx
    │   ├── Modal.jsx
    │   ├── Navbar.jsx
    │   ├── Note.jsx          # Tarjeta de nota individual
    │   └── NoteForm.jsx      # Formulario crear/editar nota
    ├── views/
    │   ├── Home.jsx          # Vista principal con listado de notas
    │   ├── Login.jsx
    │   └── Register.jsx
    ├── utils/
    │   ├── firebase.js       # Inicialización de Firebase
    │   ├── serviceFirebase.js # Operaciones CRUD con Firestore
    │   └── theme.js          # Colores disponibles para notas
    ├── test/
    │   └── Notes.test.js     # Tests de Note, ConfirmDialog y NoteForm
    ├── App.js
    └── App.test.js           # Tests de App (rutas y autenticación)
```

## ✨ Funcionalidades

- Crear, editar y eliminar notas
- Almacenamiento en la nube (datos persistentes entre sesiones)
- Autenticación con cuenta de Google
- Interfaz limpia y responsiva

## 🛠️ Stack tecnológico

- **Frontend:** React (Create React App)
- **Base de datos:** Firebase Firestore
- **Autenticación:** Firebase Auth (Google)
- **Estilos:** Bootstrap / CSS
- **Despliegue:** Firebase Hosting

## ⚙️ Cómo correr localmente

```bash
# Clonar el repositorio
git clone https://github.com/Niennis/labnotes.git
cd labnotes

# Instalar dependencias
npm install

# Correr en modo desarrollo
npm start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> **Nota:** Necesitas configurar un proyecto en Firebase y agregar las credenciales en un archivo `.env.local` para que la autenticación y la base de datos funcionen localmente.

```env
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

## 🧪 Tests

El proyecto incluye tests con [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```bash
npm test
```

**Cobertura:**

| Archivo | Qué se testea |
|---|---|
| `App.test.js` | Renderizado sin errores, vista de login sin sesión, links del navbar |
| `test/Notes.test.js` | `Note`: título, color de fondo, botones editar/eliminar |
| | `ConfirmDialog`: visibilidad según prop `open`, callbacks Aceptar/Cancelar |
| | `NoteForm`: título según modo (nueva/editar), validación del botón Guardar, selector de colores |

## 👩‍💻 Desarrollado por

[Estefanía Osses Vera](https://github.com/Niennis) — Bootcamp Laboratoria, 2019
