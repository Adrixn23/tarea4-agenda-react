const express = require('express');
const router = express.Router();
const contactosController = require('../controllers/contactosController');

// Rutas de contactos
router.get('/', contactosController.obtenerContactos);
router.get('/:id', contactosController.obtenerContactoPorId);
router.post('/', contactosController.crearContacto);
router.put('/:id', contactosController.actualizarContacto);
router.delete('/:id', contactosController.eliminarContacto);
router.patch('/:id/favorito', contactosController.alternarFavorito);

module.exports = router;
