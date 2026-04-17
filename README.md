# LabNotes — App de notas y recordatorios 📝

Aplicación web para crear, organizar y gestionar notas personales. Proyecto desarrollado durante el bootcamp de Laboratoria.

## 🚀 Demo

[Ver aplicación en vivo](https://labnotes-beta.vercel.app)

### 🔑 Acceso

El ingreso es mediante **autenticación con Google**. No requiere registro previo.

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

## 👩‍💻 Desarrollado por

[Estefanía Osses Vera](https://github.com/Niennis) — Bootcamp Laboratoria, 2019
