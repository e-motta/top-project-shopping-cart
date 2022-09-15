import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

beforeEach(() => {
  fetch.resetMocks();
});

describe('ProductCard', () => {
  it('renders elements with api information', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      {
        id: 1,
        title: 'test title 1',
        price: 99.99,
        image: '/',
      },
    ));
    await act(async () => {
      render(<ProductCard id={1} key="test title 1" />, { wrapper: BrowserRouter });
    });
    expect(screen.getByRole('heading', { name: 'test title 1' })).toBeInTheDocument();
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { href: '/products/1' })).toBeInTheDocument();
    expect(screen.getByRole('img', { alt: 'test title 1', src: '/' })).toBeInTheDocument();
  });
});
