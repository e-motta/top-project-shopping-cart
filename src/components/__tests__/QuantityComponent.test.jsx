import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QuantityComponent from '../QuantityComponent';

describe('Quantity Component', () => {
  it('shows correct input value', () => {
    const handleQuantity = jest.fn();
    const handleQuantityInput = jest.fn();
    render(<QuantityComponent
      productId={1}
      quantity={1}
      handleQuantity={handleQuantity}
      handleQuantityInput={handleQuantityInput}
      parentId="1"
    />);
    expect(screen.getByRole('textbox', { value: 1 })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('increment-btn'));
    fireEvent.click(screen.getByTestId('decrement-btn'));
    expect(handleQuantity).toHaveBeenCalledTimes(2);

    fireEvent.change(screen.getByTestId('quantity-input'), { target: { value: '2' } });
    expect(handleQuantityInput).toHaveBeenCalledTimes(1);
  });
});
