import { Test, TestingModule } from '@nestjs/testing';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProvidersService } from './providers.service';
import { Provider } from './provider.entity';

describe('ProductService', () => {
  let service: ProvidersService;
  let providerRepository: Repository<Provider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvidersService,
        
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
