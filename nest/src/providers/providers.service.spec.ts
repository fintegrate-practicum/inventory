import { Test, TestingModule } from '@nestjs/testing';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'; // Import JwtService from @nestjs/jwt
import { ProvidersService } from './providers.service';
import { Provider } from '../entities/Provider';

describe('ProductService', () => {
  let service: ProvidersService;
  let providerRepository: Repository<Provider>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvidersService,
        {
          provide: JwtService,
          useValue: {
             
          },
      },
      {
          provide: getRepositoryToken(Provider),
          useValue: {
              findOne: jest.fn(),
              findOneBy: jest.fn(),
              create: jest.fn(),
              save: jest.fn(),
              manager: {
                  getRepository: jest.fn(() => providerRepository),
              }
          },
      },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
    providerRepository = module.get<Repository<Provider>>(getRepositoryToken(Provider));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
