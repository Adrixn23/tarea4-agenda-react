const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, '../data/contacts.json');

function leerContactos() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    return [];
  }
}

function guardarContactos(contactos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2), 'utf8');
}

const AVATAR_PALETTE = ['#0284c7', '#7c3aed', '#db2777', '#059669', '#d97706', '#dc2626', '#4f46e5'];

exports.obtenerContactos = (req, res) => {
  const { q, categoria, soloFavoritos } = req.query;
  let lista = leerContactos();

  if (q) {
    const termino = q.toLowerCase().trim();
    lista = lista.filter(c => 
      c.nombre.toLowerCase().includes(termino) ||
      c.telefono.toLowerCase().includes(termino) ||
      (c.email && c.email.toLowerCase().includes(termino)) ||
      (c.empresa && c.empresa.toLowerCase().includes(termino))
    );
  }

  if (categoria && categoria !== 'Todas') {
    lista = lista.filter(c => c.categoria === categoria);
  }

  if (soloFavoritos === 'true') {
    lista = lista.filter(c => c.favorito === true);
  }

  res.json({
    ok: true,
    total: lista.length,
    datos: lista
  });
};

exports.obtenerContactoPorId = (req, res) => {
  const { id } = req.params;
  const contactos = leerContactos();
  const encontrado = contactos.find(c => c.id === id);

  if (!encontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontró ningún contacto con ID ${id}`
    });
  }

  res.json({
    ok: true,
    datos: encontrado
  });
};

exports.crearContacto = (req, res) => {
  const { nombre, telefono, email, categoria, empresa, cargo, notas, favorito } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El nombre y el teléfono son campos obligatorios.'
    });
  }

  const contactos = leerContactos();

  const nuevo = {
    id: 'c_' + crypto.randomUUID().slice(0, 8),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    email: email ? email.trim() : '',
    categoria: categoria || 'General',
    empresa: empresa ? empresa.trim() : '',
    cargo: cargo ? cargo.trim() : '',
    notas: notas ? notas.trim() : '',
    favorito: Boolean(favorito),
    avatarColor: AVATAR_PALETTE[Math.floor(Math.random() * AVATAR_PALETTE.length)],
    creadoEn: new Date().toISOString()
  };

  contactos.unshift(nuevo);
  guardarContactos(contactos);

  res.status(201).json({
    ok: true,
    mensaje: 'Contacto registrado satisfactoriamente',
    datos: nuevo
  });
};

exports.actualizarContacto = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email, categoria, empresa, cargo, notas, favorito } = req.body;

  const contactos = leerContactos();
  const index = contactos.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Contacto no encontrado para actualizar.'
    });
  }

  contactos[index] = {
    ...contactos[index],
    nombre: nombre !== undefined ? nombre.trim() : contactos[index].nombre,
    telefono: telefono !== undefined ? telefono.trim() : contactos[index].telefono,
    email: email !== undefined ? email.trim() : contactos[index].email,
    categoria: categoria !== undefined ? categoria : contactos[index].categoria,
    empresa: empresa !== undefined ? empresa.trim() : contactos[index].empresa,
    cargo: cargo !== undefined ? cargo.trim() : contactos[index].cargo,
    notas: notas !== undefined ? notas.trim() : contactos[index].notas,
    favorito: favorito !== undefined ? Boolean(favorito) : contactos[index].favorito,
    actualizadoEn: new Date().toISOString()
  };

  guardarContactos(contactos);

  res.json({
    ok: true,
    mensaje: 'Contacto actualizado correctamente',
    datos: contactos[index]
  });
};

exports.eliminarContacto = (req, res) => {
  const { id } = req.params;
  const contactos = leerContactos();
  const filtrados = contactos.filter(c => c.id !== id);

  if (contactos.length === filtrados.length) {
    return res.status(404).json({
      ok: false,
      mensaje: 'El contacto a eliminar no existe.'
    });
  }

  guardarContactos(filtrados);

  res.json({
    ok: true,
    mensaje: 'Contacto eliminado de la agenda con éxito',
    idEliminado: id
  });
};

exports.alternarFavorito = (req, res) => {
  const { id } = req.params;
  const contactos = leerContactos();
  const contacto = contactos.find(c => c.id === id);

  if (!contacto) {
    return res.status(404).json({
      ok: false,
      mensaje: 'Contacto no encontrado.'
    });
  }

  contacto.favorito = !contacto.favorito;
  guardarContactos(contactos);

  res.json({
    ok: true,
    mensaje: `Contacto marcado como ${contacto.favorito ? 'favorito' : 'no favorito'}`,
    datos: contacto
  });
};
