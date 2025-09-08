import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export default function CatalogPage() {
  const { products } = useProducts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catálogo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover mb-4 rounded" />
            <h2 className="font-semibold text-gray-800 mb-2">{p.name}</h2>
            <p className="text-gray-600 mb-2">${p.price}</p>
            <Link to={`/producto/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">Ver</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
