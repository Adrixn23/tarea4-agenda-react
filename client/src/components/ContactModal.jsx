import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save } from 'lucide-react';

const CATEGORIAS = ['Trabajo', 'Personal', 'Universidad', 'Servicios', 'General'];

export default function ContactModal({ isOpen, onClose, onSave, contactToEdit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    categoria: 'Trabajo',
    empresa: '',
    cargo: '',
    notas: '',
    favorito: false
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        nombre: contactToEdit.nombre || '',
        telefono: contactToEdit.telefono || '',
        email: contactToEdit.email || '',
        categoria: contactToEdit.categoria || 'Trabajo',
        empresa: contactToEdit.empresa || '',
        cargo: contactToEdit.cargo || '',
        notas: contactToEdit.notas || '',
        favorito: contactToEdit.favorito || false
      });
    } else {
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        categoria: 'Trabajo',
        empresa: '',
        cargo: '',
        notas: '',
        favorito: false
      });
    }
    setErrores({});
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre completo es requerido';
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El número de teléfono es requerido';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onSave(formData, contactToEdit ? contactToEdit.id : null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{contactToEdit ? 'Editar Contacto' : 'Añadir Nuevo Contacto'}</h3>
          <button 
            className="btn-icon" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo *</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ej. Ing. Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
                autoFocus
              />
              {errores.nombre && (
                <span style={{ color: '#f43f5e', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                  {errores.nombre}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Teléfono / Móvil *</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+1 (809) 000-0000"
                  value={formData.telefono}
                  onChange={handleChange}
                />
                {errores.telefono && (
                  <span style={{ color: '#f43f5e', fontSize: '0.78rem', marginTop: '0.25rem', display: 'block' }}>
                    {errores.telefono}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="empresa">Empresa / Institución</label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder="Ej. ITLA, Google, etc."
                  value={formData.empresa}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cargo">Cargo o Puesto</label>
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder="Ej. Estudiante, Desarrollador"
                  value={formData.cargo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notas">Notas u Observaciones</label>
              <textarea
                id="notas"
                name="notas"
                rows="2"
                placeholder="Información adicional sobre el contacto..."
                value={formData.notas}
                onChange={handleChange}
              ></textarea>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                id="favorito"
                name="favorito"
                type="checkbox"
                checked={formData.favorito}
                onChange={handleChange}
                style={{ width: 'auto', margin: 0, cursor: 'pointer' }}
              />
              <label htmlFor="favorito" style={{ margin: 0, cursor: 'pointer', fontSize: '0.88rem' }}>
                Marcar como contacto prioritario / favorito ⭐
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {contactToEdit ? (
                <>
                  <Save size={16} /> Guardar Cambios
                </>
              ) : (
                <>
                  <UserPlus size={16} /> Registrar Contacto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
