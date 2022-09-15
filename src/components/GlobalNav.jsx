import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCartOutline } from '@mdi/js';

import { StyledButton } from './StyledComponents';

const Container = styled.div`
  background-color: #ea6060;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1020px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.span`
  font-size: 1.4em;
  font-weight: bolder;
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 10px;
  user-select: none;
  transition: transform .3s;
`;

const Nav = styled.nav`
  color: #2b313a;
  display: flex;
  font-size: 1.1em;
  text-transform: uppercase;
  align-items: center;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: ${({ $isMainLink }) => ($isMainLink ? 'bold' : 'inherit')};
  font-size: ${({ $isMainLink }) => ($isMainLink ? '1.2em' : 'inherit')};
  transition: color .3s;
  &:hover {
    color: white;
    transition: color .3s;
  }
`;

const RoundContainer = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .3s;
  position: relative;
  &:hover {
    transform: scale(1.1);
    transition: transform .3s;
  }
`;

const StyledIcon = styled(Icon)`
  color: ${({ $full }) => ($full ? '#00000021' : '#ea6060')};
  position: absolute;
  left: 6px;
  top: 6px;
`;

const TotalProducts = styled.span`
  font-size: 1.7em;
  font-weight: bold;
  color: #8c1717;
`;

function GlobalNav({ isCartFull, totalProducts, toggleCartVisibility }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    };

    fetchProductsData()
      .catch(() => {
        setCategories([]);
        setLoading(false);
      // TODO: redirect to error page
      });
  }, []);

  if (loading) return '';

  return (
    <Container>
      <Wrapper>
        <StyledLink to="/">
          <Logo>The Online Store</Logo>
        </StyledLink>
        <Nav>
          <StyledLink to="/store" $isMainLink>
            all
          </StyledLink>
          {categories.map((category) => (
            <StyledLink to={`/store/${category}`} key={category}>
              {category}
            </StyledLink>
          ))}
          <StyledButton type="button" onClick={toggleCartVisibility}>
            <RoundContainer>
              {totalProducts
                ? <TotalProducts>{totalProducts}</TotalProducts>
                : ''}
              <StyledIcon path={mdiCartOutline} size={1} data-testid="icon" $full={isCartFull} />
            </RoundContainer>
          </StyledButton>
        </Nav>
      </Wrapper>
    </Container>
  );
}

GlobalNav.propTypes = {
  isCartFull: PropTypes.bool.isRequired,
  totalProducts: PropTypes.number.isRequired,
  toggleCartVisibility: PropTypes.func.isRequired,
};

export default GlobalNav;
