import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useMetrics } from '../context/MetricsContext';

export default function HomePage() {
  const { products } = useProducts();
  const { productViews } = useMetrics();

  // Obtener productos más destacados 
  const topProducts = [...products]
    .sort((a, b) => (productViews[b.id] || 0) - (productViews[a.id] || 0))
    .slice(0, 3);

  // Métricas generales
  const totalVisits = Object.values(productViews).reduce((a, b) => a + b, 0);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-16">
      {/* Banner de bienvenida */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Bienvenido a Mi Empresa</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofrecemos productos de alta calidad para satisfacer todas tus necesidades. Descubre nuestro catálogo y encuentra exactamente lo que buscas.
          </p>
          <Link
            to="/catalogo"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 inline-block"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Métricas */}
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-blue-600 text-2xl font-bold">📦 {products.length}</div>
          <div className="text-gray-600 mt-2">Productos</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-green-600 text-2xl font-bold">👥 {totalVisits}</div>
          <div className="text-gray-600 mt-2">Visitas</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-purple-600 text-2xl font-bold">🏷 {categories.length}</div>
          <div className="text-gray-600 mt-2">Categorías</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-orange-600 text-2xl font-bold">
            🔝 {topProducts.length > 0 ? productViews[topProducts[0].id] || 0 : 0}
          </div>
          <div className="text-gray-600 mt-2">Vistas Top</div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="container mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topProducts.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{p.description}</p>
                  <p className="text-blue-600 font-bold mb-4">${p.price}</p>
                </div>
                <Link
                  to={`/producto/${p.id}`}
                  className="mt-auto bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nuestra misión */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Nuestra Misión</h2>
            <p className="text-gray-600">
            Nos dedicamos a crear ropa interior de la más alta calidad a precios competitivos que acompañen a las mujeres desde lo más íntimo, 
            combinando comodidad, estilo y sensualidad. Transmitimos mensajes positivos que promueven el amor propio, el bienestar diario y una 
            conexión auténtica con lo que significa realmente la belleza propia.
            <li>Nuestro compromiso es con la satisfacción del cliente y la excelencia en el servicio.</li>
            </p>
            <h3 className="text-2xl font-semibold text-gray-800">Por Qué Elegirnos</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Productos de alta calidad garantizada y diseño suave.</li>
              <li>Precios competitivos en el mercado</li>
              <li>Atención al cliente personalizada</li>
              <li>La presentación cuidada del producto (etiquetas y empaques)</li>
              <li>Es una marca pensada para ellas, sin ninguna exclusion.</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Contacto</h2>
            <p className="text-gray-600">Teléfono: (555) 123-4567</p>
            <p className="text-gray-600">Email: info@miempresa.com</p>
            <p className="text-gray-600">Dirección: Calle Principal 123, Ciudad</p>
            <p className="text-gray-600">Horarios: Lun-Vie 9:00-18:00</p>
            <Link
              to="/contacto"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors inline-block mt-4"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
