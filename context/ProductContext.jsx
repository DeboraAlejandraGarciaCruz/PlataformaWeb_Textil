import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto A', description: 'Descripción A', price: 100, stock: 10, category: 'Categoría 1', image: '/img/productA.jpg' },
    { id: 2, name: 'Producto B', description: 'Descripción B', price: 200, stock: 5, category: 'Categoría 1', image: '/img/productB.jpg' },
    { id: 3, name: 'Producto C', description: 'Descripción C', price: 150, stock: 20, category: 'Categoría 2', image: '/img/productC.jpg' },
    { id: 4, name: 'Producto D', description: 'Descripción D', price: 250, stock: 0, category: 'Categoría 2', image: '/img/productD.jpg' },
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
