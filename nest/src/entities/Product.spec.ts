import { Product } from './Product'; // Assuming Product class is in this file
import { validateSync } from 'class-validator';

describe('Product', () => {
  it('should create a valid product', () => {
    const validProduct = new Product();
    validProduct.productName = 'Awesome Product';
    validProduct.productDescription = 'A detailed description';
    validProduct.componentsImages = ['image1.jpg', 'image2.png'];
    validProduct.packageCost = 10;
    validProduct.productComponents = ['Component A', 'Component B'];
    validProduct.totalPrice = 15;
    validProduct.adminId = 'admin123';
    validProduct.stockQuantity = 20;
    validProduct.bussinesId = 'businessXYZ';
    validProduct.componentStatus = 'Active';

    const errors = validateSync(validProduct);
    console.log(errors)
    expect(errors.length).toBe(0);
  });

  it('should not create a product with missing productName', () => {
    const missingNameProduct = new Product();
    missingNameProduct.productDescription = 'A detailed description';
    missingNameProduct.componentsImages = ['image1.jpg', 'image2.png'];
    missingNameProduct.packageCost = 10.5;
    missingNameProduct.productComponents = ['Component A', 'Component B'];
    missingNameProduct.totalPrice = 15.99;
    missingNameProduct.adminId = 'admin123';
    missingNameProduct.stockQuantity = 20;
    missingNameProduct.bussinesId = 'businessXYZ';
    missingNameProduct.componentStatus = 'Active';

    const errors = validateSync(missingNameProduct);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(error => error.property === 'productName' && error.constraints.isNotEmpty)).toBeTruthy();
  });

  it('should not create a product with negative packageCost', () => {
    const invalidProduct = new Product();
    invalidProduct.productName = 'Awesome Product';
    invalidProduct.productDescription = 'A detailed description';
    invalidProduct.componentsImages = ['image1.jpg', 'image2.png'];
    invalidProduct.packageCost = -10.5;
    invalidProduct.productComponents = ['Component A', 'Component B'];
    invalidProduct.totalPrice = 15.99;
    invalidProduct.adminId = 'admin123';
    invalidProduct.stockQuantity = 20;
    invalidProduct.bussinesId = 'businessXYZ';
    invalidProduct.componentStatus = 'Active';

    const errors = validateSync(invalidProduct);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(error => error.property === 'packageCost' && error.constraints.min)).toBeTruthy();
  });
})