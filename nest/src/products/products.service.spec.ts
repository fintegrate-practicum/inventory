import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './products.service';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import * as request from 'supertest';
import { ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';


describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw ForbiddenException when user does not have business manager permission', async () => {
    const productData = { productName: 'Test Product', company: 'Test Company', components: [{ name: 'Component A', quantity: 1 }] };
    const userId = '123';

    await expect(service.addNewProduct(productData, userId)).rejects.toThrow(ForbiddenException);
  });



  // it('should throw ConflictException when a product with the same components and quantities already exists', async () => {
  //       jest.spyOn(Product, 'collection').mockReturnValueOnce({
  //         findOne: jest.fn().mockResolvedValueOnce({ components: [{ name: 'Component A', quantity: 1 }] })
  //       });

  //       const productData = { productName: 'New Product', company: 'New Company', components: [{ name: 'Component A', quantity: 1 }] };
  //       const userId = '123';

  //       await expect(service.addNewProduct(productData, userId)).rejects.toThrow(ConflictException);
  //     });


  // it('should throw ConflictException when a product with the same components and quantities already exists', async () => {
  //     jest.spyOn(Product, 'collection').mockReturnValueOnce({
  //       findOne: jest.fn().mockResolvedValueOnce({ components: [{ name: 'Component A', quantity: 1 }] })
  //     });

  //     const productData = { productName: 'New Product', company: 'New Company', components: [{ name: 'Component A', quantity: 1 }] };
  //     const userId = '123';

  //     await expect(service.addNewProduct(productData, userId)).rejects.toThrow(ConflictException);
  //   });

  it('should throw BadRequestException when product does not meet component requirements', async () => {
    const productData = { productName: 'Incomplete Product', company: 'Company', components: [{ name: 'Component A', quantity: 1 }] };
    const userId = '123';

    await expect(service.addNewProduct(productData, userId)).rejects.toThrow(BadRequestException);
  });

});
