import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Star, 
  Sparkles, 
  BookOpen, 
  RefreshCw,
  Building,
  GraduationCap,
  Layers,
  Heart
} from 'lucide-react';
import { contactoService } from './services/api';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';

const CATEGORIAS = ['Todas', 'Trabajo', 'Personal', 'Universidad', 'Servicios', 'General'];

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
  const [toast, setToast] = useState(null);
  const [infoTarea, setInfoTarea] = useState(null);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const cargarContactos = async () => {
    try {
      setCargando(true);
      const res = await contactoService.obtenerTodos({
        q: busqueda,
        categoria: categoriaSeleccionada,
        soloFavoritos
      });
      setContactos(res.datos || []);
    } catch (error) {
      mostrarNotificacion(error.message || 'Error al conectar con la API Express', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    contactoService.obtenerInfoTarea()
      .then(res => setInfoTarea(res))
      .catch(() => console.log('Sin conexión inicial con metadata de Express'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      cargarContactos();
    }, 200);
    return () => clearTimeout(timer);
  }, [busqueda, categoriaSeleccionada, soloFavoritos]);

  const handleNuevoContacto = () => {
    setContactoSeleccionado(null);
    setIsModalOpen(true);
  };

  const handleEditarContacto = (contacto) => {
    setContactoSeleccionado(contacto);
    setIsModalOpen(true);
  };

  const handleGuardarContacto = async (formData, id) => {
    try {
      if (id) {
        await contactoService.actualizar(id, formData);
        mostrarNotificacion('Contacto actualizado exitosamente');
      } else {
        await contactoService.crear(formData);
        mostrarNotificacion('Nuevo contacto guardado en la agenda');
      }
      setIsModalOpen(false);
      cargarContactos();
    } catch (error) {
      mostrarNotificacion(error.message || 'Error al procesar la solicitud', 'error');
    }
  };

  const handleEliminarContacto = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a "${nombre}" de tu agenda?`)) {
      try {
        await contactoService.eliminar(id);
        mostrarNotificacion('Contacto eliminado correctamente');
        cargarContactos();
      } catch (error) {
        mostrarNotificacion(error.message || 'Error al eliminar', 'error');
      }
    }
  };

  const handleToggleFavorito = async (id) => {
    try {
      await contactoService.toggleFavorito(id);
      cargarContactos();
    } catch (error) {
      mostrarNotificacion('No se pudo actualizar el favorito', 'error');
    }
  };

  // Cálculos estadísticos para el dashboard
  const totalContactos = contactos.length;
  const totalFavoritos = contactos.filter(c => c.favorito).length;
  const totalLaborales = contactos.filter(c => c.categoria === 'Trabajo').length;

  return (
    <div className="app-container">
      {/* Toast Notificaciones */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.tipo}`}>
            {toast.tipo === 'success' ? '✓' : '⚠️'} {toast.mensaje}
          </div>
        </div>
      )}

      {/* Header & Identidad del Proyecto */}
      <header className="app-header">
        <div>
          <div className="brand-badge">
            <Sparkles size={14} />
            <span>Programación Web · ITLA 2026</span>
          </div>
          <h1 className="brand-title">Agenda React & Express</h1>
          <div className="brand-subtitle">
            <span>Tarea 4: Servicios Web con Express</span>
            <span className="tag-academic">3 de noviembre 2026</span>
            {infoTarea && (
              <span className="tag-academic" style={{ color: '#34d399' }}>
                ● API Express v{infoTarea.version} Activa
              </span>
            )}
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-secondary" 
            onClick={cargarContactos}
            title="Recargar agenda"
          >
            <RefreshCw size={16} />
            <span>Sincronizar</span>
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleNuevoContacto}
          >
            <UserPlus size={18} />
            <span>Nuevo Contacto</span>
          </button>
        </div>
      </header>

      {/* Tarjetas de Métricas Rápidas */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Users size={22} />
          </div>
          <div className="stat-info">
            <h4>Total Contactos</h4>
            <p>{totalContactos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Star size={22} />
          </div>
          <div className="stat-info">
            <h4>Favoritos</h4>
            <p>{totalFavoritos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
            <Building size={22} />
          </div>
          <div className="stat-info">
            <h4>Corporativos</h4>
            <p>{totalLaborales}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <Layers size={22} />
          </div>
          <div className="stat-info">
            <h4>Categorías</h4>
            <p>{CATEGORIAS.length - 1}</p>
          </div>
        </div>
      </section>

      {/* Barra de Filtros y Búsqueda */}
      <section className="controls-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono, email o cargo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              className={`category-chip ${categoriaSeleccionada === cat ? 'active' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}

          <button
            className={`toggle-fav-btn ${soloFavoritos ? 'active' : ''}`}
            onClick={() => setSoloFavoritos(!soloFavoritos)}
          >
            <Star size={15} fill={soloFavoritos ? '#f59e0b' : 'none'} />
            <span>Destacados</span>
          </button>
        </div>
      </section>

      {/* Grid de Contactos */}
      {cargando ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <RefreshCw className="animate-spin" size={28} style={{ margin: '0 auto 1rem' }} />
          <p>Conectando con el servidor Express...</p>
        </div>
      ) : contactos.length > 0 ? (
        <main className="contacts-grid">
          {contactos.map(contacto => (
            <ContactCard
              key={contacto.id}
              contacto={contacto}
              onEdit={handleEditarContacto}
              onDelete={handleEliminarContacto}
              onToggleFav={handleToggleFavorito}
            />
          ))}
        </main>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Users size={32} />
          </div>
          <h3>No se encontraron contactos</h3>
          <p>
            {busqueda || categoriaSeleccionada !== 'Todas' || soloFavoritos
              ? 'Prueba ajustando los filtros o el término de búsqueda.'
              : 'Empieza agregando tu primer contacto a la libreta usando el botón superior.'}
          </p>
          <button className="btn btn-primary" onClick={handleNuevoContacto}>
            <UserPlus size={16} /> Crear Contacto Ahora
          </button>
        </div>
      )}

      {/* Modal para Creación / Edición */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleGuardarContacto}
        contactToEdit={contactoSeleccionado}
      />
    </div>
  );
}
