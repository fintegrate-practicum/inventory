import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ComponentService } from './component.service';
import { Component } from './component.entity';

describe('ComponentService', () => {
  let service: ComponentService;
  let componentModel: Model<Component>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentService,
        {
          provide: getModelToken(Component.name),
          useValue: {
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            manager: {
              getRepository: jest.fn(() => componentModel),
            }
          },
        },
      ],
    }).compile();

    service = module.get<ComponentService>(ComponentService);
    componentModel = module.get<Model<Component>>(getModelToken(Component.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
