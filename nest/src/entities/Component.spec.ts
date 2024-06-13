import { Component } from './Component';
import { validateSync } from 'class-validator';

describe('Component', () => {
  it('should create a valid component', () => {
    const component = new Component();
    component.componentName = 'Valid Name';
    component.componentBuyPrice = 10;
    component.minQuantity = 5;
    component.componentStock = 0;
    component.adminId = 'admin123';
    component.isSoldSeparately = false;
    component.bussinesId = '123';

    const errors = validateSync(component);
    expect(errors.length).toBe(0);
  });

  it('should not create a component with empty name', () => {
    const component = new Component();
    component.componentName = '';
    component.componentBuyPrice = 10;
    component.minQuantity = 5;
    component.componentStock = 0;
    component.adminId = 'admin123';
    component.isSoldSeparately = false;
    component.bussinesId = '123';
    const errors = validateSync(component);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBeDefined();
  });


  it('should not create a component with name less than 3 characters', () => {
    const component = new Component();
    component.componentName = 'A';
    component.componentBuyPrice = 10;
    component.minQuantity = 5;
    component.componentStock = 0;
    component.adminId = 'admin123';
    component.isSoldSeparately = false;
    component.bussinesId = '123';

    const errors = validateSync(component);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('componentName');
  });

  it('should not create a component with price less than 1', () => {
    const component = new Component();
    component.componentName = 'Valid Name';
    component.componentBuyPrice = 0;
    component.minQuantity = 5;
    component.componentStock = 0;
    component.adminId = 'admin123';
    component.isSoldSeparately = false;
    component.bussinesId = '123';

    const errors = validateSync(component);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.min).toBeDefined();
  });

  it('should not create a component with negative min quantity', () => {
    const component = new Component();
    component.componentName = 'Valid Name';
    component.componentBuyPrice = 10;
    component.minQuantity = -1;
    component.componentStock = 0;
    component.adminId = 'admin123';
    component.isSoldSeparately = false;
    component.bussinesId = '123';

    const errors = validateSync(component);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.min).toBeDefined();
  });
})