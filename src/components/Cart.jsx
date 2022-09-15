/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiCartOutline, mdiClose } from '@mdi/js';
import CartProduct from './CartProduct';

import { SubmitButton } from './StyledComponents';

const Container = styled.div`
  background-color: #00000048;
  display: grid;
  grid-template-columns: 1fr auto;
  height: 100%;
  width: 9000px;
  justify-content: flex-end;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  right: ${({ $delayCartRender }) => ($delayCartRender ? '-20px' : '-720px')};
  transition: right 1s;
`;

const CartContainer = styled.div`
  background-color: white;
  width: 700px;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseCartArea = styled.button`
  border: 0;
  background-color: transparent;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  border: 0;
  background-color: inherit;
  cursor: pointer;
`;

const ProductsSection = styled.div`
  
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.6em;
`;

const TotalTitle = styled.span`
  
`;

const TotalValue = styled.span`
  
`;

function Cart({
  delayCartRender,
  toggleCartVisibility,
  cartProducts,
  handleProductsQuantityInput,
  handleProductsQuantity,
  handleDeleteProduct,
}) {
  const totalProducts = cartProducts.reduce((a, b) => a + b.quantity, 0);
  const isCartFilled = !!totalProducts;

  return (
    <Container $delayCartRender={delayCartRender}>
      <CloseCartArea
        type="button"
        aria-label="close cart"
        onClick={toggleCartVisibility}
      />
      <CartContainer>
        <TitleSection>
          <Title>
            my cart (
            {totalProducts}
            )
          </Title>
          <CloseButton onClick={toggleCartVisibility}>
            <Icon path={mdiClose} size={1} />
          </CloseButton>
        </TitleSection>
        <ProductsSection>
          {cartProducts.map((p) => {
            if (p.quantity > 0) {
              return (
                <CartProduct
                  key={p.id}
                  product={p}
                  handleProductsQuantityInput={handleProductsQuantityInput}
                  handleProductsQuantity={handleProductsQuantity}
                  handleDeleteProduct={handleDeleteProduct}
                />
              );
            }
            return '';
          })}
        </ProductsSection>
        {isCartFilled
          ? (
            <>
              <TotalSection>
                <TotalTitle>Total:</TotalTitle>
                <TotalValue>
                  $
                  {(cartProducts.reduce((a, b) => (
                    a + b.price * b.quantity
                  ), 0))
                    .toFixed(2)}
                </TotalValue>
              </TotalSection>
              <SubmitButton onClick={() => setTimeout(() => alert('Not implemented'), 200)}>Proceed to Checkout</SubmitButton>
            </>
          )
          : (
            <>
              <h2
                style={{ alignSelf: 'center' }}
              >
                Your cart is empty!
              </h2>
              <Icon path={mdiCartOutline} size={4} style={{ alignSelf: 'center' }} />
            </>
          )}
      </CartContainer>
    </Container>
  );
}

Cart.propTypes = {
  delayCartRender: PropTypes.bool.isRequired,
  toggleCartVisibility: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  cartProducts: PropTypes.array.isRequired,
  handleProductsQuantityInput: PropTypes.func.isRequired,
  handleProductsQuantity: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default Cart;
