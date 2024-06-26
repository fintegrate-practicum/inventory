import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './Product.controller';
import { Product, ProductSchema } from './Product.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './Product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let ProductModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name), 
          useFactory: () => {
            const mongoose = require('mongoose'); 
            return mongoose.model(Product.name, ProductSchema); 
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    ProductModel = module.get<Model<Product>>(getModelToken(Product.name)); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});

