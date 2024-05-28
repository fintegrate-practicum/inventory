import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './products.service';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/Product';
import { JwtService } from '@nestjs/jwt'; // Import JwtService from @nestjs/jwt

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<Product>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
