export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('adminToken');
  
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      ...options,
      headers
    });
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }
  
    // Si la respuesta no es JSON válido (ej. 204 No Content en DELETE), devuelve null
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  