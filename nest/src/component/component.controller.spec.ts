import { Test, TestingModule } from '@nestjs/testing';
import { ComponentController } from './component.controller';
import { Component, ComponentSchema } from './component.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ComponentService } from './component.service';

describe('ComponentController', () => {
  let controller: ComponentController;
  let componentModel: Model<Component>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentController],
      providers: [
        ComponentService,
        {
          provide: getModelToken(Component.name),
          useFactory: () => {
            const mongoose = require('mongoose');
            return mongoose.model(Component.name, ComponentSchema);
          },
        },
      ],
    }).compile();

    controller = module.get<ComponentController>(ComponentController);
    componentModel = module.get<Model<Component>>(getModelToken(Component.name));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
