const API_BASE = 'http://localhost:4000/api';

export const contactoService = {
  async obtenerTodos(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.q) params.append('q', filtros.q);
    if (filtros.categoria && filtros.categoria !== 'Todas') params.append('categoria', filtros.categoria);
    if (filtros.soloFavoritos) params.append('soloFavoritos', 'true');

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/contactos${query}`);
    if (!res.ok) throw new Error('Error al consultar los contactos');
    return res.json();
  },

  async obtenerPorId(id) {
    const res = await fetch(`${API_BASE}/contactos/${id}`);
    if (!res.ok) throw new Error('Error al obtener el contacto');
    return res.json();
  },

  async crear(contacto) {
    const res = await fetch(`${API_BASE}/contactos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contacto)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.mensaje || 'Error al guardar el contacto');
    }
    return res.json();
  },

  async actualizar(id, contacto) {
    const res = await fetch(`${API_BASE}/contactos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contacto)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.mensaje || 'Error al actualizar');
    }
    return res.json();
  },

  async eliminar(id) {
    const res = await fetch(`${API_BASE}/contactos/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar');
    return res.json();
  },

  async toggleFavorito(id) {
    const res = await fetch(`${API_BASE}/contactos/${id}/favorito`, {
      method: 'PATCH'
    });
    if (!res.ok) throw new Error('Error al cambiar favorito');
    return res.json();
  },

  async obtenerInfoTarea() {
    const res = await fetch(`${API_BASE}/info`);
    if (!res.ok) throw new Error('Error al consultar info');
    return res.json();
  }
};
