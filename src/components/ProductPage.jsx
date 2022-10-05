import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';

import { Image, Loading, SubmitButton } from './StyledComponents';
import QuantityComponent from './QuantityComponent';
import NotFound from './NotFound';

const Container = styled.div`
  background-color: #f7eeee;
  min-height: calc(100vh - 67px);
  display: grid;
  grid-template-columns: 40% 60%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
  padding: 50px;
  max-height: calc(100vh - 67px);
`;

const DetailsContainer = styled.div`
  max-width: 600px;
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Name = styled.h2`
  font-size: 1.9em;
  font-weight: bold;
  margin: 0;
  padding: 2px;
`;

const Price = styled.span`
  font-size: 2em;
  font-weight: bold;
`;

const CheckoutForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  width: 70%;
`;

const Description = styled.p`
  font-size: 1.3em;
  width: 70%;
  text-align: justify;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: .8em;
`;

const StyledIcon = styled(Icon)`
  color: ${({ $rate }) => ($rate ? 'orange' : '#cacaca')};
`;

function ProductPage({ handleAddToCart }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProductData()
      .catch(() => {
        setProduct({});
        setLoading(false);
        // TODO: redirect to error page
      });
  }, []);

  const handleQuantityInput = useCallback((e) => {
    if (e.target.value <= 99 && !Number(e.target.value).isNaN) {
      setQuantity(Number(e.target.value));
    }
  });

  const handleQuantity = useCallback((e) => {
    if (e.target.getAttribute('data-action') === 'increment') {
      setQuantity(quantity + 1);
    } else if (e.target.getAttribute('data-action') === 'decrement') {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  });

  if (loading) return <Loading>Loading...</Loading>;
  if (Object.keys(product).length === 0) return <NotFound />;

  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} alt={product.title} />
      </ImageContainer>
      <DetailsContainer>
        <Name>{product.title}</Name>
        <Price>
          <span
            style={{ position: 'relative', top: '-0.15em', fontSize: '.8em' }}
          >
            $
          </span>
          {product.price?.toFixed(2)}
        </Price>
        <RatingContainer>
          <div title={`${product.rating?.rate}/5`}>
            {product.rating
              ? [...Array(Math.round(Number(product.rating.rate))).keys()].map(
                (key) => <StyledIcon path={mdiStar} size={1} key={key} $rate />,
              )
              : ''}
            {product.rating
              ? [...Array(Math.round(5 - Number(product.rating.rate))).keys()].map(
                (key) => <StyledIcon path={mdiStar} size={1} key={key} />,
              )
              : ''}
          </div>
          <span>{`(${product.rating?.count} opinions)`}</span>
        </RatingContainer>
        <CheckoutForm>
          <QuantityComponent
            productId={product.id}
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleQuantityInput={handleQuantityInput}
            parentId="product-page"
          />
          <SubmitButton
            data-add-btn-id={product.id}
            onClick={handleAddToCart}
          >
            Add to cart
          </SubmitButton>
        </CheckoutForm>
        <Description>{product.description}</Description>
      </DetailsContainer>
    </Container>
  );
}

ProductPage.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductPage;
