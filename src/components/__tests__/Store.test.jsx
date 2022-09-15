import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Route, MemoryRouter, Routes } from 'react-router-dom';
import Store from '../Store';

beforeEach(() => {
  fetch.resetMocks();
});

jest.mock('../ProductCard', () => function mockProductCard(product) {
  return <div id={product.id} key={product.title} data-testid={product.id} />;
});

describe('Store', () => {
  it.skip('renders loading text', () => {
    render(<Store />);
    expect(screen.getByText(/loading/)).toBeInTheDocument();
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
