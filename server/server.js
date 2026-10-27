const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const contactosRoutes = require('./routes/contactos');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck & metadata de la tarea
app.get('/api/info', (req, res) => {
  res.json({
    materia: 'Programación Web',
    tarea: 'Tarea 4: Agenda React con Servicios Web Express',
    fecha: '3 de noviembre 2026',
    tema: 'Introducción a las herramientas node y npm - Servicios web con express',
    estado: 'online',
    version: '1.0.0'
  });
});

// Rutas API
app.use('/api/contactos', contactosRoutes);

// Manejador 404 para rutas API
app.use('/api', (req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: 'Ruta de API no encontrada'
  });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado en el servidor:', err);
  res.status(500).json({
    ok: false,
    mensaje: 'Error interno en el servidor Express',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 [Express] Servidor API REST ejecutándose en: http://localhost:${PORT}`);
  console.log(`📋 Info de la tarea: http://localhost:${PORT}/api/info`);
  console.log(`👥 Endpoint contactos: http://localhost:${PORT}/api/contactos`);
});
