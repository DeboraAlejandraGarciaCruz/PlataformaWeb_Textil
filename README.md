# PlataformaWeb_Textil
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, fetchProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const found = products.find((p) => p._id === id);
    setProduct(found);
  }, [id, products]);

  if (!product) return <p className="loading">Cargando producto...</p>;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const related = products
    .filter(
      (p) =>
        p._id !== product._id &&
        p.categories?.some((c) =>
          product.categories?.some((cat) => cat.name === c.name)
        )
    )
    .slice(0, 4);

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-carousel">
          {product.images?.length > 0 && (
            <>
              <button className="arrow left" onClick={prevImage}>
                ‹
              </button>
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="main-photo"
              />
              <button className="arrow right" onClick={nextImage}>
                ›
              </button>
            </>
          )}
          <div className="thumbs">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i}`}
                className={i === currentImage ? 'thumb active' : 'thumb'}
                onClick={() => setCurrentImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>

          <p className="price">${product.price}</p>

          <p>
            <strong>Colores:</strong>{' '}
            {product.colors?.map((c) => c.name).join(', ') ||
              'No especificados'}
          </p>
          <p>
            <strong>Categorías:</strong>{' '}
            {product.categories?.map((c) => c.name).join(', ')}
          </p>

          <Link to="/contacto" className="btn-primary">
            Contáctanos
          </Link>

          <button className="btn-outline">Añadir a Favoritos</button>
        </div>
      </div>

      <div className="related-section">
        <h2>Productos Relacionados</h2>
        <div className="related-grid">
          {related.map((p) => (
            <div key={p._id} className="related-card">
              <Link to={`/producto/${p._id}`}>
                <img src={p.images?.[0]} alt={p.name} />
                <div className="info">
                  <h3>{p.name}</h3>
                  <p>${p.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



import { createContext, useContext, useState, useCallback } from 'react';
import { apiFetch } from '../utils/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Obtener todos los productos (siempre desde el backend)
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiFetch('/api/products');
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.warn('Respuesta inesperada del servidor:', data);
      }
    } catch (err) {
      console.error('❌ Error al obtener productos:', err);
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Crear producto
  const createProduct = async (formData) => {
    try {
      await apiFetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      await fetchProducts(); // 🔁 refrescar lista
    } catch (err) {
      console.error('❌ Error al crear producto:', err);
      throw err;
    }
  };

  // 🔹 Actualizar producto
  const updateProduct = async (id, formData) => {
    try {
      await apiFetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
      await fetchProducts(); // 🔁 refrescar lista con datos nuevos
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err);
      throw err;
    }
  };

  // 🔹 Eliminar producto
  const deleteProduct = async (id) => {
    try {
      await apiFetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      await fetchProducts(); // 🔁 actualizar lista sin el producto eliminado
    } catch (err) {
      console.error('❌ Error al eliminar producto:', err);
      throw err;
    }
  };

  // 🔹 Eliminar una imagen específica del producto
  const deleteImageFromProduct = async (productId, imageUrl) => {
    try {
      await apiFetch(`/api/products/${productId}/images`, {
        method: 'DELETE',
        body: JSON.stringify({ imageUrl }),
      });
      await fetchProducts(); // 🔁 refrescar después de eliminar la imagen
    } catch (err) {
      console.error('❌ Error al eliminar imagen del producto:', err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        deleteImageFromProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);

