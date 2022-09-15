import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import GlobalNav from '../GlobalNav';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Global Nav', () => {
  it('renders span with "The Online Shop" text; button with "all" label; cart icon', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    await act(async () => {
      render(<GlobalNav isCartFull={false} />, { wrapper: BrowserRouter });
    });
    expect(screen.getByText(/^the online store$/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'all', href: '/store' })).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders buttons with categories labels', async () => {
    fetch.mockResponseOnce(JSON.stringify(['category1', 'category2']));
    await act(async () => {
      render(<GlobalNav isCartFull={false} />, { wrapper: BrowserRouter });
    });
    expect(screen.getByRole('link', { name: 'category1', href: '/store/category1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'category2', href: '/store/category2' })).toBeInTheDocument();
  });
});
