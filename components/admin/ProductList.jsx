import { useProducts } from '../../context/ProductContext';
import { apiFetch } from '../../utils/api'; // helper

export default function ProductList({ onEdit }) {
  const { products, setProducts } = useProducts();

  const handleDelete = async (id) => {
    await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {products.map(product => (
        <div key={product.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">${product.price} - Stock: {product.stock}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
