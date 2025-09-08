import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';// helper

export default function ProductForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiFetch('/api/products');
      setProducts(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `/api/products/${editingId}`
      : '/api/products';

    await apiFetch(url, {
      method,
      body: JSON.stringify(formData),
    });

    setFormData({ name: '', description: '', price: '', image: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setFormData(p);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mb-6">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Producto' : 'Agregar Producto'}</h2>

        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <input name="price" type="number" placeholder="Precio" value={formData.price} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="image" placeholder="URL de imagen" value={formData.image} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.description}</p>
              <p className="text-gray-600">${p.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
