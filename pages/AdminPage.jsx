import { useState } from 'react';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import MetricsDashboard from '../components/admin/MetricsDashboard';

export default function AdminPage() {
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Productos</h2>
          <ProductList onEdit={setProductToEdit} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {productToEdit ? 'Editar Producto' : 'Agregar Producto'}
          </h2>
          <ProductForm productToEdit={productToEdit} onSave={() => setProductToEdit(null)} />
        </div>
      </div>

      <div>
        <MetricsDashboard />
      </div>
    </div>
  );
}
