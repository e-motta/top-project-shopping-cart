import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import GlobalNav from './GlobalNav';
import Cart from './Cart';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

function Layout({
  products,
  handleProductsQuantityInput,
  handleProductsQuantity,
  handleDeleteProduct,
}) {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [delayCartRender, setDelayCartRender] = useState(false);

  const toggleCartVisibility = useCallback(() => {
    if (isCartVisible) {
      setIsCartVisible(false);
      setDelayCartRender(false);
    } else {
      setIsCartVisible(true);
      setTimeout(() => setDelayCartRender(true));
    }
  });

  const totalProducts = products.reduce((a, b) => a + b.quantity, 0);

  return (
    <>
      <MainContainer>
        <GlobalNav
          isCartFull={!!totalProducts}
          totalProducts={totalProducts}
          toggleCartVisibility={toggleCartVisibility}
        />
        <main>
          <Outlet />
        </main>
      </MainContainer>
      {isCartVisible
        ? (
          <Cart
            delayCartRender={delayCartRender}
            toggleCartVisibility={toggleCartVisibility}
            cartProducts={products}
            handleProductsQuantityInput={handleProductsQuantityInput}
            handleProductsQuantity={handleProductsQuantity}
            handleDeleteProduct={handleDeleteProduct}
          />
        )
        : ''}
    </>
  );
}

Layout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
  handleProductsQuantityInput: PropTypes.func.isRequired,
  handleProductsQuantity: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default Layout;
