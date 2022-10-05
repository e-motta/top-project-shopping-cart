import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Route, MemoryRouter, Routes } from 'react-router-dom';
import Store from '../Store';

beforeEach(() => {
  fetch.resetMocks();
});

jest.mock('../ProductCard', () => function mockProductCard(product) {
  return (
    <div id={product.id} data-testid={product.id} />
  );
});

describe('Store', () => {
  it('renders loading text', async () => {
    render(<Store handleAddToCart={jest.fn} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('renders multiple ProductCard components', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      [
        { id: 1, title: 'test title 1' },
        { id: 2, title: 'test title 2' },
      ],
    ));
    await act(async () => {
      render(<Store />);
    });
    expect(screen.getByTestId('1')).toBeInTheDocument();
    expect(screen.getByTestId('2')).toBeInTheDocument();
  });

  it('renders only correct category', async () => {
    fetch.mockResponseOnce(JSON.stringify(
      [
        { id: 1, title: 'test title 1', category: 'category1' },
        { id: 2, title: 'test title 2', category: 'category2' },
      ],
    ));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/store/category1']}>
          <Routes>
            <Route path="store/:filter" element={<Store />} />
          </Routes>
        </MemoryRouter>,
      );
    });
    expect(screen.queryByTestId('1')).toBeInTheDocument();
    expect(screen.queryByTestId('2')).not.toBeInTheDocument();
  });
});
