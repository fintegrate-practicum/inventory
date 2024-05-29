import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service'; // ודאי שהתלתות הזו מוגדרת
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/Product';

describe('ProductController', () => {
  let controller: ProductsController;
  let productRepository: Repository<Product>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductService,
        
      {
          provide: getRepositoryToken(Product),
          useValue: {
              findOne: jest.fn(),
              findOneBy: jest.fn(),
              create: jest.fn(),
              save: jest.fn(),
              manager: {
                  getRepository: jest.fn(() => productRepository),
              }
          },
      },
      ],   
      }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
