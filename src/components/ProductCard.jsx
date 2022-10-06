import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Image } from './StyledComponents';

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: transform .3s;
  &:hover {
    transform: scale(1.05);
    transition: transform .3s;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 380px;
  width: 240px;
  font-size: 1.4em;
  gap: 15px;
  padding: 10px;
  background-color: white;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  font-weight: normal;
  margin: 0;
  font-size: 1em;
`;

const Price = styled.span`
  font-weight: bold;
`;

function ProductCard({ id }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProductsData()
      .catch(() => {
        setProduct({});
        setLoading(false);
      });
  }, []);

  if (loading) return '';

  return (
    <StyledLink to={`/products/${product.id}`}>
      <Container>
        <ImageContainer>
          <Image src={product.image} alt={product.title} />
        </ImageContainer>
        <DetailsContainer>
          <Name title={product.title}>
            {product.title.length > 33
              ? `${product.title.slice(0, 33)}...`
              : product.title}
          </Name>
          <Price>
            <span
              style={{ position: 'relative', top: '-0.15em', fontSize: '.8em' }}
            >
              $
            </span>
            {product.price.toFixed(2)}
          </Price>
        </DetailsContainer>
      </Container>
    </StyledLink>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ProductCard;
