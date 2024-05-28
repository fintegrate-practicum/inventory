import { Test, TestingModule } from '@nestjs/testing';
import { Repository} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt'; // Import JwtService from @nestjs/jwt
import { ComponentService } from './component.service';
import { Component } from '../entities/Component';

describe('ProductService', () => {
  let service: ComponentService;
  let componentRepository: Repository<Component>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentService,
        {
          provide: JwtService,
          useValue: {
             
          },
      },
      {
          provide: getRepositoryToken(Component),
          useValue: {
              findOne: jest.fn(),
              findOneBy: jest.fn(),
              create: jest.fn(),
              save: jest.fn(),
              manager: {
                  getRepository: jest.fn(() => componentRepository),
              }
          },
      },
      ],
    }).compile();

    service = module.get<ComponentService>(ComponentService);
    componentRepository = module.get<Repository<Component>>(getRepositoryToken(Component));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
