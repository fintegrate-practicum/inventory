import { createStore } from 'redux';
import reducer, { addComponent } from '../component/componentSlice';

describe('myReducer', () => {
  it('should add an component to the state', () => {
    const initialState = { data: [] };
    const store = createStore(reducer, initialState);

    const newItem = {  id: "0", componentName: "rivki", componentBuyPrice: 50, addingComponentDate: new Date("2024-05-28"), minQuantity: 3, componentStock: 6,
    isActive: false, adminId: "reuven", isSoldSeparately: true, componentDescription: "des", salePrice: 60,
    componentImages: ['1', '2', '3', '4'], isInSale: true, salePercentage: 5, componentColor: "red", componentSize: "medium",
    bussinesId: "shop"  };

    store.dispatch(addComponent(newItem));

    expect(store.getState().data).toEqual([newItem]);
  });
});
