import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './products.service';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';

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
});
