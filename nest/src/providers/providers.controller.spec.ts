import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';
import { Provider } from '../entities/Provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
describe('ProviderController', () => {
  let controller: ProvidersController;
  let providerRepository: Repository<Provider>;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
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
    providerRepository = module.get<Repository<Provider>>(getRepositoryToken(Provider));
    jwtService = module.get<JwtService>(JwtService);
    controller = module.get<ProvidersController>(ProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
