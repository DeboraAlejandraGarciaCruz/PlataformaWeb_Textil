import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useMetrics } from '../context/MetricsContext';
import { ArrowLeft, Package, Tag } from 'lucide-react';

function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { trackProductView, productViews } = useMetrics();
  
  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      trackProductView(product.id);
    }
  }, [product, trackProductView]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
          <Link
            to="/catalogo"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const views = productViews[product.id] || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/catalogo"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={16} />
          <span>Volver al Catálogo</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Imagen del producto */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="border-t pt-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">
                ${product.price}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Stock disponible: <strong>{product.stock} unidades</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">
                    Visto: <strong>{views} veces</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/contacto"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Consultar Disponibilidad
                </Link>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Añadir a Favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">
                      ${relatedProduct.price}
                    </span>
                    <Link
                      to={`/producto/${relatedProduct.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;