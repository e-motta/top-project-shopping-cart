import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';

const Container = styled.div`
  display: flex;
`;

const QuantityInput = styled.input`
  font-size: 1.2em;
  padding: 9px 0px 9px 10px;
  width: ${({ $width }) => ($width)};
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
`;

const Button = styled.button`
  text-transform: uppercase;
  border: 0px;
  border-radius: 5px;
  font-size: 1.1em;
  padding: 10px 40px;
  cursor: pointer;
`;

const QuantityBtn = styled(Button).attrs({ type: 'button' })`
  background-color: inherit;
  padding-right: 5px;
  padding-left: 5px;
  transition: scale .1s;
  display: flex;
  align-items: center;
  &:active {
    scale: 90%;
    transition: scale .1s;
  }
`;

function QuantityComponent({
  productId,
  quantity,
  handleQuantity,
  handleQuantityInput,
  parentId,
}) {
  const [inputWidth, setInputWidth] = useState('3ch');

  useEffect(() => {
    const width = String(quantity).length > 1 ? '4ch' : '3ch';
    setInputWidth(width);
  }, [quantity]);

  return (
    <Container>
      <QuantityBtn
        onClick={handleQuantity}
        data-id={productId}
        data-action="decrement"
        data-testid="decrement-btn"
      >
        <Icon path={mdiMinus} size={0.8} style={{ pointerEvents: 'none' }} />
      </QuantityBtn>
      <QuantityInput
        value={quantity}
        onChange={handleQuantityInput}
        required
        $width={inputWidth}
        data-id={productId}
        data-parent={parentId}
      />
      <QuantityBtn
        onClick={handleQuantity}
        data-id={productId}
        data-action="increment"
        data-testid="increment-btn"
      >
        <Icon path={mdiPlus} size={0.8} style={{ pointerEvents: 'none' }} />
      </QuantityBtn>
    </Container>
  );
}

QuantityComponent.defaultProps = {
  handleQuantityInput: null,
};

QuantityComponent.propTypes = {
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  handleQuantity: PropTypes.func.isRequired,
  handleQuantityInput: PropTypes.func,
  parentId: PropTypes.string.isRequired,
};

export default QuantityComponent;
