import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import ProductCard from './ProductCard';
import { ContentContainer, Loading } from './StyledComponents';

const ProductsContainer = styled.div`
  display: grid;
  min-width: 1020px;
  grid-template-columns: auto auto auto;
  gap: 30px;
  padding: 50px 20px;
  justify-content: center;
`;

function Store() {
  const { filter } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProductsData()
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const validCategories = products.map((p) => (
    p.category
  ));

  const filteredProducts = products.filter((p) => (
    p.category === filter
  ));

  if (loading) return <Loading>Loading...</Loading>;

  return (
    <ContentContainer>
      <ProductsContainer>
        {filter && validCategories.includes(filter)
          ? filteredProducts.map((p) => (
            <ProductCard id={p.id} key={p.title} data-testid={`product-card-${p.id}`} />
          ))
          : products.map((p) => (
            <ProductCard id={p.id} key={p.title} data-testid={`product-card-${p.id}`} />
          ))}
      </ProductsContainer>
    </ContentContainer>
  );
}

export default Store;
