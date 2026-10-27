import React from 'react';
import { 
  Phone, 
  Mail, 
  Briefcase, 
  Star, 
  Pencil, 
  Trash2,
  Building2
} from 'lucide-react';

export default function ContactCard({ contacto, onEdit, onDelete, onToggleFav }) {
  const getIniciales = (nombre) => {
    if (!nombre) return '?';
    const partes = nombre.trim().split(' ');
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
  };

  const badgeColors = {
    'Trabajo': 'rgba(14, 165, 233, 0.15)',
    'Personal': 'rgba(236, 72, 153, 0.15)',
    'Universidad': 'rgba(16, 185, 129, 0.15)',
    'Servicios': 'rgba(139, 92, 246, 0.15)',
    'General': 'rgba(148, 163, 184, 0.15)'
  };

  const badgeTextColors = {
    'Trabajo': '#38bdf8',
    'Personal': '#f472b6',
    'Universidad': '#34d399',
    'Servicios': '#a78bfa',
    'General': '#cbd5e1'
  };

  return (
    <div className="contact-card">
      <div className="contact-header">
        <div 
          className="avatar" 
          style={{ backgroundColor: contacto.avatarColor || '#6366f1' }}
        >
          {getIniciales(contacto.nombre)}
        </div>
        <div className="contact-title-group">
          <h3 className="contact-name" title={contacto.nombre}>{contacto.nombre}</h3>
          <p className="contact-role">
            {contacto.cargo || contacto.empresa ? (
              <>
                {contacto.cargo} {contacto.cargo && contacto.empresa ? '·' : ''} {contacto.empresa}
              </>
            ) : (
              'Sin detalles laborales'
            )}
          </p>
        </div>
        <button
          className={`fav-action-btn ${contacto.favorito ? 'is-fav' : ''}`}
          onClick={() => onToggleFav(contacto.id)}
          title={contacto.favorito ? 'Quitar de favoritos' : 'Marcar como favorito'}
          aria-label="Alternar favorito"
        >
          <Star size={20} fill={contacto.favorito ? '#f59e0b' : 'transparent'} />
        </button>
      </div>

      <div className="contact-details">
        <span 
          className="contact-badge"
          style={{
            backgroundColor: badgeColors[contacto.categoria] || badgeColors['General'],
            color: badgeTextColors[contacto.categoria] || badgeTextColors['General']
          }}
        >
          {contacto.categoria || 'General'}
        </span>

        <div className="detail-item">
          <Phone size={15} />
          <span>{contacto.telefono}</span>
        </div>

        {contacto.email && (
          <div className="detail-item">
            <Mail size={15} />
            <span>{contacto.email}</span>
          </div>
        )}

        {contacto.empresa && (
          <div className="detail-item">
            <Building2 size={15} />
            <span>{contacto.empresa}</span>
          </div>
        )}

        {contacto.notas && (
          <div className="contact-note">
            "{contacto.notas}"
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          className="btn-card-action"
          onClick={() => onEdit(contacto)}
          title="Editar contacto"
        >
          <Pencil size={14} />
          <span>Editar</span>
        </button>
        <button 
          className="btn-card-action btn-delete"
          onClick={() => onDelete(contacto.id, contacto.nombre)}
          title="Eliminar contacto"
        >
          <Trash2 size={14} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
}
