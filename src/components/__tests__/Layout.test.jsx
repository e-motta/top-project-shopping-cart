import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Layout from '../Layout';

jest.mock('react-router-dom');
const { BrowserRouter } = jest.requireActual('react-router-dom');

jest.mock('../GlobalNav', () => function mockGlobalNav({
  isCartFull,
  totalProducts,
  toggleCartVisibility,
}) {
  return (
    <>
      <div>
        GobalNav
        {' '}
        {String(isCartFull)}
        {totalProducts}
      </div>
      <button type="button" onClick={toggleCartVisibility}>
        cart button
      </button>
    </>
  );
});

jest.mock('../Cart', () => function mockCart({
  delayCartRender,
  toggleCartVisibility,
  cartProducts,
  handleProductsQuantityInput,
  handleProductsQuantity,
  handleDeleteProduct,
}) {
  return (
    <>
      <div>
        Cart component
        {String(delayCartRender)}
        {cartProducts.map((p) => p.id)}
      </div>
      <button type="button" onClick={toggleCartVisibility} data-testid="toggleCartVisibility">
        cart button
      </button>
      <button type="button" onClick={handleProductsQuantityInput} data-testid="handleProductsQuantityInput">
        button
      </button>
      <button type="button" onClick={handleProductsQuantity} data-testid="handleProductsQuantity">
        button
      </button>
      <button type="button" onClick={handleDeleteProduct} data-testid="handleDeleteProduct">
        button
      </button>
    </>
  );
});

describe('Layout', () => {
  it('renders GlobalNav component and main>Outlet', () => {
    const { container } = render(
      <Layout
        products={[{ id: 1 }]}
        handleProductsQuantityInput={jest.fn}
        handleProductsQuantity={jest.fn}
        handleDeleteProduct={jest.fn}
      />,
      { wrapper: BrowserRouter },
    );
    expect(container.hasChildNodes(<Outlet />)).toEqual(true);
    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="sc-bczRLJ hkJeKW"
  >
    <div>
      GobalNav
       
      false
      NaN
    </div>
    <button
      type="button"
    >
      cart button
    </button>
    <main />
  </div>
</div>
`);
  });

  it('renders the Cart component', () => {
    render(
      <Layout
        products={[{ id: 1 }]}
        handleProductsQuantityInput={jest.fn}
        handleProductsQuantity={jest.fn}
        handleDeleteProduct={jest.fn}
      />,
      { wrapper: BrowserRouter },
    );

    const cartButton = getByRole('button', { name: /cart button/i });
    userEvent.click(cartButton);
    expect(screen.getByText(/cart component/i)).toBeInTheDocument();
  });
});
