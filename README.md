# Tarea 4: Agenda React con Servicios Web en Express
**Materia:** Programación Web  
**Fecha:** 3 de noviembre 2026  
**Tema:** Introducción a las herramientas Node.js y npm / Servicios web con Express  

---

## 📌 Descripción del Proyecto
Esta aplicación es una **Agenda Inteligente y Moderna de Contactos** construida bajo una arquitectura desacoplada Full Stack:
- **Backend:** Node.js + Express (API RESTful con soporte CRUD completo, filtros y persistencia de datos).
- **Frontend:** React (Vite) con maquetación moderna, tipografías combinadas (*Outfit* y *Plus Jakarta Sans*), micro-interacciones y diseño UX/UI.

---

## 🚀 Estructura del Proyecto

```
tarea4PWEB/
├── package.json               # Dependencias de backend y scripts de orquestación
├── .gitignore                 # Exclusiones de Git (node_modules, dist, etc.)
├── server/
│   ├── server.js              # Inicialización de la aplicación Express y middlewares
│   ├── routes/
│   │   └── contactos.js       # Definición de rutas REST
│   ├── controllers/
│   │   └── contactosController.js # Lógica de negocio (CRUD, filtros, validación)
│   └── data/
│       └── contacts.json      # Almacenamiento persistente en formato JSON
└── client/
    ├── package.json           # Dependencias React + Vite + Lucide Icons
    ├── index.html             # Configuración de tipografías y viewport
    └── src/
        ├── App.jsx            # Vista principal, métricas y gestión de estado
        ├── index.css          # Estilos CSS modernos con CSS Variables
        ├── components/
        │   ├── ContactCard.jsx   # Tarjetas dinámicas con avatares e indicadores
        │   └── ContactModal.jsx  # Formulario modal de creación y edición
        └── services/
            └── api.js         # Cliente HTTP fetch para conectar con Express
```

---

## 🛠️ Requisitos Previos
- **Node.js** (versión 18 o superior recomendada)
- **npm** (gestor de paquetes de Node)

---

## ⚙️ Instrucciones de Instalación y Ejecución

### 1. Clonar o abrir el proyecto
Abre la terminal en la raíz de este proyecto:
```bash
cd "tarea4PWEB"
```

### 2. Instalar dependencias

**Dependencias del Servidor (raíz):**
```bash
npm install
```

**Dependencias del Cliente (React):**
```bash
cd client
npm install
cd ..
```

---

## 🏃 Modo de Desarrollo

Para ejecutar tanto el servidor Express como la aplicación cliente React en paralelo con un único comando:

```bash
npm run dev
```

Esto iniciará:
- 🟢 **Servidor Express (API):** [http://localhost:4000](http://localhost:4000)
- ⚛️ **Aplicación React:** [http://localhost:5173](http://localhost:5173)

### Ejecución individual (opcional):
- Solo el backend: `npm run server`
- Solo el frontend: `npm run client`

---

## 🌐 Endpoints de la API REST (`/api`)

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/info` | Metadatos informativos de la tarea académica |
| `GET` | `/api/contactos` | Retorna lista de contactos (soporta query `q`, `categoria`, `soloFavoritos`) |
| `GET` | `/api/contactos/:id` | Retorna el detalle de un contacto específico |
| `POST` | `/api/contactos` | Registra un nuevo contacto |
| `PUT` | `/api/contactos/:id` | Actualiza los datos de un contacto existente |
| `DELETE` | `/api/contactos/:id` | Elimina un contacto de la agenda |
| `PATCH` | `/api/contactos/:id/favorito` | Alterna el estado de favorito/destacado |

---

## ✨ Características UX/UI
- **Diseño Glassmorphism & Dark UI**: Paleta armónica con contraste accesible y sombras profundas.
- **Tipografía Diferenciada**: Títulos en *Outfit* y cuerpo de lectura en *Plus Jakarta Sans*.
- **Métricas en Vivo**: Contadores dinámicos de contactos, favoritos y categorías en el encabezado.
- **Búsqueda en Tiempo Real**: Búsqueda reactiva por nombre, correo, cargo o teléfono.
- **Filtros por Píldoras**: Segmentación por Trabajo, Personal, Universidad, etc.
- **Notificaciones Toast**: Retroalimentación visual inmediata tras cada acción del usuario.
