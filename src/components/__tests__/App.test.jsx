import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';
import App from '../App';

beforeEach(() => {
  fetch.resetMocks();
});

it('return BrowserRouter', async () => {
  fetch.mockResponseOnce(JSON.stringify([]));
  let container;
  await act(async () => {
    ({ container } = render(<App />));
  });
  expect(container.hasChildNodes(<BrowserRouter />)).toEqual(true);
});
