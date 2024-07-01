import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ProductService } from './Product.service';
import { Product } from './Product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            manager: {
              getRepository: jest.fn(() => productModel),
            }
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
