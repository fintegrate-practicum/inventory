import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service'; // ודאי שהתלתות הזו מוגדרת
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { JwtService } from '@nestjs/jwt'; // Import JwtService from @nestjs/jwt

describe('ProductController', () => {
  let controller: ProductsController;
  let productRepository: Repository<Product>;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductService,
        {
          provide: JwtService,
          useValue: {
             
          },
      },
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
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
