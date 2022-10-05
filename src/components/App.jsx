import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Home from './Home';
import Store from './Store';
import ProductPage from './ProductPage';
import NotFound from './NotFound';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();

      const productsData = data.map((p) => ({ ...p, quantity: 0 }));

      setProducts(productsData);
    };

    fetchProductsData()
      .catch(() => {
        setProducts([]);
        // TODO: redirect to error page
      });
  }, []);

  const handleProductsQuantityInput = useCallback((e) => {
    const id = e.target.getAttribute('data-id');

    if (e.target.value <= 99 && !Number(e.target.value).isNaN) {
      setProducts((prevProducts) => (
        prevProducts.map((p) => {
          if (p.id === Number(id)) {
            return { ...p, quantity: Number(e.target.value) };
          }
          return p;
        })
      ));
    }
  });

  const handleProductsQuantity = useCallback((e) => {
    const dataId = `${e.target.getAttribute('data-id')}`;
    const input = document.querySelector(`input[data-id="${dataId}"][data-parent="cart-product"]`);
    let inputValue = Number(input.value);

    if (e.target.getAttribute('data-action') === 'increment') {
      inputValue += 1;
      input.value = inputValue;
    } else if (e.target.getAttribute('data-action') === 'decrement') {
      if (inputValue > 1) inputValue -= 1;
      input.value = inputValue;
    }

    setProducts((prevProducts) => (
      prevProducts.map((p) => {
        if (p.id === Number(dataId)) {
          return { ...p, quantity: inputValue };
        }
        return p;
      })
    ));
  });

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();

    if (products.reduce((a, b) => (a + b.quantity), 0) === 0) {
      const cartButton = document.querySelector('nav>button');
      setTimeout(() => cartButton.click(), 250);
    }

    const productId = e.target.getAttribute('data-add-btn-id');
    const input = document.querySelector('input[data-parent="product-page"]');

    setProducts((prevProducts) => (
      prevProducts.map((p) => {
        if (p.id === Number(productId)) {
          return { ...p, quantity: p.quantity + Number(input.value) };
        }
        return p;
      })
    ));
  });

  const handleDeleteProduct = useCallback((e) => {
    const productId = e.target.getAttribute('data-id');

    setProducts((prevProducts) => (
      prevProducts.map((p) => {
        if (p.id === Number(productId)) {
          return { ...p, quantity: 0 };
        }
        return p;
      })
    ));
  });

  return (
    <Routes>
      <Route
        element={(
          <Layout
            products={products}
            handleProductsQuantityInput={handleProductsQuantityInput}
            handleProductsQuantity={handleProductsQuantity}
            handleDeleteProduct={handleDeleteProduct}
          />
          )}
      >
        <Route index element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:filter" element={<Store />} />
        <Route
          path="products/:id"
          element={(
            <ProductPage
              handleAddToCart={handleAddToCart}
            />
            )}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
