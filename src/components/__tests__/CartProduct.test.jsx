import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CartProduct from '../CartProduct';

describe('CartProduct', () => {
  it('renders static element when quantity > 0', () => {
    const product = {
      id: 1,
      title: 'test title 1',
      price: 50,
      image: '/',
      rating: {
        rate: 4.5,
        count: 999,
      },
      description: 'description',
      quantity: 2,
    };
    const handleProductsQuantityInput = jest.fn();
    const handleProductsQuantity = jest.fn();
    const handleDeleteProduct = jest.fn();
    act(() => {
      render(
        <CartProduct
          key={product.id}
          product={product}
          handleProductsQuantityInput={handleProductsQuantityInput}
          handleProductsQuantity={handleProductsQuantity}
          handleDeleteProduct={handleDeleteProduct}
        />,
      );
    });
    expect(screen.getByRole('img', { alt: product.title, src: product.img })).toBeInTheDocument();
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`$${(product.price * Number(product.quantity)).toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByTestId('trash-icon')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-component')).toBeInTheDocument();
  });
});
