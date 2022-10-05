import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Cart from '../Cart';

describe('Cart', () => {
  it('renders Cart static elements', () => {
    const cartProducts = [{}];
    render(<Cart
      delayCartRender={false}
      toggleCartVisibility={jest.fn}
      cartProducts={cartProducts}
      handleProductsQuantityInput={jest.fn}
      handleProductsQuantity={jest.fn}
      handleDeleteProduct={jest.fn}
    />);
    expect(screen.getByText(/my cart/i)).toBeInTheDocument();
    expect(screen.getByTestId('close cart area')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'close cart' })).toBeInTheDocument();
  });

  it('renders empty cart by default', () => {
    const cartProducts = [{}];
    render(<Cart
      delayCartRender={false}
      toggleCartVisibility={jest.fn}
      cartProducts={cartProducts}
      handleProductsQuantityInput={jest.fn}
      handleProductsQuantity={jest.fn}
      handleDeleteProduct={jest.fn}
    />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/test title 1/i)).not.toBeInTheDocument();
  });

  it('renders total cart value when not empty', () => {
    const cartProducts = [
      {
        id: 1,
        title: 'test title 1',
        price: 50,
        image: '/',
        rating: {
          rate: 4.5,
          count: 999,
        },
        description: 'description',
        quantity: 1,
      },
      {
        id: 2,
        title: 'test title 2',
        price: 100,
        image: '/',
        rating: {
          rate: 4.5,
          count: 999,
        },
        description: 'description',
        quantity: 2,
      },
    ];
    act(() => {
      render(<Cart
        delayCartRender={false}
        toggleCartVisibility={jest.fn}
        cartProducts={cartProducts}
        handleProductsQuantityInput={jest.fn}
        handleProductsQuantity={jest.fn}
        handleDeleteProduct={jest.fn}
      />);
    });
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(/\$250.00/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
  });

  it('toggles visibility when close buttons are clicked', () => {
    const cartProducts = [{}];
    const toggleCartVisibility = jest.fn();
    render(<Cart
      delayCartRender={false}
      toggleCartVisibility={toggleCartVisibility}
      cartProducts={cartProducts}
      handleProductsQuantityInput={jest.fn}
      handleProductsQuantity={jest.fn}
      handleDeleteProduct={jest.fn}
    />);
    fireEvent.click(screen.getByTestId('close cart area'));
    fireEvent.click(screen.getByRole('button', { name: 'close cart' }));
    expect(toggleCartVisibility).toBeCalledTimes(2);
  });

  it('does not render CartProduct when product quantity === 0', () => {
    const cartProducts = [
      {
        id: 1,
        title: 'test title 1',
        price: 50,
        image: '/',
        rating: {
          rate: 4.5,
          count: 999,
        },
        description: 'description',
        quantity: 0,
      },
    ];
    render(<Cart
      delayCartRender={false}
      toggleCartVisibility={jest.fn}
      cartProducts={cartProducts}
      handleProductsQuantityInput={jest.fn}
      handleProductsQuantity={jest.fn}
      handleDeleteProduct={jest.fn}
    />);
    expect(screen.queryByTestId('cart-product')).not.toBeInTheDocument();
  });
});
