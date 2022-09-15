import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';

import { Image, StyledButton } from './StyledComponents';
import QuantityComponent from './QuantityComponent';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 4em;
  align-items: center;
  gap: 25px;
  position: relative;
  &:hover>:nth-child(5) {
    color: grey;
  }
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Name = styled.span`

`;

const Quantity = styled.span`
  padding: 1px;
  border-radius: 5px;
`;

const Price = styled.span`
  font-size: 1.1em;
  justify-self: end;
`;

const TrashIcon = styled(Icon)`
  padding: 12px;
  pointer-events: none;
`;

const TrashIconButton = styled(StyledButton)`
  position: absolute;
  right: -60px;
  top: 0px;
  color: transparent;
`;

function CartProduct({
  product,
  handleProductsQuantityInput,
  handleProductsQuantity,
  handleDeleteProduct,
}) {
  return (
    <>
      <Container>
        <ImageContainer>
          <Image src={product.image} alt={product.title} />
        </ImageContainer>
        <Name>{product.title}</Name>
        <Quantity>
          <QuantityComponent
            quantity={Number(product.quantity)}
            handleQuantityInput={handleProductsQuantityInput}
            handleQuantity={handleProductsQuantity}
            productId={product.id}
            parentId="cart-product"
          />
        </Quantity>
        <Price>
          $
          {(product.price * Number(product.quantity)).toFixed(2)}
        </Price>
        <TrashIconButton
          data-id={product.id}
          onClick={handleDeleteProduct}
        >
          <TrashIcon
            path={mdiTrashCan}
            size={2}
          />
        </TrashIconButton>
      </Container>
      <hr style={{ border: 'none', height: '1px', backgroundColor: 'grey' }} />
    </>
  );
}

CartProduct.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
  handleProductsQuantityInput: PropTypes.func.isRequired,
  handleProductsQuantity: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default CartProduct;
