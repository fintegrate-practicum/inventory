import { Test, TestingModule } from '@nestjs/testing';
import { ComponentController } from './component.controller';
import { JwtService } from '@nestjs/jwt';
import { Component } from '../entities/Component'; 
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ComponentService } from './component.service';

describe('ComponentController', () => {
  let controller: ComponentController;
  let componentRepository: Repository<Component>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentController],
      providers: [ComponentService,
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

    controller = module.get<ComponentController>(ComponentController);
    componentRepository = module.get<Repository<Component>>(getRepositoryToken(Component));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
