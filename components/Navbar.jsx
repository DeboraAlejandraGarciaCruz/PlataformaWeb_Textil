// src/components/Navbar.jsx (VERSIÓN CORREGIDA)
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Mi Tienda</Link>
      <div className="space-x-4">
        <Link to="/catalogo" className="text-gray-700 hover:text-blue-600">Catálogo</Link>
        <Link to="/contacto" className="text-gray-700 hover:text-blue-600">Contacto</Link>
        
        {user ? (
          <>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
        )}
      </div>
    </nav>
  );
}