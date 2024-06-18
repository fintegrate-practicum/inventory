import React from 'react';
// import { render, fireEvent, waitFor, screen } from 'vtest';
import {expect, describe, it} from  'vitest';
import {fireEvent, render,waitFor, screen } from '@testing-library/react';
import DeleteProduct from './DeleteProduct';
import { error, log } from 'console';

describe('DeleteProduct component', () => {

it('DeleteProduct component test', async () => {
  const item = { id: 1, productName: 'Test Product' };
 
  render(<DeleteProduct item={item} />);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  const dialogTitle = screen.getByText('Are you sure you want to delete this product?');
  expect(dialogTitle).toBeInTheDocument();

  const deleteButtonInDialog = screen.getByText('delete');
  fireEvent.click(deleteButtonInDialog);

  await waitFor(() => {
    expect(screen.getByText('המחיקה בוצעה בהצלחה')).toBeInTheDocument();
  });
});

console.log(error)
})

