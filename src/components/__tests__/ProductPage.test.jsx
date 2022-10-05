import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Route, MemoryRouter, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductPage from '../ProductPage';

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify(
    {
      id: 1,
      title: 'test title 1',
      price: 99.99,
      image: '/',
      rating: {
        rate: 4.5,
        count: 999,
      },
      description: 'description',
    },
  ));
});

describe('ProductPage', () => {
  it('renders loading text', async () => {
    render(<ProductPage handleAddToCart={jest.fn} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders elements with api information', async () => {
    const handleAddToCart = jest.fn();
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="products/:id" element={<ProductPage handleAddToCart={handleAddToCart} />} />
          </Routes>
        </MemoryRouter>,
      );
    });
    expect(screen.getByRole('heading', { name: 'test title 1' })).toBeInTheDocument();
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
    expect(screen.getByTitle(/4.5/i)).toBeInTheDocument();
    expect(screen.getByText(/999/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^add to cart$/i, type: 'submit' })).toBeInTheDocument();
    expect(screen.getByTestId('decrement-btn')).toBeInTheDocument();
    expect(screen.getByTestId('increment-btn')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { value: 1 })).toBeInTheDocument();
    expect(screen.getByRole('img', { alt: 'test title 1', src: '/' })).toBeInTheDocument();
  });

  it('changes input value when increment and decrement buttons are clicked', async () => {
    const handleAddToCart = jest.fn();
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="products/:id" element={<ProductPage handleAddToCart={handleAddToCart} />} />
          </Routes>
        </MemoryRouter>,
      );
    });
    userEvent.click(screen.getByTestId('increment-btn'));
    expect(screen.getByRole('textbox', { value: 1 })).toHaveValue('2');
    userEvent.click(screen.getByTestId('decrement-btn'));
    expect(screen.getByRole('textbox', { value: 2 })).toHaveValue('1');
  });

  it('adds product to cart', async () => {
    const handleAddToCart = jest.fn((e) => e.preventDefault());
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/products/1']}>
          <Routes>
            <Route path="products/:id" element={<ProductPage handleAddToCart={handleAddToCart} />} />
          </Routes>
        </MemoryRouter>,
      );
    });
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });
});
