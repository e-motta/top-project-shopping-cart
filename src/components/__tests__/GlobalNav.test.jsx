import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import GlobalNav from '../GlobalNav';
import Cart from '../Cart';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Global Nav', () => {
  it('renders span with "The Online Shop" text; button with "all" label; cart button with no text (empty cart)', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    await act(async () => {
      render(<GlobalNav
        isCartFull={false}
        totalProducts={1}
        toggleCartVisibility={jest.fn()}
      />, { wrapper: BrowserRouter });
    });
    expect(screen.getByRole('link', { name: /^the online store$/i, href: '/' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'all', href: '/store' })).toBeInTheDocument();
    expect(screen.getByRole('button', { text: '' })).toBeInTheDocument();
  });

  it('renders buttons with categories labels', async () => {
    fetch.mockResponseOnce(JSON.stringify(['category1', 'category2']));
    await act(async () => {
      render(<GlobalNav
        isCartFull={false}
        totalProducts={1}
        toggleCartVisibility={jest.fn()}
      />, { wrapper: BrowserRouter });
    });
    expect(screen.getByRole('link', { name: 'category1', href: '/store/category1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'category2', href: '/store/category2' })).toBeInTheDocument();
  });

  it('renders Cart when cart button is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    let container;
    await act(async () => {
      ({ container } = render(<GlobalNav
        isCartFull={false}
        totalProducts={1}
        toggleCartVisibility={jest.fn()}
      />, { wrapper: BrowserRouter }));
    });
    userEvent.click(screen.getByRole('button'));
    expect(container.hasChildNodes(<Cart
      delayCartRender={false}
      toggleCartVisibility={jest.fn}
      cartProducts={[]}
      handleProductsQuantityInput={jest.fn}
      handleProductsQuantity={jest.fn}
      handleDeleteProduct={jest.fn}
    />)).toEqual(true);
  });
});
