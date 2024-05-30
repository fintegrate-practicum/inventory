import {expect, describe, it} from  'vitest';
import {fireEvent, render, screen } from '@testing-library/react';
import AllProducts from './AllProducts';
import {Product} from '../../App';
import { error } from 'console';

const mockProducts: Product[] = [
    {
      id: '1',
      productName: 'Table',
      productDescription: 'Some description',
      componentsImages: [],
      productComponents: [
        { name: 'Table Leg', price: 10 },
        { name: 'Table Top', price: 20 },
      ],
      packageCost: 100,
      totalPrice: 300,
      adminId: '12',
      isActive: true,
      isOnSale: true,
      salePercentage: 10,
      stockQuantity: 40,
      bussinesId: '44',
      componentStatus: '',
    },
    {
      id: '2',
      productName: 'Chair',
      productDescription: 'Another description',
      componentsImages: [],
      productComponents: [{ name: 'Chair Leg', price: 5 }],
      packageCost: 50,
      totalPrice: 100,
      adminId: '15',
      isActive: false,
      isOnSale: false,
      salePercentage: 0,
      stockQuantity: 20,
      bussinesId: '33',
      componentStatus: '',
    },
  ];
  
describe('AllProducts component', () => {
  it('renders product columns with correct headers', () => {
    render(<AllProducts arrInventory={mockProducts} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  it('renders "No Components" text when product has no components', () => {
    const mockProductWithoutComponents = {
      ...mockProducts[0],
      productComponents: [],
    };

    render(<AllProducts arrInventory={[mockProductWithoutComponents]} />);

    expect(screen.getByText('No Components')).toBeInTheDocument();
  });
  it('displays product details in corresponding cells', () => {
    render(<AllProducts arrInventory={mockProducts} />);

    // Product 1 (Table)
    const tableIdCell = screen.getByText('1');
    const tableNameCell = screen.getByText('Table');
    const tablePriceCell = screen.getByText(/300/); // Regex for price format
    const tableStockCell = screen.getByText('40');

    expect(tableIdCell).toBeInTheDocument();
    expect(tableNameCell).toBeInTheDocument();
    expect(tablePriceCell).toBeInTheDocument();
    expect(tableStockCell).toBeInTheDocument();

    // Product 2 (Chair)
    const chairIdCell = screen.getByText('2');
    const chairNameCell = screen.getByText('Chair');
    const chairPriceCell = screen.getByText(/100/);
    const chairStockCell = screen.getByText('20');

    expect(chairIdCell).toBeInTheDocument();
    expect(chairNameCell).toBeInTheDocument();
    expect(chairPriceCell).toBeInTheDocument();
    expect(chairStockCell).toBeInTheDocument();
  });

  it('renders pagination controls', () => {
    render(<AllProducts arrInventory={mockProducts} />);
  
    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' });
    const previousPageButton = screen.getByRole('button', { name: 'Go to previous page' });
  
    expect(nextPageButton).toBeInTheDocument();
    expect(previousPageButton).toBeInTheDocument();
  });
  
  it('changes page when pagination controls are clicked', async () => {
    render(<AllProducts arrInventory={mockProducts} />);
  
    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' });
    fireEvent.click(nextPageButton);
  
    // Check if page changed
    await screen.findByText('Chair'); // Assuming 'Chair' is in the second page
  });
    console.log(error);
  });